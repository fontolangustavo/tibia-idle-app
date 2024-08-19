import React, { useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../stores';
import { dungeonService, huntService } from '../../services';
import HuntCard from './HuntCard';
import HuntCardSkeleton from './HuntCard/skeleton';

const HuntFinder = observer(() => {
  const { userStore } = useStores();

  const [isLoading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchGetAll(true);
  }, [])

  const fetchGetAll = (init = false) => {
    setLoading(true);

    let data = {
      page: init ? 1 : pagination.current,
      limit: pagination.pageSize,
    };

    dungeonService.getAll(data)
      .then((response) => {
        setLoading(false)
        setPagination({
          ...pagination,
          current: response.data.pageable.pageNumber,
          total: response.data.pageable.pageSize,
        })
        setData(response.data.content);
      })
      .catch((data) => {
        setLoading(false)
      });
  };

  const handleEnterDungeon = async dungeonId => {
    // setLoading(true);

    try {
      await huntService.enterDungeon({
        dungeonId,
        playerId: userStore.selectedPlayer
      });

      console.log('Entrou na dungeon com sucesso');
    } catch (error) {
      console.error('Erro ao entrar na dungeon:', error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Hunt Finder
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Personagem" variant="outlined" />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Level" variant="outlined" type="number" />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Tamanho do time</InputLabel>
            <Select label="Tamanho do time">
              <MenuItem value="solo">Solo</MenuItem>
              <MenuItem value="duo">Duo</MenuItem>
              <MenuItem value="team">Time (x4)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Vocation</InputLabel>
            <Select label="Vocation">
              <MenuItem value="all">Todas as vocações</MenuItem>
              <MenuItem value="knights">Knights</MenuItem>
              <MenuItem value="paladins">Paladins</MenuItem>
              <MenuItem value="mages">Mages</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            loading={isLoading}
            variant="contained"
            onClick={() => fetchGetAll(true)}
          >
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2}>
        {
          isLoading && (
            <Stack direction="row" spacing={2}>
              {[1, 2, 3].map(() => <HuntCardSkeleton />)}
            </Stack>
          )
        }
        {
          !isLoading && data.map((item) => {
            return (
              <Grid item xs={12} md={4}>
                <HuntCard
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  minLevel={item.minLevel}
                  maxLevel={item.maxLevel}
                  minProfitPerHour={item.minProfitPerHour}
                  maxProfitPerHour={item.maxProfitPerHour}
                  minXpPerHour={item.minXpPerHour}
                  maxXpPerHour={item.maxXpPerHour}
                  handleEnterDungeon={handleEnterDungeon}
                />
              </Grid>
            )
          })
        }
      </Grid>
    </Container>
  );
});

export default HuntFinder;
