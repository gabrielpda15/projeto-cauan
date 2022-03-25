import allowanonymous from './decorators/allow-anonymous';
import apicontroller from './decorators/api-controller';
import httpmethods from './decorators/http-methods';

const decorators = { 
    ...allowanonymous,
    ...apicontroller,
    ...httpmethods
};

export = decorators;