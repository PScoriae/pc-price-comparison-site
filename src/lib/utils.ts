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

export function clickToCopy(
	node: {
		innerText: any;
		dispatchEvent: (arg0: CustomEvent<unknown>) => void;
		addEventListener: (arg0: string, arg1: () => Promise<void>) => void;
		removeEventListener: (arg0: string, arg1: () => Promise<void>) => void;
	},
	target: any
) {
	async function copyText() {
		let text = target ? document.querySelector(target).innerText : node.innerText;

		try {
			await navigator.clipboard.writeText(text);

			node.dispatchEvent(
				new CustomEvent('copysuccess', {
					bubbles: true
				})
			);
		} catch (error) {
			node.dispatchEvent(
				new CustomEvent('copyerror', {
					bubbles: true,
					detail: error
				})
			);
		}
	}

	node.addEventListener('click', copyText);

	return {
		destroy() {
			node.removeEventListener('click', copyText);
		}
	};
}
