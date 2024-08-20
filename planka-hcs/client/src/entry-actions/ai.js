import EntryActionTypes from '../constants/EntryActionTypes';

const aiMessageCreate = (data) => ({
  type: EntryActionTypes.AI_MESSAGE_CREATE,
  payload: {
    data,
  },
});

const aiMessageRegenerateResponse = () => ({
  type: EntryActionTypes.AI_MESSAGE_REGENERATE_RESPONSE,
});

export default {
  aiMessageCreate,
  aiMessageRegenerateResponse,
};
