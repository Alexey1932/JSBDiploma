class AccountsWidget {
	constructor(element) {
		if (!element) {
			throw new Error('Element is not defined');
		}
		this.element = element;
		this.registerEvents();
		this.update();
	}

	registerEvents() {
		this.element.querySelector('.create-account').addEventListener('click', () => {
			App.getModal('createAccount').open();
		});

		this.element.addEventListener('click', (event) => {
			if (event.target.closest('.account')) {
				this.onSelectAccount(event.target.closest('.account'));
			}
		});
	}

	update() {
		const currentUser = User.current();
		if (currentUser) {
			Account.list(currentUser, (err, response) => {
				if (response && response.success) {
					this.clear();
					response.data.forEach(account => {
						this.renderItem(account);
					});
				}
			});
		}
	}

	clear() {
		const accounts = this.element.querySelectorAll('.account');
		accounts.forEach(account => account.remove());
	}

	onSelectAccount(element) {
		const activeAccount = this.element.querySelector('.account.active');
		if (activeAccount) {
			activeAccount.classList.remove('active');
		}
		element.classList.add('active');
		App.showPage('transactions', { account_id: element.dataset.id });
	}

	getAccountHTML(item) {
		return `
		 <li class="account" data-id="${item.id}">
			<a href="#">
			  <span>${item.name}</span> /
			  <span>${item.sum} ₽</span>
			</a>
		 </li>
	  `;
	}

	renderItem(data) {
		const html = this.getAccountHTML(data);
		this.element.insertAdjacentHTML('beforeend', html);
	}
}