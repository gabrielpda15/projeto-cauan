import { httpGet, httpPost, httpPut, httpDelete, Middleware } from 'inversify-express-utils';
import { REGEX } from '../constants';

function httpValidateRoute(route: string, parameters: any[]) {
    if (REGEX.Route.test(route)) {
        route = route.replace(REGEX.Route, (v, g1, g2) => {
            parameters.push({
                in: 'path',
                name: g1,
                schema: {
                    type: g2
                },
                required: true
            });
            return `:${g1}`;
        });
    }
}

function HttpGet(route: string, summary?: string, description?: string, ...middleware: Middleware[]) {
    return function (
        target: any,
        key: string,
        descriptor: PropertyDescriptor
    ) {
        const parameters = descriptor.value.swagger?.parameters ?? [];
        httpValidateRoute(route, parameters);

        descriptor.value.method = 'get';
        descriptor.value.route = route;
        descriptor.value.swagger = {
            summary: summary,
            description: description,
            consumes: [],
            produces: ['application/json'],
            requestBody: descriptor.value.swagger?.requestBody,
            parameters: parameters,
            responses: descriptor.value.swagger?.responses
        };

        return httpGet(route, ...middleware)(target, key, descriptor);
    };
}

function HttpPost(route: string, summary?: string, description?: string, ...middleware: Middleware[]) {
    return function (
        target: any,
        key: string,
        descriptor: PropertyDescriptor
    ) {
        const parameters = descriptor.value.swagger?.parameters ?? [];
        httpValidateRoute(route, parameters);

        descriptor.value.method = 'post'
        descriptor.value.route = route;
        descriptor.value.swagger = {
            summary: summary,
            description: description,
            consumes: ['application/json'],
            produces: ['application/json'],
            requestBody: descriptor.value.swagger?.requestBody,
            parameters: parameters,
            responses: descriptor.value.swagger?.responses
        };

        return httpPost(route, ...middleware)(target, key, descriptor);
    };
}

function HttpPut(route: string, summary?: string, description?: string, ...middleware: Middleware[]) {
    return function (
        target: any,
        key: string,
        descriptor: PropertyDescriptor
    ) {
        const parameters = descriptor.value.swagger?.parameters ?? [];
        httpValidateRoute(route, parameters);

        descriptor.value.method = 'put'
        descriptor.value.route = route;
        descriptor.value.swagger = {
            summary: summary,
            description: description,
            consumes: ['application/json'],
            produces: ['application/json'],
            requestBody: descriptor.value.swagger?.requestBody,
            parameters: parameters,
            responses: descriptor.value.swagger?.responses
        };

        return httpPut(route, ...middleware)(target, key, descriptor);
    };
}

function HttpDelete(route: string, summary?: string, description?: string, ...middleware: Middleware[]) {
    return function (
        target: any,
        key: string,
        descriptor: PropertyDescriptor
    ) {
        const parameters = descriptor.value.swagger?.parameters ?? [];
        httpValidateRoute(route, parameters);

        descriptor.value.method = 'delete'
        descriptor.value.route = route;
        descriptor.value.swagger = {
            summary: summary,
            description: description,
            consumes: [],
            produces: ['application/json'],
            requestBody: descriptor.value.swagger?.requestBody,
            parameters: parameters,
            responses: descriptor.value.swagger?.responses
        }

        return httpDelete(route, ...middleware)(target, key, descriptor);
    };
}

export default { HttpGet, HttpPost, HttpPut, HttpDelete };