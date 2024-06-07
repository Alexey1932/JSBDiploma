class RegisterForm extends AsyncForm {
	onSubmit(data) {
		User.register(data, (err, response) => {
			if (response && response.success) {
				this.element.reset();
				App.setState('user-logged');
				const modalElement = this.element.closest(".modal");
				App.getModal(modalElement.dataset.modalId).close();
			}
		});
	}
}