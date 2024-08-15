import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { observer } from 'mobx-react-lite';
import { Avatar } from '@mui/material';

import { useStores } from '../../stores';
import { authService } from '../../services';

const Header = observer(() => {
  const { userStore } = useStores();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;

      const response = await authService.googleLogin(tokenId);

      const { token, user } = response.data;

      userStore.setJwtToken(token);
      userStore.setUserData(user);
    } catch (error) {
      console.error('Login Failed', error);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tibia Idle
        </Typography>
        {
          userStore.user ?
            (
              <>
                <Avatar alt={userStore.user.email} src={userStore.user.profileImage} sx={{ marginRight: 2 }} />
                <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
                  {userStore.user.email}
                </Typography>
              </>
            )
            :
            (
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleError}
                  auto_select
                />
              </GoogleOAuthProvider>
            )
        }
      </Toolbar>
    </AppBar>
  );
});

export default Header;
