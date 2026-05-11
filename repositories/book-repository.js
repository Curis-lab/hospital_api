import BookSchema from "../models/booking-schema.js";

export default class BookRepository {
	_validate(data) {}
	async create(data) {
		this._validate(data);
		return await BookSchema.create(data);
	}
	async delete(id){
			
	}
}
