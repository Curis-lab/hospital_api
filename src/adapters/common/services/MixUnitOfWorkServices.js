export default function MixUnitOfWorkService(Gateway) {
	return class UnitOfWorkService extends Gateway {
		constructor(...args) {
			super(...args);
		}
		startTransaction() {
			return "this is start transition";
		}
		commitTransaction() {
			return "";
		}
		rollbackTransaction() {
			return "";
		}
	};
}
