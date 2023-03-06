import {user} from './Reducers/users';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = createStore(
    combineReducers({
        users: user
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
      
  
  export default store;