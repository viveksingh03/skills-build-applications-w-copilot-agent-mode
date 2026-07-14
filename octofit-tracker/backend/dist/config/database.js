import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose.connection;
export async function connectToDatabase() {
    if (db.readyState === 1) {
        return db;
    }
    await mongoose.connect(connectionString);
    return db;
}
connectToDatabase()
    .then(() => {
    console.log('Connected to octofit_db');
})
    .catch((error) => {
    console.error('Error connecting to octofit_db:', error);
    process.exit(1);
});
db.on('error', console.error.bind(console, 'connection error:'));
export default db;
