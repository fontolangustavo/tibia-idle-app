import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logout from '@mui/icons-material/Logout';

import { useStores } from '../../stores';
import { authService, playerService } from '../../services';
import { apiUpdateAccessToken } from '../../configs/axios';
import CharacterDialog from '../CharacterDialog';

const Header = observer(() => {
  const { userStore } = useStores();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoadingPlayer, setLoadingPlayers] = useState(false);

  const fetchPlayers = async () => {
    try {
      setLoadingPlayers(true);

      const response = await playerService.getAllPlayers({
        current: 1,
        pageSize: 20,
        total: 0,
      });

      const { content } = response.data;

      userStore.setPlayers(content);

      setLoadingPlayers(false);
    } catch (error) {
      console.error('Login Failed', error);
    }
  };

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;

      const response = await authService.auth({
        token: tokenId
      });

      const { token, user } = response.data;

      apiUpdateAccessToken(token);

      userStore.setToken(token);
      userStore.setUserData(user);
    } catch (error) {
      console.error('Login Failed', error);
    }
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  const handleChange = (event) => {
    userStore.setSelectedPlayer(event.target.value);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleRegisterCharacter = async (name) => {
    await playerService.store({ name });

    fetchPlayers();
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
              <Stack direction="row" style={{ alignItems: "center" }}>
                {
                  !userStore.user?.players?.length ?
                    <Button
                      variant="contained"
                      onClick={handleOpenDialog}
                    >
                      + Criar personagem
                    </Button>
                    :
                    <Stack direction="row">
                      <Button
                        variant="contained"
                        onClick={handleOpenDialog}
                      >
                        +
                      </Button>
                      <FormControl sx={{ m: 1, minWidth: 220 }} size="small" disabled={isLoadingPlayer}>
                        <InputLabel id="demo-select-small-label">Selecionar personagem</InputLabel>
                        <Select
                          id="player-selected"
                          value={userStore.selectedPlayer}
                          onChange={handleChange}
                        >
                          {
                            userStore.user?.players.map((player) => {
                              return (
                                <MenuItem value={player.id}>{player.name}</MenuItem>
                              )
                            })
                          }
                        </Select>
                      </FormControl>
                    </Stack>
                }
                <Avatar alt={userStore.user.email} src={userStore.user.profileImage} sx={{ marginRight: 2 }} />
                <Logout />
                <Button variant="outlined">
                </Button>
              </Stack>
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
        <CharacterDialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          onRegister={handleRegisterCharacter}
        />
      </Toolbar>
    </AppBar>
  );
});

export default Header;
