import '../App';
//import CardCV from '../CardCV';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, Typography } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


export default function ForecastDetail(note) {


    return (
        <div>
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <Grid item xs={9}>
                    <Card>
                        <Typography
                            date
                        />

                        <CardHeader
                            title='Forecasts Analysis'
                        />
                        <Grid item xs={5}>

                            <Divider />
                            <CardHeader
                                titleTypographyProps={{ variant: 'body1' }}
                                title="12/5/2021"

                            />

                        </Grid>
<CardContent>
                            <Typography variant="body 4" >
                                Minimum CV: {note.Min}
                            </Typography>
                            <br /> <br />
                            <Typography variant="body 4" >
                                Maximum CV: {note.Max}
                            </Typography>
                            <br /> <br />
                            <Typography variant="body 4" >
                                Day of Week Average: {note.dayAverage}
                            </Typography>
                            <br /> <br />
                            <Typography variant="body 4" >
                                Standard Deviation: {note.StandardD}
                            </Typography>


                        </CardContent>


                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}