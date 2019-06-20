const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLEAR_CURRENT_USER':
      return {};
    default:
      return state;
  }
};
