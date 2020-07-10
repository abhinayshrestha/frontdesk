import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import TopNavText from './UI/TopNavText';
import { FormControl, InputLabel, Select, MenuItem, Button, Avatar, Typography, CircularProgress, Checkbox } from '@material-ui/core';
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
import { loadClient, deleteClient, getTotalPages } from '../Store/Actions/manageClientActions';
import EditClientForm from './EditClientForm';

function ManageClient({ statusOpt, loadClient, clients, loading, deleteClient, success, deleteLoader, getTotalPages, totalPages }) {

    const [searchBox, setSearchBox] = useState('');
    const [status, setStatus] = useState({ value: 'all' });
    const [orderBy, setOrderBy] = useState({ value: 0, options: [{ value : 0, label : 'Today' },{ value : 7, label : 'Last 7 days' }, { value : 30, label : 'Last 30 days' }] });
    const [orderType, setOrderType] = useState({ value: 'asc', options:[{value:'asc', label : "Ascending"},{value:'desc', label : "Descending"}]});
    const [openAlert, setOpenAlert] = useState({ value : false, id : '' });
    const [page, setPage] = useState(1);
    const [openEdit, setOpenEdit] = useState({ is: false, data: {} });
    const [checkedUser, setCheckedUser] = useState({});
    const { pathname } = useLocation();
    const [checkAll, setCheckAll] = useState(false);
    const [showDeleteAllBtn, setShowDeleteAllBtn] = useState(false);

    const textSearchHandler = e => {
        setSearchBox(e.target.value);
    }

    const openEditHandler = (user) => {
         setOpenEdit({ ...openEdit, is : true , data: { ...user } })
    }
    
    const closeEditHandler = () => {
        setOpenEdit({ is: false, data : {} });
    }

    const handleChangeStatus = e => {
        setStatus({ value: e.target.value })
    }

    const handleOrderBy = e => {
        setOrderBy({...orderBy, value: e.target.value })
    }

    const handleOrderType = e => {
        setOrderType({ ...orderType, value: e.target.value })
    }
 
    const openAlertBox = id => {
        setOpenAlert({ ...openAlert, value : true, id : id });
    }

    const multipleDeleteHandler = () => {
        setOpenAlert({ ...openAlert, value: true, id : false })
    }

    const handleCloseAlert = () => {
        setOpenAlert({ ...openAlert, value : false, id : '' });
    }

    const handlePageChange = (event, value) => {
        setPage(value);
      };

      const searchHandler = () => {
          setCheckedUser([]);
          setPage(1);
          getTotalPages(status.value);
          loadClient(1, orderType.value, status.value, searchBox, orderBy.value);
      }

      const checkboxHandler = (id, event) => {
            setCheckedUser({
                ...checkedUser,
                [id] : event.target.checked
            })   
      }

      const handleDeleteRecord = () => {
            if(openAlert.id){
                deleteClient([openAlert.id]);
            }
            else {
                let ids = []
                for(let id in checkedUser){
                    if(checkedUser[id]){
                        ids.push(Number(id));
                    }
                }
                deleteClient(ids);
            }
      }

      const multipleSelectHandler = e => {
            const newCheckedUser = {...checkedUser}
            for(let id in checkedUser){
                 Object.assign(newCheckedUser, { [id] : e.target.checked })   
            }
            setCheckAll(e.target.checked);
            setCheckedUser({ ...newCheckedUser });
      }

      const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      }
     
     const statusVal = usePrevious(status.value)
     const orderTyp = usePrevious(orderType.value)
     const prevOrderBy = usePrevious(orderBy.value)
    
     useEffect(() => {
         if( statusVal === status.value && orderTyp === orderType.value && prevOrderBy === orderBy.value ) {
            loadClient(page, orderType.value, status.value, searchBox, orderBy.value);
         }
         else if( statusVal === undefined ) {
            loadClient(1 , orderType.value, status.value, '',  orderBy.value);
         }
      }, [loadClient, page, orderType.value, status.value, statusVal, orderTyp, searchBox, orderBy.value, prevOrderBy])

      useEffect(() => {
         const checkedBox = {};
         clients.map(client => Object.assign(checkedBox, { [client.id] : false }));
         setCheckedUser({...checkedBox});
      }, [clients, setCheckedUser])

      useEffect(() => {
          let i = 0;
          for(let key in checkedUser){
              if(checkedUser[key] === true){
                  ++i;
              }
          }
          if(i>0){
            setShowDeleteAllBtn(true);
          }
          else{
            setShowDeleteAllBtn(false);
            setCheckAll(false);
          }
      }, [checkedUser])

      useEffect(() => {
          if(success.value){
             setOpenAlert(prev => { return { ...prev, value : false, id : '' } });
          }
      }, [success, setOpenAlert])

      useEffect(() => {
        if( statusVal === undefined ) {
            getTotalPages(status.value)
         }
      }, [getTotalPages, status.value, statusVal])

    return (
        <>
             <AlertBox 
                    openAlert={openAlert.value} 
                    handleCloseAlert={handleCloseAlert} 
                    onAction={handleDeleteRecord}
                    loading = {deleteLoader}
                    text={`Are you sure you want to delete ${openAlert.id === false ? Object.keys(checkedUser).filter(key => checkedUser[key] === true).length : 'this' } record permanently?`}/>
             {openEdit.is && 
                    <EditClientForm 
                            openEdit={openEdit.is} 
                            currentUser={openEdit.data} 
                            closeEditHandler={closeEditHandler}/>
              }
              <div style={{ marginBottom: '20px' }}>
                <TopNavText navText={['Management','>','Manage Client']} summaryText="View all clients"/>   
             </div>
            <Container>
                <ActionArea>
                        <div className='search'>
                              <SearchIcon/>
                              <input type='text' placeholder='Search....' onChange={textSearchHandler} value={searchBox}/>
                         </div>   
                         <StyledFormControl  variant='outlined' margin='dense' >
                                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                    <Select labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={status.value}
                                            onChange={handleChangeStatus}
                                            label="Status"
                                            >
                                            <MenuItem value="all">All</MenuItem>
                                            {
                                                statusOpt.map((opt, i) => <MenuItem value={opt} key={i}>{opt}</MenuItem>)
                                            }    
                                    </Select>
                          </StyledFormControl>
                          <StyledFormControl  variant='outlined' margin='dense'>
                                    <InputLabel id="demo-simple-select-outlined-label">Date</InputLabel>
                                    <Select labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={orderBy.value}
                                            onChange={handleOrderBy}
                                            label="Date"
                                            >
                                            {
                                                orderBy.options.map((opt, i) => <MenuItem value={opt.value} key={i}>{opt.label}</MenuItem>)
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
                                                orderType.options.map((opt, i) => <MenuItem value={opt.value} key={i}>{opt.label}</MenuItem>)
                                            }    
                                    </Select>
                          </StyledFormControl>
                          <Button variant='contained' color='primary' disableElevation 
                                  style={{ textTransform: 'capitalize', marginRight: '10px' }}
                                  onClick={searchHandler}>
                                  Search              
                          </Button>    
                 </ActionArea> 
                 <MultipleAction>
                        <Checkbox
                            checked = {checkAll}
                            onChange = {multipleSelectHandler}
                            color = "primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                       <Typography component='span' variant='subtitle2' color='textPrimary'
                                    style={{ fontSize: '15px',padding:'3px 0px', fontWeight: 400,  lineHeight: '18px' }}>
                         Check All              
                        </Typography>    
                      {showDeleteAllBtn && <Button style={{ marginLeft : '10px', textTransform : 'capitalize' }}
                                variant='contained' 
                                color='secondary' 
                                size='small' 
                                onClick={multipleDeleteHandler}
                                disableElevation>Delete All
                        </Button>}                        
                 </MultipleAction>    
                 {!loading ? 
                    clients[0] ?
                        <StyledTableContainer>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Check</TableCell>
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
                                                
                                                clients.map(client =>
                                                        <TableRow key ={client.id}>
                                                                <TableCell>
                                                                    {<Checkbox
                                                                        checked = {checkedUser[client.id] || false}
                                                                        onChange = {checkboxHandler.bind(null, client.id)}
                                                                        color = "primary"
                                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                    />}
                                                                </TableCell>   
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
                                                                <TableCell align="center">
                                                                    <div style={{ display : 'flex', justifyContent: 'center' }}>
                                                                        <Tooltip title="View or Message">
                                                                            <NavLink to={`${pathname}/abhinay`}>
                                                                                    <StyledIconButton aria-label="View">
                                                                                        <VisibilityIcon />
                                                                                    </StyledIconButton>
                                                                            </NavLink>  
                                                                        </Tooltip>
                                                                        <Tooltip title="Edit">
                                                                                <StyledIconButton aria-label="Edit" color='primary' onClick={openEditHandler.bind(null, client)}>
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
                                                                <TableCell align="center">{new Date(client.createdAt).toDateString()}</TableCell>
                                                        </TableRow>
                                                    )
                                        
                                            }
                                        </TableBody>
                                    </Table>
                            </StyledTableContainer> 
                    : <Empty>
                            <Typography gutterBottom variant='subtitle2' style={{ color:'#bbb', fontSize: '15px',padding:'3px 0px', fontWeight: 400,  lineHeight: '18px' }}>
                                 No records found. You can click "+" icon to create one.
                            </Typography>  
                    </Empty>
                    :
                    <div style={{ height : '100px', display: 'flex', justifyContent : 'center', alignItems : 'center', width :'100%' }}>
                           <CircularProgress />
                     </div>   
                   }
                 <PaginationContainer>
                        <Pagination count={totalPages} page={page} color="primary" onChange={handlePageChange}/>
                  </PaginationContainer>   
            </Container>   
        </>
    )
}

const mapStateToProps = state => {
    return {
        deleteLoader: state.manageClientReducer.deleteClientLoader,
        statusOpt : state.settingReducer.entryForm.status.options,
        clients : state.manageClientReducer.clients,
        loading : state.manageClientReducer.loadClientLoader,
        success: state.manageClientReducer.success, 
        totalPages: state.manageClientReducer.totalPages, 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadClient : (page, orderType, status, searchBox, days) => dispatch(loadClient(page, orderType, status, searchBox, days)),
        deleteClient : id => dispatch(deleteClient(id)),
        getTotalPages : status => dispatch(getTotalPages(status))
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

const MultipleAction = styled.div`
   padding: 10px 20px 0px;
   display : flex;
   align-items : center;
`
const Empty = styled.div`
    padding : 20px;
    display : flex;
    justify-content : center;
    align-items : center; 
`