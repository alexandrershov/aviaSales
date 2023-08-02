import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { buttonFilterreducer } from './buttonFilter';
import { setFilterTicketReducer } from './setFilterTicketReducer';

const rootReducer = combineReducers({
  buttonFilterreducer,
  setFilterTicketReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
