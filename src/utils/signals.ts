import {signal} from '@preact/signals-react';

export class CreateSignal<T> {
	private signal;

	constructor(initialValue: T) {
		this.signal = signal(initialValue);
	}

	get value() {
		return this.signal.value;
	}

	set(valueOrUpdater: T | ((prevValue: T) => T)) {
		if (valueOrUpdater instanceof Function)
			this.signal.value = valueOrUpdater(this.value);
		else this.signal.value = valueOrUpdater;
	}
}

export class CreateSignalBoolean extends CreateSignal<boolean> {
	constructor(initialValue = false) {
		super(initialValue);
	}

	toggle() {
		this.set(p => !p);
	}
}

export class CreateSignalArray<T> extends CreateSignal<T[]> {
	constructor(initialValue: T[]) {
		super(initialValue);
	}

	append(value: T) {
		this.set(prev => [...prev, value]);
	}

	prepend(value: T) {
		this.set(prev => [value, ...prev]);
	}

	remove(callback: GetProps<Array<T>['findIndex']>) {
		this.set(prev => {
			const index = prev.findIndex(callback);
			return prev.remove(index);
		});
	}
}
