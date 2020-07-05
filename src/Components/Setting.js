import React from 'react'
import TopNavText from './UI/TopNavText'
import { Grid, Card } from '@material-ui/core'
import styled from 'styled-components';
import EntrySetting from './EntrySetting';
import TemplateSetting from './TemplateSetting';

function Setting() {
    return (
        <React.Fragment>
            <div style={{ marginBottom: '20px' }}>
                <TopNavText navText={['Dashboard','>','Setting']} summaryText="Customize your software according to your need."/>   
             </div>    
             <Grid container spacing={2}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <StyledCard >
                            <EntrySetting />
                        </StyledCard>   
                    </Grid>  
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <StyledCard >
                            <TemplateSetting />
                        </StyledCard>   
                    </Grid> 
             </Grid>   
        </React.Fragment>
    )
}

export default Setting;

const StyledCard = styled(Card)`
    &&& {
        box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
        overflow: hidden;
    }
`
