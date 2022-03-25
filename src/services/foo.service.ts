import { injectable } from 'inversify';

@injectable()
export class FooService implements IService {

    public execute() {
        console.log('Executado!');
    }

}

export interface IService {
    execute(): void;
}