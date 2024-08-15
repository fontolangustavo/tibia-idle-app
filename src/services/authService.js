import axiosInstance from '../configs/axios';

const authService = {
  googleLogin: (tokenId) => {
    return axiosInstance.post('auth/google', { token: tokenId });
  },
};

export default authService;
