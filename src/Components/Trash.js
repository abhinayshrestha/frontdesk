import React from 'react';
import styled from 'styled-components';
import TopNavText from './UI/TopNavText'
import { AppBar, Tab, Tabs, Box, Divider } from '@material-ui/core';
import TrashTable from './TrashTable';

function Trash() {

    const [tabValue, setTabValue] = React.useState(0);

    const handleTabChange =  (event, newValue) => {
        setTabValue(newValue);
      };

    return (
            <>
                <TopNavText navText={[{label :'Dashboard', to : '/'},{label : 'Trash', to : '/trash'}]} summaryText="Your deleted record"/> 
                <StyledAppBar position="relative" elevation={0}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example" textColor='primary' indicatorColor='primary'>
                            <Tab label="Clients" style={{ textTransform : 'capitalize', fontSize :'15px' }}/>
                            <Tab label="Students" style={{ textTransform : 'capitalize', fontSize :'15px' }}/>
                    </Tabs>
                    <Divider />
                 </StyledAppBar>
                    <Box value={tabValue} index={0}role="tabpanel"
                        hidden={tabValue !== 0}
                        id={`simple-tabpanel-${0}`}
                        aria-labelledby={`simple-tab-${0}`}> 
                        <TrashTable type='client'/>
                 </Box>
                 <Box value={tabValue} index={1} role="tabpanel"
                            hidden={tabValue !== 1}
                            id={`simple-tabpanel-${1}`}
                            aria-labelledby={`simple-tab-${1}`}>
                         Students 
                 </Box>
            </>
    )
}

export default Trash;

const StyledAppBar = styled(AppBar)`
    
    &&& {
        ${({ theme }) => 
            `background : ${theme.palette.background.paper};`}
            margin-top : 20px;
    }
`
