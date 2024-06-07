class AsyncForm {
	constructor(element) {
		if (!element) {
			throw new Error("Element is required");
		}
		this.element = element;
		this.registerEvents();
	}

	registerEvents() {
		this.element.addEventListener('submit', (event) => {
			event.preventDefault();
			this.submit();
		});
	}

	getData() {
		const formData = new FormData(this.element);
		const data = {};
		formData.forEach((value, key) => {
			data[key] = value;
		});
		return data;
	}

	onSubmit(options) {

	}

	submit() {
		this.onSubmit(this.getData());
	}
}