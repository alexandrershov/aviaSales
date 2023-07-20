import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getTicketReducer } from './getTicketReducer';
import { buttonFilterreducer } from './buttonFilter';
import { setFilterTicketReducer } from './setFilterTicketReducer';

const rootReducer = combineReducers({
  getTicketReducer,
  buttonFilterreducer,
  setFilterTicketReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
