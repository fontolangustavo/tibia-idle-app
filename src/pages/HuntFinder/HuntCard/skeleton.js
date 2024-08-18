import React from 'react';
import { Card, CardContent, Skeleton, } from '@mui/material';

function HuntCardSkeleton() {
  const skeletons = [];

  for (let i = 0; i < 4; i++) {
    skeletons.push(
      <Skeleton key={i} style={{ marginTop: 10 }} variant="rectangular" width={210} height={20} />
    );
  }
  return (
    <Card>
      <Skeleton variant="rectangular" height={168} />
      <CardContent>
        {skeletons}
      </CardContent>
    </Card>
  );
}

export default HuntCardSkeleton;