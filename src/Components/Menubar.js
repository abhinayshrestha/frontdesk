import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styled from 'styled-components';
import Brightness7 from '@material-ui/icons/Brightness7';
import logo from '../Assets/logo.png';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import FeedbackIcon from '@material-ui/icons/Feedback';

function Menubar() {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
            <StyledAppBar position="static">
                  <Toolbar style={{ padding : '0px 10px 0px 15px' }}>
                        <div style= {{ flex : '1' }}>
                             <img src={logo} alt='' style={{ maxWidth : '50px' }}/>
                        </div>
                        <IconButton aria-label="menu">
                            <Brightness7 />
                        </IconButton>
                        <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit">
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Typography variant='body1' style={{ display: 'flex', alignItems : 'center' }}>
                                        <FeedbackIcon fontSize= 'small'/>  &nbsp;Feedback
                                    </Typography>
                                </MenuItem>
                        </Menu>
                  </Toolbar>  
            </StyledAppBar>
    )
}

export default Menubar;

const StyledAppBar = styled(AppBar)`
    &&& {
        color : #000;
        background : #fff;
        .MuiToolbar-regular {
            min-height : 56px;
        }
    }
`
