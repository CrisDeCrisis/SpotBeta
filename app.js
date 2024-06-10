const myslq2 = require('mysql2/promise');

const newConnection = async () => {
    const connection = await myslq2.createConnection({
        host:"localhost", // IP del servidor donde se aloja la bd
        user : "root",
        database : "spotbeta" // El nombre de la base de datos
    })

    return connection

}

module.exports = {
    newConnection
}