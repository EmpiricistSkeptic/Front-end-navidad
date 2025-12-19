// src/services/letter.service.js
import api from './api.service';

const getLetters = async () => {
  // вернёт все письма до текущего дня (см. поведение ViewSet на бэкенде)
  return await api.get('/letters/');
};

// dayIndex — именно индекс дня (lookup_field = "day_index")
const getLetter = async (dayIndex) => {
  if (dayIndex == null) throw new Error('Не указан dayIndex для письма');
  return await api.get(`/letters/${dayIndex}/`);
};

const letterService = {
  getLetters,
  getLetter,
};

export default letterService;
