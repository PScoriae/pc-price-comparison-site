import db from '$db/mongo';

export const PcParts = db.collection('pc-parts');
export const Users = db.collection('users');
export const PartsLists = db.collection('parts-lists');
