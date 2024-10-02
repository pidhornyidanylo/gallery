export function debounce<T extends (...args: any[]) => void>(
	func: T,
	timeout = 300,
	maxWait?: number,
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout>;
	let lastInvokeTime = Date.now();
	let maxTimer: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		const timeSinceLastInvoke = Date.now() - lastInvokeTime;

		clearTimeout(timer);

		if (maxWait && timeSinceLastInvoke >= maxWait) {
			lastInvokeTime = Date.now();
			func.apply(null, args);
		} else {
			timer = setTimeout(() => {
				lastInvokeTime = Date.now();
				func.apply(null, args);
			}, timeout);
		}

		if (maxWait && !maxTimer) {
			maxTimer = setTimeout(() => {
				if (timeSinceLastInvoke < maxWait) {
					lastInvokeTime = Date.now();
					func.apply(null, args);
				}
				maxTimer = null;
			}, maxWait);
		}
	};
}
