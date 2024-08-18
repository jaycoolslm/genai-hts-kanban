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

createAiMessage.IsSubmitting = (isSubmitting, isSubmittingMessage) => ({
  type: ActionTypes.AI_MESSAGE_CREATE__IS_SUBMITTING,
  payload: {
    isSubmitting,
    isSubmittingMessage,
  },
});

const deleteAiMessage = (messageId) => ({
  type: ActionTypes.AI_MESSAGE_DELETE,
  payload: {
    id: messageId,
  },
});

const aiCreateProjectLoading = (isAiCreatingProject) => ({
  type: ActionTypes.AI_PROJECT_CREATE__LOADING,
  payload: {
    isAiCreatingProject,
  },
});

const clearAiCreateMessageError = () => ({
  type: ActionTypes.AI_ERROR_CLEAR,
  payload: {},
});

export default {
  createAiMessage,
  deleteAiMessage,
  aiCreateProjectLoading,
  clearAiCreateMessageError,
};
