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

  let choices;
  try {
    ({ choices } = yield call(request, api.createChatCompletion, payload));
  } catch (error) {
    yield put(actions.createAiMessage.failure(error));
    yield put(actions.createAiMessage.IsSubmitting(false));
    console.error(error);
    return;
  }

  console.log(choices);

  const responseLocalId = yield call(createLocalId);
  yield put(actions.createAiMessage.success(responseLocalId, choices[0].message));
  yield put(actions.createAiMessage.IsSubmitting(false));
}

export function* regenerateAiResponse() {
  yield put(actions.clearAiCreateMessageError());
  yield put(actions.createAiMessage.IsSubmitting(true));

  const messages = yield select(selectors.selectAiMessages);

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'user') {
    yield put(actions.deleteAiMessage(lastMessage.id));
    messages.pop();
  }

  const payload = messages.map(({ id, ...message }) => message);

  let choices;
  try {
    ({ choices } = yield call(request, api.createChatCompletion, payload));
  } catch (error) {
    yield put(actions.createAiMessage.failure(error));
    yield put(actions.createAiMessage.IsSubmitting(false));
    console.error(error);
    return;
  }

  const responseLocalId = yield call(createLocalId);
  yield put(actions.createAiMessage.success(responseLocalId, choices[0].message));
  yield put(actions.createAiMessage.IsSubmitting(false));
}

export default {
  createAiMessage,
  regenerateAiResponse,
};
