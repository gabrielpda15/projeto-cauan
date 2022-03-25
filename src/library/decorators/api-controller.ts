import { controller, Middleware } from 'inversify-express-utils';

function ApiController(route: string, name?: string, ...middleware: Middleware[]) {
    return function (
        target: any
    ) {
        target.prototype.route = route;
        target.prototype.tag = name ?? (<string>target.name).replace(/Controller/g, '');
        
        return controller(route, ...middleware)(target);
    };
}

export default { ApiController };