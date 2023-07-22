const initialState = {
  cheap: true,
  fast: false,
};

export const buttonFilterreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHEAP_TICKET':
      return { ...state, cheap: action.payload };
    case 'GET_FAST_TICKET':
      return { ...state, fast: action.payload };
    default:
      return state;
  }
};
