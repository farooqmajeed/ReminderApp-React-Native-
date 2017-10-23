import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import AppReducer from './AppReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  app: AppReducer
});
export default rootReducer;