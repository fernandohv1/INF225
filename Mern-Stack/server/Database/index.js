const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://Jan_Jorquera:papapapa999@bd-proyecto.ncrtpjy.mongodb.net/?retryWrites=true&w=majority"

const db = async () => {
    try{
        const conn = await mongoose.connect(MONGO_URL);
        console.log("BD Conectada", conn.connection.host)
    } catch (error) {
        console.log(error);
    }
}

module.exports = db;