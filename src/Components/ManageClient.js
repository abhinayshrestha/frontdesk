import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import TopNavText from './UI/TopNavText';
import { FormControl, InputLabel, Select, MenuItem, Button, Avatar, Typography, CircularProgress } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import AlertBox from './UI/AlertBox';
import { NavLink, useLocation } from 'react-router-dom';
import { loadClient } from '../Store/Actions/manageClientActions';

function ManageClient({ statusOpt, loadClient, clients, loading }) {

    const [status, setStatus] = useState({ value: 'All' });
    const [orderBy, setOrderBy] = useState({ value: 'Date', options: ["Date", "Name", "Last 10 days"] });
    const [orderType, setOrderType] = useState({ value: 'Ascending', options:["Ascending", "Descending"] });
    const [openAlert, setOpenAlert] = useState(false);
    const [page, setPage] = useState(1);
    const { pathname } = useLocation();

    const handleChangeStatus = e => {
        setStatus({ value: e.target.value })
    }

    const handleOrderBy = e => {
        setOrderBy({...orderBy, value: e.target.value })
    }

    const handleOrderType = e => {
        setOrderType({ ...orderType, value: e.target.value })
    }
 
    const openAlertBox = () => {
        setOpenAlert(true);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
      };

     useEffect(() => {
          loadClient(page);
      }, [loadClient, page])

    return (
        <>
             <AlertBox openAlert={openAlert} handleCloseAlert={handleCloseAlert}/>
              <div style={{ marginBottom: '20px' }}>
                <TopNavText navText={['Management','>','Manage Client']} summaryText="View all clients"/>   
             </div>
            <Container>
                <ActionArea>
                        <div className='search'>
                              <SearchIcon/>
                              <input type='text' placeholder='Search....'/>
                         </div>   
                         <StyledFormControl  variant='outlined' margin='dense' >
                                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                    <Select labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={status.value}
                                            onChange={handleChangeStatus}
                                            label="Status"
                                            >
                                            <MenuItem value="All">All</MenuItem>
                                            {
                                                statusOpt.map((opt, i) => <MenuItem value={opt} key={i}>{opt}</MenuItem>)
                                            }    
                                    </Select>
                          </StyledFormControl>
                          <StyledFormControl  variant='outlined' margin='dense'>
                                    <InputLabel id="demo-simple-select-outlined-label">Order by</InputLabel>
                                    <Select labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={orderBy.value}
                                            onChange={handleOrderBy}
                                            label="Order by"
                                            >
                                            {
                                                orderBy.options.map((opt, i) => <MenuItem value={opt} key={i}>{opt}</MenuItem>)
                                            }    
                                    </Select>
                          </StyledFormControl>
                          <StyledFormControl  variant='outlined' margin='dense'>
                                    <InputLabel id="demo-simple-select-outlined-label">Order Type</InputLabel>
                                    <Select labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={orderType.value}
                                            onChange={handleOrderType}
                                            label="Order Type"
                                            >
                                            {
                                                orderType.options.map((opt, i) => <MenuItem value={opt} key={i}>{opt}</MenuItem>)
                                            }    
                                    </Select>
                          </StyledFormControl>
                          <Button variant='contained' color='primary' disableElevation style={{ textTransform: 'capitalize', marginRight: '10px' }}>
                                  Search              
                          </Button>    
                 </ActionArea> 
                 {!loading ? 
                 <StyledTableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        clients[0] &&
                                        clients.map(client =>
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
                                                        <TableCell align="center">{client.address}</TableCell>
                                                        <TableCell align="center">{client.status}</TableCell>
                                                        <TableCell align="center">{client.phone}</TableCell>
                                                        <TableCell align="center" style={{ display : 'flex' }}>
                                                            <Tooltip title="View or Message">
                                                                <NavLink to={`${pathname}/abhinay`}>
                                                                        <StyledIconButton aria-label="View">
                                                                            <VisibilityIcon />
                                                                        </StyledIconButton>
                                                                </NavLink>  
                                                            </Tooltip>
                                                            <Tooltip title="Edit">
                                                                    <StyledIconButton aria-label="Edit" color='primary'>
                                                                        <EditIcon />
                                                                    </StyledIconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Delete">
                                                                    <StyledIconButton aria-label="Delete" color='secondary' onClick={openAlertBox}>
                                                                        <DeleteIcon/>
                                                                    </StyledIconButton>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell align="center">{new Date(client.createdAt).toDateString()}</TableCell>
                                                </TableRow>
                                            )
                                    }
                                </TableBody>
                            </Table>
                    </StyledTableContainer> 
                    :
                    <div style={{ height : '100px', display: 'flex', justifyContent : 'center', alignItems : 'center', width :'100%' }}>
                           <CircularProgress />
                     </div>   
                   }
                 <PaginationContainer>
                        <Pagination count={10} page={page} color="primary" onChange={handlePageChange}/>
                  </PaginationContainer>   
            </Container>   
        </>
    )
}

const mapStateToProps = state => {
    return {
        statusOpt : state.settingReducer.entryForm.status.options,
        clients : state.manageClientReducer.clients,
        loading : state.manageClientReducer.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadClient : page => dispatch(loadClient(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageClient);

const Container = styled.div`
   box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
   background : #fff;
   padding: 10px 0px;
`

const ActionArea = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 20px;
    .search {
        display: flex;
        flex: 3;
        align-items: center;
        box-sizing: border-box;
        margin-right: 10px;
        margin-top : 4px;
        border: 1px solid #ccc;
        border-radius : 4px;
        padding-left : 20px;
        ${({ theme }) => `
          color: ${theme.palette.text.secondary};
        `};
        input {
            width: 100%;
            padding: 10px;
            font-size: 17px;
            border: none;
            outline: none;
        }
    }
`

const StyledFormControl = styled(FormControl)`
    &&& {
        padding-right: 20px;
        flex : 1;
        label  {
            font-size: 14px;
            font-weight: 500;
        }
        .MuiInputLabel-outlined.MuiInputLabel-marginDense {
            transform: translate(14px, 13px) scale(1);
        }
        .MuiInputLabel-outlined.MuiInputLabel-shrink {
            transform : translate(14px, -6px) scale(1);
            font-size: 12px;
        }
        ${({ theme }) => `
              .MuiOutlinedInput-root {
                    &:hover fieldset {
                        border-color: rgba(0, 0, 0, 0.23);
                    }
                    &.Mui-focused fieldset {
                        border-color: ${theme.palette.primary.main};
                    }
                }
        `}

    }
`

const StyledTableContainer = styled(TableContainer)`
   &&& {
        background: #fff;
        box-sizing: border-box;
        padding: 10px 20px;
   }
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
const PaginationContainer = styled.div`
   height: 50px;
   width: 100%;
   background: #fff;
   display: flex;
   justify-content: center;
   align-items : center;
`