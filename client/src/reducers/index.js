import { combineReducers } from "redux";
import User from "./userReducer";
import Attributes from "./attributesReducer";

const rootReducer = combineReducers({
  Attributes,
  User
});

export default rootReducer;
