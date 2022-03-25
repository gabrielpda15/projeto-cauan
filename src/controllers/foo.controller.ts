import { TYPES } from '@app/library/constants';
import { ApiController, HttpGet } from '@app/library/decorators';
import { FooService } from '@app/services/foo.service';
import * as express from 'express';
import { inject } from 'inversify';
import { interfaces } from "inversify-express-utils";

@ApiController('/api/foo')
export class FooController implements interfaces.Controller {

    constructor(
        @inject(TYPES.FooService) private fooService: FooService
    ) { }

    @HttpGet('/')
    private async index(req: express.Request, res: express.Response, next: express.NextFunction): Promise<string> {
        this.fooService.execute();
        return 'Hello World!'
    }

}