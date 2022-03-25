import * as fs from 'fs';
import jwt from 'jsonwebtoken';

const privateKey: string = fs.readFileSync('jwtRSA256.key', 'utf8');
const publicKey: string = fs.readFileSync('jwtRSA256.key.pub', 'utf8');

export function getToken(payload: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '24h' }, (e, t) => {
            if (e || !t) reject(e);
            resolve(t);
        });
    });
}

export function getTokenObject(token: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        try {
            const splitToken = (token?.split('Bearer ') ?? [])[1];
            const decode = jwt.verify(splitToken, publicKey, { algorithms: ['RS256'] })
            resolve(decode);
        } catch (err) {
            reject(err);
        }
    });
}

export default { getToken, getTokenObject };