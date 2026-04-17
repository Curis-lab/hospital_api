export default class ExpressResponseHandler {
	_response;
	constructor(res) {
		this._response = res;
	}
	send(data) {
		return this._response.send(data.message);
	}
}
