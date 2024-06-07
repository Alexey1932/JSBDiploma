
class UserWidget {

	constructor(element) {
		if (!element) {
			throw new Error('No element');
		}
		this.element = element;
	}


	update() {
		let user = User.current();
		if (user) {
			let userNameEl = this.element.querySelector('.user-name')
			userNameEl.textContent = user.name;
		}
	}
}
