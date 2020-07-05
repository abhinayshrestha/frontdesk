import React, { useState } from 'react'
import styled from 'styled-components';
import { Typography, Divider, IconButton, Box } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function ReminderSummary() {

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
                     Reminder
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
                                <TableCell>Task</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                         Abhinay shrestha
                                    </TableCell>
                                    <TableCell align="center">For Admission</TableCell>
                                    <TableCell align="center">
                                        <Typography variant='subtitle2' >
                                                <Box color='error.main'>important</Box> 
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        Romeo Gurung
                                    </TableCell>
                                    <TableCell align="center">For Job</TableCell>
                                    <TableCell align="center">
                                        <Typography variant='subtitle2'>
                                              <Box color='success.main'>normal</Box> 
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                </TableContainer>
             </div>   
        </Container>
    )
}

export default ReminderSummary;

const Container = styled.div`
     max-height: 400px;
     box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
     background: #fff;
     border-radius : 4px;
     box-sizing : border-box;
     position: relative;
     display : flex;
     flex-direction : column;
     width: 100%;
     overflow: auto;
    transition: color 0.3s;
    color: #fff;
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