class Sidebar {
	static init() {
		this.initAuthLinks();
		this.initToggleButton();
	}

	static initToggleButton() {
		const toggleButton = document.querySelector('.sidebar-toggle');
		toggleButton.addEventListener('click', () => {
			document.body.classList.toggle('sidebar-open');
			document.body.classList.toggle('sidebar-collapse');
		});
	}

	static initAuthLinks() {
		const loginButton = document.querySelector('.menu-item_login');
		const registerButton = document.querySelector('.menu-item_register');
		const logoutButton = document.querySelector('.menu-item_logout');

		loginButton.addEventListener('click', () => {
			App.getModal('login').open();
		});

		registerButton.addEventListener('click', () => {
			App.getModal('register').open();
		});

		logoutButton.addEventListener('click', (e) => {
			e.preventDefault();
			User.logout((err, response) => {
				if (response.success) {
					App.setState('init');
				}
			});
		});
	}
}