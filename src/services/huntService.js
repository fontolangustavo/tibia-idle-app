import api from '../configs/axios';
import { appendToFormData } from '../helpers/form';

const basePath = "hunts";

export const enterDungeon = (options) => {
  const formData = new FormData();

  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      appendToFormData(formData, key, options[key]);
    }
  }

  return api.post(`${basePath}/${options.dungeonId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};