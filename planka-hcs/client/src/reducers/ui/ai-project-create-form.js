import ActionTypes from '../../constants/ActionTypes';

const initialState = {
  data: {
    content: '',
  },
  isSubmitting: false,
};

// eslint-disable-next-line default-param-last
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.AI_PROJECT_CREATE:
      return {
        ...state,
        data: {
          ...state.data,
          ...payload.data,
        },
        isSubmitting: true,
      };
    case ActionTypes.AI_PROJECT_CREATE__SUCCESS:
      return initialState;
    case ActionTypes.AI_PROJECT_CREATE__FAILURE:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
};
