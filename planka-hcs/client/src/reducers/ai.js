import ActionTypes from '../constants/ActionTypes';

const initialState = {
  messages: [],
  isSubmitting: false,
  isSubmittingMessage: '',
  isAiCreatingProject: false,
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
    case ActionTypes.AI_ERROR_CLEAR:
      return {
        ...state,
        hasError: false,
        error: null,
      };
    case ActionTypes.AI_MESSAGE_DELETE:
      return {
        ...state,
        messages: state.messages.filter(({ id }) => id !== payload.id),
      };
    case ActionTypes.AI_MESSAGE_CREATE__IS_SUBMITTING:
      return {
        ...state,
        isSubmitting: payload.isSubmitting,
        isSubmittingMessage: payload.isSubmittingMessage,
      };
    case ActionTypes.AI_PROJECT_CREATE__LOADING:
      return {
        ...state,
        isAiCreatingProject: payload.isAiCreatingProject,
      };
    default:
      return state;
  }
};
