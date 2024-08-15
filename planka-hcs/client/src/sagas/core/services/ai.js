import { call, put, select } from 'redux-saga/effects';

import actions from '../../../actions';
import request from '../request';
import api from '../../../api/ai';
import selectors from '../../../selectors';

import { createLocalId } from '../../../utils/local-id';

export function* createAiMessage(data) {
  yield put(actions.createAiMessage.IsSubmitting(true));
  const requestLocalId = yield call(createLocalId);

  yield put(actions.createAiMessage.success(requestLocalId, data));

  const messages = yield select(selectors.selectAiMessages);

  const payload = messages.map(({ id, ...message }) => message);

  try {
    const { choices } = yield call(request, api.createChatCompletion, payload);
    const responseLocalId = yield call(createLocalId);
    yield put(actions.createAiMessage.success(responseLocalId, choices[0].message));
    yield put(actions.createAiMessage.IsSubmitting(false));
  } catch (error) {
    yield put(actions.createAiMessage.failure(error));
    yield put(actions.createAiMessage.IsSubmitting(false));
    console.error(error);
  }
}

export default {
  createAiMessage,
};
