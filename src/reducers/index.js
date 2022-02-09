
// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers
import counterReducer from './counterReducer';
// import addReducer from '../reducers/addReducer'

// export default combineReducers({
// })


// Redux: Root Reducer
const rootReducer = combineReducers({
  counter: counterReducer,
  

  // addReducer:addReducer

});
// Exports
export default rootReducer;