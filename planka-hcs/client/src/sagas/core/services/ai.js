import { call, put, select, all } from 'redux-saga/effects';

import actions from '../../../actions';
import request from '../request';
import api from '../../../api/ai';
import selectors from '../../../selectors';

import { createLocalId } from '../../../utils/local-id';
import { createProject } from './projects';
import { createBoard, createBoardInCurrentProject } from './boards';
import { createListInCurrentBoard } from './lists';
import { createCard } from './cards';
import { createTask, createTaskInCurrentCard } from './tasks';
import { goToBoard, goToProject } from './router';

export function* createAiProject(data) {
  yield put(actions.createAiProject(data));

  // the data returned from ai formatting
  let projectData;

  let project;
  let projectManagers;

  try {
    projectData = yield call(request, api.formatSpec, data);

    console.log('project data', projectData);
  } catch (error) {
    yield put(actions.createAiProject.failure(error));
    return;
  }

  // what are these actions actually doing?
  // do we need them...
  yield put(actions.createAiProject.success(project, projectManagers));

  yield call(createProject, { name: projectData.projectName });

  /* eslint-disable no-restricted-syntax */
  for (const board of projectData.boards) {
    // create board
    yield call(createBoardInCurrentProject, { name: board.name });
    // create lists in board
    const LISTS = ['To do', 'In Progress', 'In Review', 'Complete'];
    const todoListLocalId = yield call(createLocalId);
    for (const list of LISTS) {
      // if To do list, add cards here
      if (list === LISTS[0]) {
        yield call(createListInCurrentBoard, { name: list, localId: todoListLocalId });
        const listIds = yield select(selectors.selectListIdsForCurrentBoard);
        const todoListId = listIds[0];
        // iterate over cards and add
        for (const card of board.cards) {
          yield call(
            createCard,
            todoListId,
            { name: card.name, description: card.description },
            // true,
          );
          // // add tasks for the opened card
          // for (const task of card.tasks) {
          //   yield call(createTaskInCurrentCard, { name: task.name });
          // }
        }
        // list all cards
        const cardIds = yield select(selectors.selectCardIdsByListId, todoListId);
        for (const [index, cardId] of cardIds.entries()) {
          const card = board.cards[index];
          // add tasks for the given card
          for (const task of card.tasks) {
            yield call(createTask, cardId, { name: task.name });
          }
        }
      } else {
        yield call(createListInCurrentBoard, { name: list });
      }
    }
  }
  /* eslint-enable no-restricted-syntax */

  // REDIRECT TO BOARD ISN'T
  // TODO fix redirect after creating

  // const currentProject = yield select(selectors.selectCurrentProject);
  // const currentBoard = yield select(selectors.selectCurrentBoard);
  // console.log('current project: ', currentProject);
  // console.log('current board: ', currentBoard);
  // yield call(goToProject, currentProject.id);
  // yield call(goToBoard, currentBoard.id);
}

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
  createAiProject,
  createAiMessage,
  regenerateAiResponse,
};
