import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();
const url: string = process.env.MONGO_URL ?? 'mongodb://localhost:4600/pc-comparison-site';
const client = new MongoClient(url, {
	minPoolSize: 10,
	compressors: 'zstd'
});

try {
	await client.connect();
} catch (e) {
	console.error(e);
}

export default client.db();
