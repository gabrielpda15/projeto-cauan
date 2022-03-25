import path from 'path';
import helmet from 'helmet';
import { glob } from 'glob';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Application, json, NextFunction, urlencoded, Response, Request } from 'express';
import { ErrorHandler } from './models/error-handler';
import { log } from './utils';
import { FooService, IService } from '@app/services/foo.service';
import { TYPES } from './constants';

export const anonymousRoutes: { route: string, method: string }[] = [ ];

const container = new Container();

export class Program {

    private app: Application;

    private constructor() {
        const server = new InversifyExpressServer(container);
        server.setConfig(Program.configureServer);
        this.app = server.build();
    }

    public static async create(): Promise<Program> { 
        await Program.loadControllers();
        await Program.configureContainer();
        return new Program(); 
    }

    private static async loadControllers(): Promise<void> {
        return new Promise((res, rej) => {
            try {
                glob(path.resolve(__dirname, '../controllers/**/*.controller{.js,.ts}'), async(err, matches) => {
                    if (err) rej(err);
                    
                    matches = matches.map(x => path.normalize(x));
                    if (matches.length == 0) res();

                    for (let file of matches) {
                        const instance = await import(file).catch(err => { throw err; });
                        const prototype = (Object.values(instance)[0] as any).prototype;

                        let groups = {} as any;

                        for (let item of Object.getOwnPropertyNames(prototype)) {
                            if (prototype[item].route) {
                                groups[prototype[item].route] = groups[prototype[item].route] || [];
                                groups[prototype[item].route].push(item);
                            }
                        }

                        for (let route in groups) {
                            for (let func of groups[route]) {
                                let fullRoute = prototype.route + route;
                                if (fullRoute.endsWith('/')) fullRoute = fullRoute.substring(0, fullRoute.length - 1);

                                if (prototype[func].anonymous) {
                                    anonymousRoutes.push({
                                        route: fullRoute,
                                        method: prototype[func].method
                                    });
                                }
                            }
                        }
                    }

                    res();
                });
            }
            catch(err) {
                rej(err);
            }
        });
    }

    private static async configureContainer(): Promise<void> {
        container.bind<IService>(TYPES.FooService).to(FooService);
    }

    private static configureServer(app: Application): void {
        app.use(helmet());

        app.get('/', (req, res) => res.sendFile(process.cwd() + '/src/public/index.html'));
        app.get('/favicon.ico', (req, res) => res.sendStatus(204));

        app.use(json());
        app.use(urlencoded({ extended: false }));

        if (process.env.DEBUG) app.use(Program.debugHandler);
        app.use(Program.authHandler);
        app.use(Program.errorHandler);
    }

    private static debugHandler(req: Request, res: Response, next: NextFunction): void {
        log(JSON.stringify({
            path: req.path, method: req.method, body: req.body, header: req.headers
        }), 'DEBUG');
        next();
    }

    private static async authHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
        next();
    }

    private static errorHandler(err: ErrorHandler, req: Request, res: Response, next: NextFunction): void {
        res.status(err.statusCode || 500).json({
            status: 'error',
            statusCode: err.statusCode,
            message: err.message
        });
    }

    public start(): void {
        const port = process.env.PORT || 5000;
        this.app.listen(port, () => {
            log(`Listening on port ${port}`, 'INFO');
        });
    }

}