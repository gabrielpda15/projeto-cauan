const REGEX = {
    Route: /{([a-zA-Z]+[a-zA-Z0-9]*):(number|string)+}/g,
    Email: /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

const TYPES = {
    FooService: Symbol('FooService')
};

export { REGEX, TYPES };