const initialState = {
  ticketElements: [],
};

export const getTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TICKET_ELEMENTS':
      return { ...state, ticketElements: [...action.payload] };
    case 'UPDATE_TICKET_ELEMENTS':
      return { ...state, ticketElements: [...action.payload] };
    default:
      return state;
  }
};
