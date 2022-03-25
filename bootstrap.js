const tsConfig = require('./tsconfig.deploy.json');
const tsConfigPaths = require('tsconfig-paths');

const cleanup = tsConfigPaths.register(tsConfig.compilerOptions);

process.on('SIGUSR2', () => { process.kill(process.pid, 'SIGUSR2'); cleanup(); });
process.on('SIGINT', () => { process.kill(process.pid, 'SIGINT'); cleanup(); });
