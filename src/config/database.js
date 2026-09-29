const mongoose = require("mongoose");
const { DB_NAME } = require("../constants.js")

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MonGODB_URI}/${DB_NAME}`
        );
        console.log(
            `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );
        
    }catch(error){
        console.error("mongodb connection ERROR:", error)
        process.exit(1);
    }
}

module.exports = { connectDB }


