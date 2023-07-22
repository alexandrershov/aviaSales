const initialState = {
  filter: ['All']
};

export const setFilterTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FILTER_TICKET': 
    if (state.filter.includes(action.payload)) {
      return {...state, filter: state.filter.filter( el => el !== action.payload)}
    } return { ...state, filter: [...state.filter, action.payload] }; 
    default:
      return state;
  }
};
