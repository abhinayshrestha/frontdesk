import React, { useState } from 'react'
import styled from 'styled-components';
import { Typography, Divider, IconButton, Avatar, Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';


function VisitsSummary() {

    const [anchorEl, setAnchorEl] = useState(null);

    const open = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };

    return (
        <Container>
             <Title>
                <Typography variant='subtitle2' color='textPrimary' style={{ fontSize: '16px' }}>
                     Recently Visited
                </Typography>    
                <StyledButton onClick={open}>
                        <MoreVertIcon />
                </StyledButton>
                <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={close}
                        >
                        <MenuItem onClick={close}>Today</MenuItem>
                        <MenuItem onClick={close}>1 week ago</MenuItem>
                        <MenuItem onClick={close}>30 days abgo</MenuItem>
                </Menu>
             </Title>    
             <Divider />
             <div className='chartContainer'>
                <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Action</TableCell>
                                <TableCell align="center">Remark</TableCell>
                                <TableCell align="center">Date</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        <StyledName>
                                            <Avatar style={{ marginRight: '15px' }}>
                                                A
                                            </Avatar>   
                                            <Typography variant='subtitle2'>
                                                    Abhinay Shrestha<br/>
                                                    <Typography variant='body2' color='textSecondary'>
                                                        abhinay.shrestha11@gmail.com
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
                                                    <StyledIconButton aria-label="Edit" color='primary'>
                                                        <EditIcon />
                                                    </StyledIconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                    <StyledIconButton aria-label="Delete" color='secondary'>
                                                        <DeleteIcon/>
                                                    </StyledIconButton>
                                            </Tooltip>
                                            </div>
                                    </TableCell>
                                    <TableCell align="center">For Admission</TableCell>
                                    <TableCell align="center">19 June, 2020</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        <StyledName>
                                            <Avatar style={{ marginRight: '15px' }}>
                                                A
                                            </Avatar>   
                                            <Typography variant='subtitle2'>
                                                    Abhinay Shrestha<br/>
                                                    <Typography variant='body2' color='textSecondary'>
                                                        abhinay.shrestha11@gmail.com
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
                                                    <StyledIconButton aria-label="Edit" color='primary'>
                                                        <EditIcon />
                                                    </StyledIconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                    <StyledIconButton aria-label="Delete" color='secondary'>
                                                        <DeleteIcon/>
                                                    </StyledIconButton>
                                            </Tooltip>
                                            </div>
                                    </TableCell>
                                    <TableCell align="center">For Admission</TableCell>
                                    <TableCell align="center">19 June, 2020</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        <StyledName>
                                            <Avatar style={{ marginRight: '15px' }}>
                                                A
                                            </Avatar>   
                                            <Typography variant='subtitle2'>
                                                    Abhinay Shrestha<br/>
                                                    <Typography variant='body2' color='textSecondary'>
                                                        abhinay.shrestha11@gmail.com
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
                                                    <StyledIconButton aria-label="Edit" color='primary'>
                                                        <EditIcon />
                                                    </StyledIconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                    <StyledIconButton aria-label="Delete" color='secondary'>
                                                        <DeleteIcon/>
                                                    </StyledIconButton>
                                            </Tooltip>
                                            </div>
                                    </TableCell>
                                    <TableCell align="center">For Admission</TableCell>
                                    <TableCell align="center">19 June, 2020</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        <StyledName>
                                            <Avatar style={{ marginRight: '15px' }}>
                                                A
                                            </Avatar>   
                                            <Typography variant='subtitle2'>
                                                    Abhinay Shrestha<br/>
                                                    <Typography variant='body2' color='textSecondary'>
                                                        abhinay.shrestha11@gmail.com
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
                                                    <StyledIconButton aria-label="Edit" color='primary'>
                                                        <EditIcon />
                                                    </StyledIconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                    <StyledIconButton aria-label="Delete" color='secondary'>
                                                        <DeleteIcon/>
                                                    </StyledIconButton>
                                            </Tooltip>
                                            </div>
                                    </TableCell>
                                    <TableCell align="center">For Admission</TableCell>
                                    <TableCell align="center">19 June, 2020</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        <StyledName>
                                            <Avatar style={{ marginRight: '15px' }}>
                                                A
                                            </Avatar>   
                                            <Typography variant='subtitle2'>
                                                    Abhinay Shrestha<br/>
                                                    <Typography variant='body2' color='textSecondary'>
                                                        abhinay.shrestha11@gmail.com
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
                                                    <StyledIconButton aria-label="Edit" color='primary'>
                                                        <EditIcon />
                                                    </StyledIconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                    <StyledIconButton aria-label="Delete" color='secondary'>
                                                        <DeleteIcon/>
                                                    </StyledIconButton>
                                            </Tooltip>
                                            </div>
                                    </TableCell>
                                    <TableCell align="center">For Admission</TableCell>
                                    <TableCell align="center">19 June, 2020</TableCell>
                                </TableRow><TableRow >
                                    <TableCell component="th" scope="row">
                                        <StyledName>
                                            <Avatar style={{ marginRight: '15px' }}>
                                                A
                                            </Avatar>   
                                            <Typography variant='subtitle2'>
                                                    Abhinay Shrestha<br/>
                                                    <Typography variant='body2' color='textSecondary'>
                                                        abhinay.shrestha11@gmail.com
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
                                                    <StyledIconButton aria-label="Edit" color='primary'>
                                                        <EditIcon />
                                                    </StyledIconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                    <StyledIconButton aria-label="Delete" color='secondary'>
                                                        <DeleteIcon/>
                                                    </StyledIconButton>
                                            </Tooltip>
                                            </div>
                                    </TableCell>
                                    <TableCell align="center">For Admission</TableCell>
                                    <TableCell align="center">19 June, 2020</TableCell>
                                </TableRow>
                                
                            </TableBody>
                        </Table>
                </TableContainer>
                
                <div style={{ height: '50px', display: 'flex', justifyContent : 'center', alignItems : 'center' }}>
                       <Typography variant = 'subtitle2' color='primary' style={{ fontWeight: '400', fontSize: '15px' }}>
                                See All...
                        </Typography>                
                 </div> 
             </div>   
        </Container>
    )
}

export default VisitsSummary;

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
const StyledButton = styled(IconButton)`
    &&& {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
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