import crypto from 'node:crypto';

console.clear();

let secret_message = ":)";

let key = '1233838';

let iv = crypto.randomBytes(16);

let cipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

console.log('cip',cipher);



 