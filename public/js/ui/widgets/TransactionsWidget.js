class TransactionsWidget {
	constructor(element) {
		if (!element) {
			throw new Error('Element is not defined');
		}
		this.element = element;
		this.registerEvents();
	}

	registerEvents() {
		this.element.querySelector('.create-income-button').addEventListener('click', () => {
			App.getModal('newIncome').open();
		});

		this.element.querySelector('.create-expense-button').addEventListener('click', () => {
			App.getModal('newExpense').open();
		});
	}
}