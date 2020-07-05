import React, { useState } from 'react'
import TopMenuBar from '../Components/TopMenuBar'
import styled from 'styled-components';
import SideDrawer from '../Components/SideDrawer';
import Reports from '../Components/Reports';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddClientForm from '../Components/AddClientForm';
import { Switch, Route } from 'react-router-dom';
import Setting from '../Components/Setting';
import ManageClient from '../Components/ManageClient';
import ViewClient from '../Components/ViewClient';

function Dashboard() {
 
    const [showDrawer, setShowDrawer] = useState(true); 
    const [openAddBtn, setOpenAddBtn] = useState(false);

    const handleDrawer = () => {
        setShowDrawer(!showDrawer);
    }

    const handleCloseAddBtn = () => {
        setOpenAddBtn(false);
    }

    return (
        <div>
           <TopMenuBar handleDrawer = {handleDrawer}/>
           <Container>
                <SideDrawer showDrawer={showDrawer} />
                <RouteContainer>
                        <Switch>
                            <Route path='/setting' component={Setting} />
                            <Route path='/manage-clients/:clientId' component={ViewClient}/>
                            <Route path='/manage-clients' component={ManageClient}/>
                            <Route path='/' component={Reports} exact/>  
                        </Switch>    
                 </RouteContainer>   
                 <AddButton>
                     <Tooltip title="Add new Client">
                            <Fab color="primary" aria-label="add" onClick={() => setOpenAddBtn(!openAddBtn)}>
                                    <AddIcon />
                            </Fab>
                     </Tooltip> 
                  </AddButton>   
           </Container>    
           <AddClientForm openAddBtn={openAddBtn} handleCloseAddBtn={handleCloseAddBtn}/>
        </div>
    )
}

export default Dashboard;

const Container = styled.div`
    display: flex;
    height : calc(100vh - 65px);
    box-sizing : border-box;
    overflow: hidden;
    position : relative;
`
const RouteContainer = styled.div`
    flex: 1;
    height: 100%;
    overflow-y: scroll;
    background: #f4f6f8;
    padding: 24px 35px;
    box-sizing: border-box;
`
const AddButton = styled.div`
   position: absolute;
   bottom : 5%;
   right: 3%;
`

