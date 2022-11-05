export type PartsList = {
	cpu: Part | null;
	motherboard: Part | null;
	memory: Part | null;
	gpu: Part | null;
	psu: Part | null;
	case: Part | null;
	cooling: Part | null;
};

export type Part = {
	_id: string;
	price: string;
	sellerId: string;
	skuId: string;
	desc: string[] | null;
	imgUrl: string;
	itemUrl: string;
	name: string;
	sellerName: string;
	type: string;
};

export type savedPartsList = {
	partsListId: string;
	username: string;
	name: string;
	partsList: PartsList;
};
