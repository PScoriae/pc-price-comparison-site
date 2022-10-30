import { dbConnect } from '$db/mongo';

try {
	await dbConnect();
	console.log('connected to mongodb');
} catch (e) {
	console.error(e);
}
