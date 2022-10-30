import db from '$db/mongo';

export const learningArticles = db.collection('learning-articles');
export const pcParts = db.collection('pc-parts');
export const users = db.collection('users');
