import http, { IS_JSON_BODY } from './http';

const AI_BASE_URL = 'http://localhost:3001/v1/ai';

const createChatCompletion = (data, headers) =>
  http.post(`${AI_BASE_URL}/completion/chat`, data, headers, IS_JSON_BODY).then((body) => body);

const getQuestionary = (data, headers) =>
  http.get(`${AI_BASE_URL}/questions`, headers, IS_JSON_BODY).then((body) => {
    return {
      choices: [{ message: body }],
    };
  });

const formatSpec = (data, headers) =>
  http
    .post(`${AI_BASE_URL}/format-spec`, data, headers, IS_JSON_BODY)
    .then((body) => body.choices[0].message.parsed);

export default {
  createChatCompletion,
  getQuestionary,
  formatSpec,
};
