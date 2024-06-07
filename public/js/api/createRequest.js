const createRequest = (options = {}) => {
	const { url, data = {}, method, callback } = options;
	const xhr = new XMLHttpRequest();
	const urlParams = new URLSearchParams(data).toString();
	const requestUrl = method === 'GET' && data
		? `${url}?${urlParams}`
		: url;

	xhr.open(method, requestUrl);
	xhr.responseType = 'json';

	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			callback(null, xhr.response);
		} else {
			callback(new Error(`Request failed with status ${xhr.status}`), null);
		}
	};

	xhr.onerror = () => {
		callback(new Error('Network error'), null);
	};

	if (method !== 'GET' && data) {
		const formData = new FormData();
		for (const key in data) {
			formData.append(key, data[key]);
		}
		xhr.send(formData);
	} else {
		xhr.send();
	}
};