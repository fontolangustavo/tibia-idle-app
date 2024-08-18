import api from '../configs/axios';
import { appendToFormData } from '../helpers/form';

const basePath = "auth";

export const auth = (options) => {
  const formData = new FormData();

  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      appendToFormData(formData, key, options[key]);
    }
  }

  return api.post(`${basePath}/google`, formData);
};
