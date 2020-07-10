import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Typography, Divider, IconButton, Avatar, Tooltip, CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import  { connect } from 'react-redux';
import  { loadRecentSummary, deleteRecentSummary, editRecentSummarySuccess } from '../Store/Actions/dashboardActions';
import  { Link } from 'react-router-dom';
import AlertBox from './UI/AlertBox';
import EditClientForm from './EditClientForm';

function VisitsSummary({ loadRecentSummary, visitors, loader, deleteRecentSummary, editRecentSummarySuccess, deleteLoader }) {

    const [openEdit, setOpenEdit] = useState({ is: false, data: {} });
    const [openAlert, setOpenAlert] = useState({ value : false, id : '' });

    const openEditHandler = (user) => {
        setOpenEdit({ ...openEdit, is : true , data: { ...user } })
    }

    const closeEditHandler = () => {
        setOpenEdit({ is: false, data : {} });
    }

    const openAlertBox = id => {
        setOpenAlert({ ...openAlert, value : true, id : id });
    }

    const handleCloseAlert = () => {
        setOpenAlert({ ...openAlert, value : false, id : '' });
    }

    const handleDeleteRecord = () => {
        deleteRecentSummary([openAlert.id]);
        setOpenAlert({ ...openAlert, value : false, id : '' });
     }

     const editSuccessHandle = (id, name, email, status) => {
        editRecentSummarySuccess(id, name, email, status);
     }

    useEffect(() => {
        loadRecentSummary();
    }, [loadRecentSummary])


    return (
        <Container>
             <AlertBox 
                    openAlert={openAlert.value} 
                    handleCloseAlert={handleCloseAlert} 
                    onAction={handleDeleteRecord}
                    loading = {deleteLoader}
                    text={`Are you sure you want to delete this record permanently?`}/>
             {openEdit.is && 
                    <EditClientForm 
                            editSuccessHandle = {editSuccessHandle}
                            openEdit={openEdit.is} 
                            currentUser={openEdit.data} 
                            closeEditHandler={closeEditHandler}/>
              }
             <Title>
                <Typography variant='subtitle2' color='textPrimary' style={{ fontSize: '16px' }}>
                     Recently Visited
                </Typography> 
             </Title>    
             <Divider />
       { !loader ?     
           visitors[0] ?
            <div className='chartContainer'>
                <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Action</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Date</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    visitors[0] && visitors.map(client =>
                                        <TableRow key ={client.id}>
                                                <TableCell component="th" scope="row">
                                                    <StyledName>
                                                        <Avatar style={{ marginRight: '15px' }}>
                                                            {client.name.charAt(0).toUpperCase()}
                                                        </Avatar>   
                                                        <Typography variant='subtitle2'>
                                                                {client.name}<br/>
                                                                <Typography variant='body2' color='textSecondary'>
                                                                    {client.email}
                                                                </Typography>
                                                        </Typography>   
                                                    </StyledName>  
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div style = {{ display : 'flex' }}>
                                                        <Tooltip title="View or Message">
                                                                <StyledIconButton aria-label="View">
                                                                    <VisibilityIcon />
                                                                </StyledIconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Edit">
                                                                <StyledIconButton aria-label="Edit" color='primary'  onClick={openEditHandler.bind(null, client)}>
                                                                    <EditIcon />
                                                                </StyledIconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                                <StyledIconButton aria-label="Delete" color='secondary' onClick={openAlertBox.bind(null,client.id)}>
                                                                    <DeleteIcon/>
                                                                </StyledIconButton>
                                                        </Tooltip>
                                                        </div>
                                                </TableCell>
                                                <TableCell align="center">{client.status}</TableCell>
                                                <TableCell align="center">{new Date(client.createdAt).toDateString()}</TableCell>
                                            </TableRow>
                                        )
                                }
                            </TableBody>
                        </Table>
                </TableContainer>
                
                <div style={{ height: '50px', display: 'flex', justifyContent : 'center', alignItems : 'center' }}>
                      <Link to='/manage-clients' style={{ textDecoration : 'none' }}> 
                        <Typography variant = 'subtitle2' color='primary' 
                                    style={{ fontWeight: '400', fontSize: '15px' }}>
                                See All...
                        </Typography>
                      </Link>                
                 </div> 
             </div> 
             :
             <Empty>
                    <Typography gutterBottom variant='subtitle2' style={{ color:'#bbb', fontSize: '15px',padding:'3px 0px', fontWeight: 400,  lineHeight: '18px' }}>
                        No records found. You can click "+" icon to create one.
                    </Typography>  
            </Empty>
             : 
             <div style={{ height: '100px', display : 'flex', justifyContent : 'center',  alignItems :'center' }}>
                <CircularProgress /> 
            </div>} 
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        visitors : state.dashboardReducer.recentVisitors,
        loader : state.dashboardReducer.loadingRecentVisitors,
        deleteLoader : state.dashboardReducer.deletingRecentVisitors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadRecentSummary : () => dispatch(loadRecentSummary()),
        deleteRecentSummary : id => dispatch(deleteRecentSummary(id)),
        editRecentSummarySuccess : (id, name, email, status) => dispatch(editRecentSummarySuccess(id, name, email, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitsSummary);

const Container = styled.div`
     box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
     background: #fff;
     border-radius : 4px;
     box-sizing : border-box;
     position: relative;
     display : flex;
     flex-direction : column;
     width: 100%;
    
    .chartContainer {
        overflow: auto;
    transition: color 0.3s;
    color: #fff;
        max-height: 400px;
        ::-webkit-scrollbar {
	        width: 9px;
            position: absolute;
            }
            ::-webkit-scrollbar-thumb {
                background-clip: content-box;
                border: 1px solid transparent;
                border-radius: 7px;
                box-shadow: inset 0 0 0 10px;
            }
            ::-webkit-scrollbar-button {
                width: 0;
                height: 0;
                display: none;
                }
            ::-webkit-scrollbar-corner {
                background-color: transparent;
                }
                &:hover {
                    color: #ccc;
                }
            .chartContainer {
                flex: 1;
                padding: 10px 15px;
            }
    }

`
const Title = styled.div`
    padding: 15px 15px;
    box-sizing : border-box;
    position: relative;
`
const StyledName = styled.div`
   display: flex;
   align-items : center;
   &&& {
     .MuiAvatar-colorDefault {
        ${({ theme }) => `
            background: ${theme.palette.success.main};
        `}
    }
   }
`
const StyledIconButton = styled(IconButton)`
     &&& {
        padding : 8px;
     }
`
const Empty = styled.div`
    padding : 20px;
    display : flex;
    justify-content : center;
    align-items : center; 
`