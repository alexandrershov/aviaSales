const initialState = {
  filter: 'All',
};

export const setFilterTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_FILTER_TICKET':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};
