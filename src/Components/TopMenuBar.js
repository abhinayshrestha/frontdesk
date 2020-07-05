import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Brightness7 from '@material-ui/icons/Brightness7';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Tooltip from '@material-ui/core/Tooltip';
import logo from '../Assets/whiteLogo.png';
import { connect } from 'react-redux';
import { logout } from '../Store/Actions/authAction';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { NavLink } from 'react-router-dom';

function TopMenuBar({ handleDrawer, logout }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };


    return (
            <StyledAppBar position='static' elevation={0}>
                    <Toolbar>
                            <IconButton color='inherit' edge="start" aria-label="menu" onClick={handleDrawer}>
                                <MenuIcon />
                            </IconButton>
                            <Typography color="textPrimary" variant="h5" style={{ flex: '1', marginLeft: '20px',  lineHeight : '23px' }}>
                                 <img src={logo} alt='' style={{ maxWidth : '60px' }}/>
                            </Typography>
                                <Tooltip title="Setting">
                                     <NavLink to='/setting' style={{ textDecoration: 'none', color: '#fff' }}>
                                        <StyledIconButton color='inherit' aria-label="menu">
                                            <SettingsOutlinedIcon />
                                        </StyledIconButton>
                                     </NavLink>   
                                </Tooltip> 
                                <Tooltip title="Switch Theme">
                                        <StyledIconButton color='inherit' aria-label="menu">
                                            <Brightness7 />
                                        </StyledIconButton>
                               </Tooltip> 
                                <Tooltip title="Logout">
                                    <StyledIconButton color='inherit' aria-label="menu" onClick={() =>  logout()}>
                                        <ExitToAppIcon />
                                    </StyledIconButton>
                                </Tooltip>
                                <StyledIconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color='inherit'
                                    onClick={handleMenu}
                                >
                                    <MoreVertIcon />
                                </StyledIconButton>
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

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(TopMenuBar);

const StyledAppBar = styled(AppBar)`
     &&& {
         border-bottom : 1px solid rgba(0, 0, 0, 0.12);  
         background : #3949ab;
     }
`

const StyledIconButton = styled(IconButton)`
     &&& {
        padding : 10px;
     }
`
