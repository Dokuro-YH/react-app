import * as actions from '../actions/login';

export default (state = {
  loginPending: false,
}, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state, loginPending: true };
    default:
      return state;
  }
};
