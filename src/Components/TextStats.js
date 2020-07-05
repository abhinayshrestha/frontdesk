import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Typography, Chip } from '@material-ui/core';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CachedIcon from '@material-ui/icons/Cached';

function TextStats() {
    return (
        <Grid container style={{ marginBottom : '25px' }}>
            <StyledGrid item xs={12} sm={6} md= {4} lg={3}>
                    <StyledCard>
                        <StyledCardActionArea>
                              <div className='statValue'>
                                    <Typography variant='subtitle2' color='textSecondary' style={{  fontSize: '1rem', fontWeight: 400 }}>
                                        Total Visits
                                     </Typography>   
                                     <Typography variant='subtitle1' style={{ color:'#000', fontFamily: 'Merriweather', fontSize: '1.8rem', fontWeight: 300 }}>
                                        23
                                     </Typography> 
                                     <Chip color='primary' size="small" label='Today'/>
                               </div>  
                               <div className='statIcon'>
                                    <SupervisorAccountRoundedIcon style={{ color: 'rgb(33, 150, 243)' }}/>
                               </div>  
                               
                        </StyledCardActionArea>
                     </StyledCard>   
             </StyledGrid>   
             <StyledGrid item xs={12} sm={6} md= {4} lg={3}>
                    <StyledCard>
                      <StyledCardActionArea>
                              <div className='statValue'>
                                    <Typography variant='subtitle2' color='textSecondary' style={{  fontSize: '1rem', fontWeight: 400 }}>
                                        Total Registered
                                     </Typography>   
                                     <Typography variant='subtitle1' style={{ color:'#000', fontFamily: 'Merriweather', fontSize: '1.8rem', fontWeight: 300 }}>
                                        13
                                     </Typography> 
                                     <Chip color='primary' size="small" label='Today'/>
                               </div>  
                               <div className='statIcon'>
                                    <BusinessCenterIcon fontSize="large" color='secondary'/>
                               </div>  
                        </StyledCardActionArea>
                    </StyledCard> 
            </StyledGrid> 
            <StyledGrid item xs={12} sm={6} md= {4} lg={3}>
                <StyledCard>
                        <StyledCardActionArea>
                                    <div className='statValue'>
                                            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '1rem', fontWeight: 400 }}>
                                                Total Pending
                                            </Typography>   
                                            <Typography variant='subtitle1' style={{ color:'#000', fontFamily: 'Merriweather', fontSize: '1.8rem', fontWeight: 300 }}>
                                               5
                                            </Typography> 
                                            <Chip color='primary' size="small" label='Today'/>
                                    </div>  
                                    <div className='statIcon'>
                                            <CachedIcon fontSize="large" style={{ color : '#f5af19' }}/>
                                    </div>  
                        </StyledCardActionArea>
                </StyledCard> 
            </StyledGrid>   
            <StyledGrid item xs={12} sm={6} md= {4} lg={3}> 
                <StyledCard style={{ width: '100%' }}>
                        <StyledCardActionArea last='true'>
                                    <div className='statValue'>
                                            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '1rem', fontWeight: 400 }}>
                                                Total Deposits
                                            </Typography>   
                                            <Typography variant='subtitle1' style={{ color:'#000', fontFamily: 'Merriweather', fontSize: '1.8rem', fontWeight: 300 }}>
                                               50,000
                                            </Typography> 
                                            <Chip color='primary' size="small" label='Today'/>
                                    </div>  
                                    <div className='statIcon'>
                                                <AttachMoneyIcon fontSize="large" style={{ color: '#4caf50' }}/>
                                    </div>  
                        </StyledCardActionArea>
                </StyledCard> 
            </StyledGrid> 
        </Grid>
    )
}

export default TextStats;

const StyledGrid = styled(Grid)`
    &&& {
        display : flex;
        justify-content : flex-start;
    }
`
const StyledCard = styled(Card)`
    &&& {
       width: 95%;
       box-sizing : border-box;
       box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
    }
`
const StyledCardActionArea = styled(CardActionArea)`
    &&& {
        padding: 24px;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content : center;
        .statValue {
            flex: 1;
            font-family: 'Merriweather';
        }
        .statIcon {
            .MuiSvgIcon-root {
                height: 60px;
                 width: 60px;
            }
        }
        .MuiChip-root {
            height: 20px;
            line-height: 20px;
            padding: 0px 7px;
            background: rgb(33, 150, 243);
        }
    }
`