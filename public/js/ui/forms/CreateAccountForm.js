
class CreateAccountForm extends AsyncForm {
	onSubmit(data) {
		Account.create(data, (err, response) => {
			if (response && response.success) {
				App.getModal('createAccount').close();
				this.element.reset();
				App.update();
			} else {
				console.error(err);
			}
		});
	}
} 