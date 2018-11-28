const port = 3030;
const host = '127.0.0.1';
const dbUrl = 'mongodb://root:redhat@localhost:27017/hotel';
const dbUser = 'root';
const dbPwd = 'redhat';
const dbAuthSource = 'admin';
const secretKey = 'yaswanthreddy';



module.exports = {
    port: port,
    host: host,
    dbUrl: dbUrl,
    dbUser: dbUser,
    dbPwd: dbPwd,
    dbAuthSource: dbAuthSource,
    secretKey: secretKey
}