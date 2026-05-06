import BookSchema from "../models/booking-schema.js";

export default class BookRepository {
	_validate(data) {}
	create(data) {
		this._validate(data);
		return await BookSchema.create(data);
	}
}
