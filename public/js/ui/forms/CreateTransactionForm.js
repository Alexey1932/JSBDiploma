class CreateTransactionForm extends AsyncForm {
	constructor(element) {
		super(element);
		this.renderAccountsList();
	}

	renderAccountsList() {
		const selectElement = this.element.querySelector(".accounts-select");
		const data = User.current();
		Account.list({ user: data?.user, password: data?.password }, (err, response) => {
			if (err) {
				console.error(err);
				return;
			}
			selectElement.innerHTML = response?.data?.map(account => `<option value="${account.id}">${account.name}</option>`).join("");
		});
	}

	onSubmit(data) {
		Transaction.create(data, (err, response) => {
			if (err) {
				console.error(err);
				return;
			}
			this.element.reset();
			const modalElement = this.element.closest(".modal");
			const modal = App.getModal(modalElement.dataset.modalId);
			modal.close();
			App.update();
		});
	}
}