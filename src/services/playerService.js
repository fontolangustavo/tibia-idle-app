import api from '../configs/axios';
import { appendToFormData } from '../helpers/form';

const basePath = "players";

export const getAllPlayers = (options = {}) => {
  const options_default = {};

  options = Object.assign({}, options_default, options);

  let params = [];
  let params_qs = "";

  if (options.hasOwnProperty("page")) {
    params.push(`page=${options.page}`);
  }

  if (options.hasOwnProperty("limit")) {
    params.push(`limit=${options.limit}`);
  }

  if (params.length) {
    params_qs = `?${params.join("&")}`;
  }

  return api.get(`${basePath}${params_qs}`);
};

export const store = (options) => {
  const formData = new FormData();

  for (let key in options) {
    if (options.hasOwnProperty(key)) {
      appendToFormData(formData, key, options[key]);
    }
  }

  return api.post(basePath, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
};
