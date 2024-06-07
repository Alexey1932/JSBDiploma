class Modal {
	constructor(element) {
		if (!element) {
			throw new Error("Element is required");
		}
		this.element = element;
		this.registerEvents();
	}

	registerEvents() {
		const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
		closeButtons.forEach(button => {
			button.addEventListener('click', (e) => this.onClose(e));
		});
	}

	onClose(e) {
		e.preventDefault();
		this.close();
	}

	open() {
		this.element.style.display = 'block';
	}

	close() {
		this.element.style.display = 'none';
	}
}