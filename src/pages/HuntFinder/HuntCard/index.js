import React from 'react';
import { Card, CardContent, Typography, CardMedia, } from '@mui/material';

function HuntCard({
  id,
  title,
  image,
  minLevel,
  maxLevel,
  minProfitPerHour,
  maxProfitPerHour,
  minXpPerHour,
  maxXpPerHour
}) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="hunt image"
      />
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Level: {`${minLevel} até ${maxLevel}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          XP/H Bruto: {`${minXpPerHour}K até ${maxXpPerHour}K`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lucro/H: {`${minProfitPerHour}K até ${maxProfitPerHour}K`}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HuntCard;
