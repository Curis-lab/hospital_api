//
import { mixBookingRepos } from "./booking-schema.js";

const gateway = mixBookingRepos(class {});

function mix(gateway) {
	return class extends gateway {
		constructor() {
			super();
		}
		user(name) {
			console.log("this is first function");
			console.log(name);
		}
	};
}

function max(gateway) {
	return class extends gateway {
		constructor() {
			super();
		}
		//duplication
		findById(name) {
			console.log("last function");
			console.log(name);
		}
	};
}

const A = mix(max(class {}));
const a = new A();
a.user("name");
