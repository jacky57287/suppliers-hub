import React from 'react';
import AppComponentHeader from '@crema/core/AppComponentHeader';
import AppGridContainer from '@crema/core/AppGridContainer';
import Grid from '@mui/material/Grid';
import AppComponentCard from '@crema/core/AppComponentCard';
import SimpleMap from './Simple';

const GoogleMap = () => {
  return (
    <>
      <AppComponentHeader
        title='Google Map'
        description='A wrapper around google.maps.Map'
        refUrl='https://developers.google.com/maps/documentation/javascript/3.exp/reference#Map/'
      />

      <AppGridContainer>
        <Grid item xs={12}>
          <AppComponentCard title='Simple Map' component={SimpleMap} />
        </Grid>
      </AppGridContainer>
    </>
  );
};

export default GoogleMap;
