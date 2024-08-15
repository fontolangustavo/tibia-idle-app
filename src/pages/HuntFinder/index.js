import React from 'react';
import { Container, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import HuntCard from './HuntCard';

function HuntFinder() {
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
          <Button variant="contained" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} marginTop={2}>
        {/* Example Hunt Cards */}
        <Grid item xs={12} md={4}>
          <HuntCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <HuntCard />
        </Grid>
        <Grid item xs={12} md={4}>
          <HuntCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HuntFinder;
