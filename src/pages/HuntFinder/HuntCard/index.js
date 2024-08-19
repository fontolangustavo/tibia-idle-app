import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions, Button, } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../../stores';

const HuntCard = observer(({
  id,
  title,
  image,
  minLevel,
  maxLevel,
  minProfitPerHour,
  maxProfitPerHour,
  minXpPerHour,
  maxXpPerHour,
  handleEnterDungeon
}) => {
  const { userStore } = useStores();

  const disabledButton = !userStore.user || !userStore.selectedPlayer;

  const onClick = () => {
    handleEnterDungeon(id)
  }

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
      <CardActions>
        <Button
          size="small"
          color="success"
          disabled={disabledButton}
          onClick={onClick}
        >
          Entrar
        </Button>
      </CardActions>
    </Card>
  );
});

export default HuntCard;
