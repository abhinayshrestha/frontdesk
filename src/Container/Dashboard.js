import React, { useState, useEffect } from 'react'
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
import DoneIcon from '@material-ui/icons/Done';
import { Snackbar } from '@material-ui/core'
import { connect } from 'react-redux';
import { SET_SUCCESS } from '../Store/Actions/actionTypes';

function Dashboard({ success, setSuccess }) {
 
    const [showDrawer, setShowDrawer] = useState(true); 
    const [openAddBtn, setOpenAddBtn] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleDrawer = () => {
        setShowDrawer(!showDrawer);
    }

    const handleCloseAddBtn = () => {
        setOpenAddBtn(false);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackBar(false);
     };

     useEffect(() => {
         if(success){
            setOpenSnackBar(success);
            setSuccess();
         }
     }, [success, setSuccess])

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
           <StyledSnackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        open={openSnackBar}
                        autoHideDuration={2000}
                        message={<React.Fragment><DoneIcon fontSize='small'/> &nbsp;Record Created Successfully.</React.Fragment>}
                        onClose={handleCloseSnackBar}
          />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        success: state.manageClientReducer.success,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSuccess : () => dispatch({ type: SET_SUCCESS })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

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
const StyledSnackbar = styled(Snackbar)`
    &&& {
        .MuiSnackbarContent-root {
            ${({ theme }) => `
                background: ${theme.palette.success.main};
             `}
        };
        .MuiSnackbarContent-message {
            display : flex;
            align-items : center;
            justify-content :center;
        }
    }
`

