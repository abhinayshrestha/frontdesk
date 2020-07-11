import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Paper, FormControl, InputLabel, Select, MenuItem, Avatar, Typography, Tooltip, IconButton, Checkbox, CircularProgress,
        Button, Snackbar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { NavLink } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import DoneIcon from '@material-ui/icons/Done';
import RestoreIcon from '@material-ui/icons/Restore';
import { connect } from 'react-redux';
import  { loadTrash, deleteFromTrash, loadTrashPages } from '../Store/Actions/trashAction'; 
import { SET_TRASH_ACTION } from '../Store/Actions/actionTypes';
import AlertBox from './UI/AlertBox';

function TrashTable({ type, loadTrash, loader, trashData, deletingTrash, deleteFromTrash, trashActionSuccess, setTrashAction,
                     loadTrashPages, totalPage }) 
    {
    const [order, setOrder] = useState({ value: 'desc', options:[{value:'asc', label : "Old"},{value:'desc', label : "Latest"}]});
    const [page, setPage] = useState(1);
    const [openAlert, setOpenAlert] = useState({ value : false, id : '' });
    const [checkBoxes, setCheckBoxes] = useState({});
    const [checkAll, setCheckAll] = useState(false);
    const [showDeleteAndRestoreAll, setShowDeleteAndRestoreAll] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handlePageChange = (event, value) => {
        setPage(value);
      };

    const handleOrder = e => {
        setOrder({ ...order, value: e.target.value })
    }

    const openAlertBox = id => {
        setOpenAlert({ ...openAlert, value : true, id : id, isDelete : true });
    }

    const handleCloseAlert = () => {
        setOpenAlert({ ...openAlert, value : false, id : '', isDelete : false });
    }

    const multipleDeleteHandler = () => {
        setOpenAlert({ ...openAlert, value: true, id : false, isDelete : true })
    }

    const openRestoreAlertBox = id => {
        setOpenAlert({ ...openAlert, value : true, id : id, isDelete : false });
    }

    const multipleRestoreHandler = () => {
        setOpenAlert({ ...openAlert, value: true, id : false, isDelete : false })
    }

    const checkAllHandler = e => {
        const newCheckedUser = {...checkBoxes}
        for(let id in newCheckedUser){
              newCheckedUser[id] = e.target.checked 
        }
        setCheckAll(e.target.checked);
        setCheckBoxes({ ...newCheckedUser });
    }

    const handleDeleteRecord = () => {
        if(openAlert.isDelete) {
                if(openAlert.id){
                    deleteFromTrash([openAlert.id]);
                }
                else {
                    let ids = []
                    for(let id in checkBoxes){
                        if(checkBoxes[id]){
                            ids.push(Number(id));
                        }
                    }
                    deleteFromTrash(ids);
                }
        }else {

        }
    }

    const checkBoxHandler = (id, event) => {
        setCheckBoxes({
            ...checkBoxes,
            [id] : event.target.checked
        })   
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackBar(false);
     };

    useEffect(() => {
        loadTrashPages();
        loadTrash(page, order.value);
    }, [loadTrash, page, order.value, loadTrashPages])

    useEffect(() => {
       setPage(_ => {
           return 1
       })
    }, [order.value])

    useEffect(() => {
        let createCheckBoxes = {};
        trashData.map(trash => Object.assign(createCheckBoxes,{ [trash.id] : false }));
        setCheckBoxes({...createCheckBoxes})
    }, [trashData])

    useEffect(() => {
        let i = 0;
        for(let key in checkBoxes){
            if(checkBoxes[key] === true){
                ++i;
            }
        }
        if(i>0){
           setShowDeleteAndRestoreAll(true);
        }
        else{
          setShowDeleteAndRestoreAll(false);
          setCheckAll(false);
        }
    }, [checkBoxes])

    useEffect(() => {
        if(trashActionSuccess.value) {
            setOpenSnackBar(trashActionSuccess.value);
            setOpenAlert(prev => {
                return { ...prev, value : false, id : '', isDelete : false }
            });
            setTrashAction();
        }
    }, [trashActionSuccess, setOpenAlert, setTrashAction])

    return (
        <StyledPaper square>
              <StyledSnackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                        }}
                        open={openSnackBar}
                        autoHideDuration={3000}
                          message={<React.Fragment><DoneIcon fontSize='small'/> &nbsp;{trashActionSuccess.label}</React.Fragment>}
                        onClose={handleCloseSnackBar}
            />
            <AlertBox 
                    openAlert={openAlert.value} 
                    loading = {deletingTrash}
                    handleCloseAlert={handleCloseAlert} 
                    isDelete = {openAlert.isDelete}    
                    onAction={handleDeleteRecord}
                    text={`Are you sure you want to ${openAlert.isDelete ? 'delete' : 'restore'} ${openAlert.id === false ? Object.keys(checkBoxes).filter(key => checkBoxes[key] === true).length : 'this' } record ${openAlert.isDelete ? 'permanently' : ''}?`}/>
             <ActionArea>
                    <div className='search'>
                            <SearchIcon/>
                            <input type='text' placeholder='Search....'/>
                      </div>
                      <StyledFormControl  variant='outlined' margin='dense'>
                                    <InputLabel id="demo-simple-select-outlined-label">Order</InputLabel>
                                    <Select labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={order.value}
                                            onChange={handleOrder}
                                            label="Order"
                                            >
                                            {
                                                order.options.map((opt, i) => <MenuItem value={opt.value} key={i}>{opt.label}</MenuItem>)
                                            }    
                                    </Select>
                        </StyledFormControl>  
              </ActionArea>
              <MultipleAction>
                        <Checkbox
                            checked = {checkAll}
                            onChange = {checkAllHandler}
                            color = "primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                       <Typography component='span' variant='subtitle2' color='textPrimary'
                                    style={{ fontSize: '15px',padding:'3px 0px', fontWeight: 400,  lineHeight: '18px' }}>
                         Check All              
                        </Typography>    
                       {showDeleteAndRestoreAll && 
                            <>
                                <Button style={{ marginLeft : '10px', textTransform : 'capitalize' }}
                                    variant='contained' 
                                    color='secondary' 
                                    size='small' 
                                    onClick={multipleDeleteHandler}
                                    disableElevation>Delete All
                                 </Button>
                                  <Button style={{ marginLeft : '10px', textTransform : 'capitalize' }}
                                  variant='contained' 
                                  color= 'primary' 
                                  size='small' 
                                  onClick={multipleRestoreHandler}
                                  disableElevation>Restore All
                               </Button>
                             </>  
                        }                       
                 </MultipleAction> 
              { !loader ? 
                  trashData[0] ?
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
                                <TableCell align="center">Restore</TableCell>
                            </TableRow>
                            </TableHead>
                                      <TableBody>
                                             { trashData && trashData.map(trash =>
                                               <TableRow key={trash.id}>
                                                        <TableCell>
                                                            {<Checkbox
                                                                checked={checkBoxes[trash.id] || false}
                                                                onChange={checkBoxHandler.bind(null, trash.id)}
                                                                color = "primary"
                                                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                            />}
                                                           </TableCell>   
                                                           <TableCell component="th" scope="row">
                                                               <StyledName>
                                                                   <Avatar style={{ marginRight: '15px' }}>
                                                                       {trash.name.charAt(0).toUpperCase()}
                                                                   </Avatar>   
                                                                   <Typography variant='subtitle2'>
                                                                           {trash.name}<br/>
                                                                           <Typography variant='body2' color='textSecondary'>
                                                                            {trash.email}
                                                                           </Typography>
                                                                   </Typography>   
                                                               </StyledName>    
                                                           </TableCell>
                                                            <TableCell align="center">{trash.address}</TableCell>
                                                            <TableCell align="center">{trash.status}</TableCell>
                                                            <TableCell align="center">{trash.phone}</TableCell>
                                                           <TableCell align="center">
                                                               <div style={{ display : 'flex', justifyContent: 'center' }}>
                                                                   <Tooltip title="View or Message">
                                                                       <NavLink to={`manage-clients/abhinay`}>
                                                                               <StyledIconButton aria-label="View">
                                                                                   <VisibilityIcon />
                                                                               </StyledIconButton>
                                                                       </NavLink>  
                                                                   </Tooltip>
                                                                   <Tooltip title="Delete">
                                                                           <StyledIconButton aria-label="Delete" color='secondary' onClick={openAlertBox.bind(null,trash.id)}>
                                                                               <DeleteIcon />
                                                                           </StyledIconButton>
                                                                   </Tooltip>
                                                               </div>   
                                                           </TableCell>
                                                           <TableCell align="center">
                                                               <Tooltip title="Restore">
                                                                   <StyledIconButton aria-label="Delete" color='primary' onClick={openRestoreAlertBox.bind(null,trash.id)}>
                                                                           <RestoreIcon />
                                                                   </StyledIconButton>
                                                               </Tooltip>
                                                           </TableCell>
                                                   </TableRow>  
                                                )     
                                             }
                                        </TableBody>
                                    </Table>
                            </StyledTableContainer> 
                              : <Empty>
                                        <Typography gutterBottom variant='subtitle2' style={{ color:'#bbb', fontSize: '14px',padding:'3px 0px', fontWeight: 400,  lineHeight: '18px' }}>
                                              No records found in trash. 
                                        </Typography>  
                                </Empty>
                            : 
                            <div style={{ height : '100px', display: 'flex', justifyContent : 'center', alignItems : 'center', width :'100%' }}>
                                    <CircularProgress />
                            </div> 
                            }  
                            <PaginationContainer>
                                    <Pagination count={totalPage} page={page} color="primary" onChange={handlePageChange}/>
                            </PaginationContainer>  
                </StyledPaper>
    )
}

const mapStateToProps = state => {
    return {
        loader : state.trashReducer.loadingTrash,
        trashData : state.trashReducer.trashData,
        deletingTrash : state.trashReducer.deletingTrash,
        trashActionSuccess : state.trashReducer.trashActionSuccess,
        totalPage : state.trashReducer.totalPage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadTrash : (page, order) => dispatch(loadTrash(page, order)),
        deleteFromTrash : id => dispatch(deleteFromTrash(id)) ,
        setTrashAction : () => dispatch({ type : SET_TRASH_ACTION }),
        loadTrashPages : () => dispatch(loadTrashPages())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TrashTable);


const StyledPaper = styled(Paper)`
    &&& {
        padding : 15px;
        box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
    }
`
const ActionArea = styled.div`
    height: 50px;
    display: flex;
    align-items: center;
    justify-content : center;
    padding: 0px 10px;
    .search {
        display: flex;
        flex-basis : 300px;
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
        padding: 10px;
   }
`
const StyledIconButton = styled(IconButton)`
     &&& {
        padding : 8px;
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
const PaginationContainer = styled.div`
   height: 50px;
   width: 100%;
   background: #fff;
   display: flex;
   justify-content: center;
   align-items : center;
`

const Empty = styled.div`
    padding : 20px;
    display : flex;
    justify-content : center;
    align-items : center; 
`
const MultipleAction = styled.div`
   padding: 0px 20px;
   display : flex;
   align-items : center;
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