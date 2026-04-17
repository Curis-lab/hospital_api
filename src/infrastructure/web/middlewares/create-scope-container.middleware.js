import { asValue } from "awilix";
import ExpressResponseHandler from "../express-response-handler.js";
//I need to response value;
export default (container) => {
  return (req, res, next) => {
    const scope = container.createScope();

    scope.register({
      httpResponseHandler: asValue(new ExpressResponseHandler(res)),
    });
    req.container = scope;
    next();
  };
};
