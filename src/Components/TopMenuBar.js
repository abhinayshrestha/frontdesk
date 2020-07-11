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
import logo from '../Assets/logo.png';
import { connect } from 'react-redux';
import { logout } from '../Store/Actions/authAction';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { NavLink } from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { TOGGLE_THEME } from '../Store/Actions/actionTypes';

function TopMenuBar({ handleDrawer, logout, isDark, toggleTheme }) {
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
                            <IconButton edge="start" aria-label="menu" onClick={handleDrawer}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h5" style={{ flex: '1', marginLeft: '20px',  lineHeight : '23px' }}>
                                 <img src={logo} alt='' style={{ maxWidth : '60px' }}/>
                            </Typography>
                                <Tooltip title="Setting">
                                     <NavLink to='/setting' style={{ textDecoration: 'none', color: '#fff' }}>
                                        <StyledIconButton  aria-label="menu">
                                            <SettingsOutlinedIcon />
                                        </StyledIconButton>
                                     </NavLink>   
                                </Tooltip> 
                               {isDark ? 
                                    <Tooltip title="Switch to light theme">
                                                <StyledIconButton aria-label="menu" onClick={() => toggleTheme(false)}>
                                                    <Brightness7 />
                                                </StyledIconButton>
                                    </Tooltip> 
                               :
                                    <Tooltip title="Switch to dark theme">
                                                <StyledIconButton  aria-label="menu" onClick={() => toggleTheme(true)}>
                                                    <Brightness4Icon/>
                                                </StyledIconButton>
                                    </Tooltip>
                               }
                                <Tooltip title="Logout">
                                    <StyledIconButton aria-label="menu" onClick={() =>  logout()}>
                                        <ExitToAppIcon />
                                    </StyledIconButton>
                                </Tooltip>
                                <StyledIconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
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

const mapStateToProps = state => {
    return {
        isDark: state.authReducer.isDark
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(logout()),
        toggleTheme : val => dispatch({ type: TOGGLE_THEME, val: val })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopMenuBar);

const StyledAppBar = styled(AppBar)`
     &&& {
         border-bottom : 1px solid rgba(0, 0, 0, 0.12);  
         ${({ theme }) => `background : ${theme.palette.background.paper};`}
     }
`

const StyledIconButton = styled(IconButton)`
     &&& {
        padding : 10px;
     }
`
