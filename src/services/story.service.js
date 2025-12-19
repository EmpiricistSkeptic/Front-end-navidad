// src/services/story.service.js
import api from './api.service';

// Возвращает { today_day_index, progress, letters }
const initStory = async () => {
  return await api.get('/story/init/');
};

// Возвращает первый узел для сегодняшнего дня (DialogueNodeSerializer)
const getTodayDialogue = async () => {
  return await api.get('/story/today/');
};

/*
  Отправляем ответ.
  request payload должен быть в формате, ожидаемом SubmitAnswerSerializer:
    { dialogue_node: <id>, answer_option: <id> }

  Ответ от сервера:
    - { end: true }
    - или { end: false, node: <DialogueNode> }
*/
const sendAnswer = async (dialogueNodeId, answerOptionId) => {
  if (!dialogueNodeId || !answerOptionId) {
    throw new Error('dialogueNodeId и answerOptionId обязательны');
  }

  return await api.post('/story/answer/', {
    dialogue_node: dialogueNodeId,
    answer_option: answerOptionId,
  });
};

const storyService = {
  initStory,
  getTodayDialogue,
  sendAnswer,
};

export default storyService;
