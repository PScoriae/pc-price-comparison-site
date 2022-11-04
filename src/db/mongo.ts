import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
const url: string = process.env.MONGO_URL ?? 'mongodb://localhost:4600/pc-comparison-site';
const client = new MongoClient(url, { minPoolSize: 10 });

export function dbConnect() {
	console.log('starting mongo...');
	return client.connect();
}

export default client.db();
