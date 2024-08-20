export const selectIsInitializing = ({ root: { isInitializing } }) => isInitializing;

export const selectIsAiCreatingProject = ({ ai: { isAiCreatingProject } }) => isAiCreatingProject;

export const selectConfig = ({ root: { config } }) => config;

export const selectOidcConfig = (state) => selectConfig(state).oidc;

export default {
  selectIsInitializing,
  selectIsAiCreatingProject,
  selectConfig,
  selectOidcConfig,
};
