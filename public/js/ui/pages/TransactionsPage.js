class TransactionsPage {
	constructor(element) {
		if (!element) {
			throw new Error('Element is not defined');
		}
		this.element = element;
		this.registerEvents();
	}

	update() {
		this.render(this.lastOptions);
	}

	registerEvents() {
		this.element.addEventListener('click', (event) => {
			if (event.target.classList.contains('remove-account')) {
				this.removeAccount();
			}
			else {
				const removeButton = event.target.closest('.transaction__remove');
				if (removeButton) {
					const transactionId = removeButton.dataset.id;

					const confirmation = confirm('Вы действительно хотите удалить эту транзакцию?');
					if (confirmation) {
						this.removeTransaction(transactionId);
					}
				}
			}
		});
	}

	removeAccount() {
		if (!this.lastOptions) return;
		Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
			if (err) {
				console.error(err);
				return;
			}
			if (response && response.success) {
				this.clear();
				App.updateWidgets();
				App.updateForms();
			}
		});
	}

	removeTransaction(id) {
		Transaction.remove({ id }, (err, response) => {
			if (err) {
				console.error(err);
				return;
			}
			if (response && response.success) {
				this.update();
				App.updateWidgets();
			}
		});
	}

	render(options) {
		if (!options) return;
		this.lastOptions = options;

		Account.get(options.account_id, (err, response) => {
			if (err) {
				console.error(err);
				return;
			}
			if (response && response.success) {
				this.renderTitle(response.data.name);
			}
		});

		Transaction.list(options, (err, response) => {
			if (err) {
				console.error(err);
				return;
			}
			if (response && response.success) {
				this.renderTransactions(response.data);
			}
		});
	}

	clear() {
		this.lastOptions = null;
		this.renderTransactions([]);
		this.renderTitle('Название счёта');
	}

	renderTitle(name) {
		const titleElement = this.element.querySelector('.content-title');
		titleElement.textContent = name;
	}

	formatDate(date) {
		const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
		return new Date(date).toLocaleString('ru', options).replace(',', ' в');
	}

	getTransactionHTML(item) {
		const dateFormatted = this.formatDate(item.created_at);
		const typeClass = item.type === 'expense' ? 'transaction_expense' : 'transaction_income';
		return `
		 <div class="transaction ${typeClass} row">
			<div class="col-md-7 transaction__details">
			  <div class="transaction__icon">
				 <span class="fa fa-money fa-2x"></span>
			  </div>
			  <div class="transaction__info">
				 <h4 class="transaction__title">${item.name}</h4>
				 <div class="transaction__date">${dateFormatted}</div>
			  </div>
			</div>
			<div class="col-md-3">
			  <div class="transaction__summ">${item.sum} <span class="currency">₽</span></div>
			</div>
			<div class="col-md-2 transaction__controls">
			  <button class="btn btn-danger transaction__remove" data-id="${item.id}">
				 <i class="fa fa-trash"></i>
			  </button>
			</div>
		 </div>
	  `;
	}

	renderTransactions(data) {
		const contentElement = this.element.querySelector('.content');
		contentElement.innerHTML = data.map(item => this.getTransactionHTML(item)).join('');
	}
}