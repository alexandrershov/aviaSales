const initialState = {
  cheap: true,
  fast: false,
};

export const buttonFilterreducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CHEAP_TICKET':
      return { ...state, cheap: true, fast: false };
    case 'GET_FAST_TICKET':
      return { ...state, cheap: false, fast: true };
    default:
      return state;
  }
};
