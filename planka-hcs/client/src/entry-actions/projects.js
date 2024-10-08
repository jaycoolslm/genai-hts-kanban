import EntryActionTypes from '../constants/EntryActionTypes';

const createAiProject = (data) => ({
  type: EntryActionTypes.AI_PROJECT_CREATE,
  payload: {
    data,
  },
});

const handleAiProjectCreate = (project) => ({
  type: EntryActionTypes.AI_PROJECT_CREATE_HANDLE,
  payload: {
    project,
  },
});

const createProject = (data) => ({
  type: EntryActionTypes.PROJECT_CREATE,
  payload: {
    data,
  },
});

const handleProjectCreate = (project) => ({
  type: EntryActionTypes.PROJECT_CREATE_HANDLE,
  payload: {
    project,
  },
});

const updateCurrentProject = (data) => ({
  type: EntryActionTypes.CURRENT_PROJECT_UPDATE,
  payload: {
    data,
  },
});

const handleProjectUpdate = (project) => ({
  type: EntryActionTypes.PROJECT_UPDATE_HANDLE,
  payload: {
    project,
  },
});

const updateCurrentProjectBackgroundImage = (data) => ({
  type: EntryActionTypes.CURRENT_PROJECT_BACKGROUND_IMAGE_UPDATE,
  payload: {
    data,
  },
});

const deleteCurrentProject = () => ({
  type: EntryActionTypes.CURRENT_PROJECT_DELETE,
  payload: {},
});

const handleProjectDelete = (project) => ({
  type: EntryActionTypes.PROJECT_DELETE_HANDLE,
  payload: {
    project,
  },
});

export default {
  createAiProject,
  handleAiProjectCreate,
  createProject,
  handleProjectCreate,
  updateCurrentProject,
  handleProjectUpdate,
  updateCurrentProjectBackgroundImage,
  deleteCurrentProject,
  handleProjectDelete,
};
