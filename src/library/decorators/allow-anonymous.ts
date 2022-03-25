function AllowAnonymous() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.value.anonymous = true;
    };
}

export default { AllowAnonymous };