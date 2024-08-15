import ActionTypes from '../constants/ActionTypes';

const initialState = {
  messages: [],
  isSubmitting: false,
  hasError: false,
  error: null,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.AI_MESSAGE_CREATE__SUCCESS:
      return {
        ...state,
        messages: [...state.messages, payload.message],
        hasError: false,
        error: null,
      };
    case ActionTypes.AI_MESSAGE_CREATE__FAILURE:
      return {
        ...state,
        hasError: true,
        error: payload.error,
      };
    case ActionTypes.AI_MESSAGE_CREATE__IS_SUBMITTING:
      return {
        ...state,
        isSubmitting: payload.isSubmitting,
      };
    default:
      return state;
  }
};
