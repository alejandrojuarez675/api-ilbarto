import mongoose from 'mongoose';

async function connect() {
    const host = process.env.MONGO_HOST || 'localhost';
    const dbName = process.env.DB || 'ilbarto';

    await mongoose.connect(`mongodb://${host}/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    console.log(`MongoDb '${dbName}' at '${host}' is connected`)
}
connect();

export default mongoose.connection;