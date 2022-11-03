// shortens length of string and appends periods if length is greater than 100
export const compressProductName = (name: string) => {
	if (name.length > 100) return `${name.slice(0, 100)}...`;
	else return name;
};

// format number into MYR currency
export const currencyFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'MYR'
});
