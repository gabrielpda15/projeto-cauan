import 'reflect-metadata';
import { config } from 'dotenv';
import { Program } from './library/program';

config({ path: '.env' });

Program.create()
    .then(p => p.start())
    .catch(err => { })
    .finally(() => { });