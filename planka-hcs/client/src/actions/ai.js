import ActionTypes from '../constants/ActionTypes';

const createAiMessage = (message) => ({
  type: ActionTypes.AI_MESSAGE_CREATE,
  payload: {
    message,
  },
});

createAiMessage.success = (localId, message) => ({
  type: ActionTypes.AI_MESSAGE_CREATE__SUCCESS,
  payload: {
    message: {
      id: localId,
      ...message,
    },
  },
});

createAiMessage.failure = (error) => ({
  type: ActionTypes.AI_MESSAGE_CREATE__FAILURE,
  payload: {
    error,
  },
});

createAiMessage.IsSubmitting = (isSubmitting) => ({
  type: ActionTypes.AI_MESSAGE_CREATE__IS_SUBMITTING,
  payload: {
    isSubmitting,
  },
});

const deleteAiMessage = (messageId) => ({
  type: ActionTypes.AI_MESSAGE_DELETE,
  payload: {
    id: messageId,
  },
});

const clearAiCreateMessageError = () => ({
  type: ActionTypes.AI_ERROR_CLEAR,
  payload: {},
});

export default {
  createAiMessage,
  deleteAiMessage,
  clearAiCreateMessageError,
};
