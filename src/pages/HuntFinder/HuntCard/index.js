import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

function HuntCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/150"
        alt="hunt image"
      />
      <CardContent>
        <Typography variant="h5">Mistrock</Typography>
        <Typography variant="body2" color="text.secondary">
          Knights • Cyclops + Stealth ring
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Level: 8 até 50
        </Typography>
        <Typography variant="body2" color="text.secondary">
          XP/H Bruto: 50k até 80k
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lucro/H: -9k até -4k
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HuntCard;
