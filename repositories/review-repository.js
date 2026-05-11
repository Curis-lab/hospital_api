import reviewSchema from "../models/review-schema.js";

export default class ReviewRepository {
  constructor() {
    this.schema = reviewSchema;
  }
  async create(review) {
    await this.schema.create(review);
  }
  async delete(id) {
    await this.schema.findByIdAndDelete(id);
  }
  async edit(review) {
    const { id, ...editInfo } = review;
    let result;
    result = await this.schema.findByIdAndUpdate(id, editInfo);
    return result;
  }
}
