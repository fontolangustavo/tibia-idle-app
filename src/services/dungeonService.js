import api from '../configs/axios';

const basePath = "dungeons";

export const getAll = (options) => {
  const options_default = {};

  // Merge config
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

export const enterDungeon = (dungeonId, playerId) => {
  return api.post(`${basePath}/${dungeonId}`, { playerId });
};