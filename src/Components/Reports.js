import React, { useState } from 'react'
import styled from 'styled-components'
import TopNavText from './UI/TopNavText'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextStats from './TextStats';
import Grid from '@material-ui/core/Grid';
import VisitsChart from './VisitsChart';
import DepositsChart from './DepositsChart';
import VisitsSummary from './VisitsSummary';
import ReminderSummary from './ReminderSummary';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Reports() {
    const [anchorEl, setAnchorEl] = useState(null);

    const openTimelyOpt = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const closeTimelyOpt = () => {
        setAnchorEl(null);
    };
    return (
        <Container>
             <div className='topContainer'>
                        <TopNavText navText={[{label :'Reports', to : '/'},{label : 'Dashboard', to : '/'}]} summaryText="Here's what's happening"/>  
                        <ChangeDateBtn onClick={openTimelyOpt} color="primary">
                                Today <ArrowDropDownIcon /> 
                        </ChangeDateBtn>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={closeTimelyOpt}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: -40,
                                    horizontal: 'center',
                                }}
                                >
                                <MenuItem onClick={closeTimelyOpt}>Today</MenuItem>
                                <MenuItem onClick={closeTimelyOpt}>1 week ago</MenuItem>
                                <MenuItem onClick={closeTimelyOpt}>30 days abgo</MenuItem>
                        </Menu>
              </div>    
              <TextStats />
              <Grid container spacing={1} style={{ marginBottom: '20px' }}>
                     <Grid item lg={6} md={12} sm={12} xs={12}>
                             <VisitsChart />   
                      </Grid>         
                      <Grid item lg={6} md= {12} sm={12} xs={12}>
                            <DepositsChart />
                        </Grid>                  
               </Grid>   
               <Grid container spacing={2}>
                     <Grid item lg={8} md={12} sm={12} xs={12}>
                             <VisitsSummary/>   
                      </Grid>         
                      <Grid item lg={4} md= {12} sm={12} xs={12}>
                            <ReminderSummary />
                        </Grid>                  
               </Grid>                      
        </Container>
    )
}

export default Reports;

const Container = styled.div`
     ${({ theme }) =>`
          color : ${theme.palette.text.primary};
     `};
     .topContainer{
         position: relative;
         padding-bottom: 20px;
     }
`
const ChangeDateBtn = styled(Button)`
    &&& {
       line-height: 15px;
       position: absolute; 
       top: 50%;
       right: 0px;
       transform: translateY(-50%);
       -webkit-transform: translateY(-50%);
       text-transform: capitalize;
    }
`
