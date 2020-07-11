import React, { useState } from 'react'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import styled from 'styled-components';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';


function Navigation() {

    const [expandSendMessage, setExpandSendMessage] = useState(false);
    const [expandSendMail, setExpandSendMail] = useState(false);

    return (
        <div>
              <StyledList component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" disableSticky disableGutters style={{ fontSize :'0.915rem' }}>
                            Reports
                        </ListSubheader>
                    }
                >
                <StyledNavLink to='/' activeClassName='activeNav' exact>
                        <ListItem button>
                                <ListItemIcon>
                                    <BarChartOutlinedIcon fontSize='small'/>
                                    </ListItemIcon>
                                <ListItemText primary="Dashboard" />
                        </ListItem>
                </StyledNavLink>
            </StyledList>
            <StyledList 
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader disableSticky component="div" id="nested-list-subheader" disableGutters style={{ fontSize :'0.915rem' }}>
                            Management
                        </ListSubheader>
                    }
                >
                <StyledNavLink to='/manage-clients' activeClassName='activeNav'>
                        <ListItem button color='inherit'>
                            <ListItemIcon color='inherit'>
                                <PeopleAltOutlinedIcon fontSize='small' color='inherit'/>
                            </ListItemIcon>
                            <ListItemText primary="Manage Clients" color='inherit'/>
                        </ListItem>
                 </StyledNavLink> 
                <StyledNavLink to='/message' onClick={e => e.preventDefault()} activeClassName='activeNav'> 
                        <ListItem button onClick={() => setExpandSendMessage(!expandSendMessage)}>
                            <ListItemIcon>
                                <MailOutlineOutlinedIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Send Message" />
                            {expandSendMessage ? <ExpandLess/> : <ExpandMore />}
                        </ListItem>
                </StyledNavLink>
                <Collapse in={expandSendMessage} timeout="auto" unmountOnExit>
                        <SubList component="div">
                            <StyledNavLink to='/message/single' activeClassName='activeNav'> 
                                <ListItem button>
                                    <ListItemText primary="Single" />
                                </ListItem>
                            </StyledNavLink>
                            <StyledNavLink to='/message/multiple' activeClassName='activeNav'> 
                                    <ListItem button>
                                        <ListItemText primary="Multiple" />
                                    </ListItem>
                            </StyledNavLink>
                        </SubList>
                </Collapse>
                <StyledNavLink to='/mail' onClick={e => e.preventDefault()} activeClassName='activeNav'> 
                        <ListItem button onClick={() => setExpandSendMail(!expandSendMail)}>
                            <ListItemIcon>
                                <AlternateEmailOutlinedIcon fontSize='small'/>
                            </ListItemIcon>
                            <ListItemText primary="Send Mail" />
                            { expandSendMail ? <ExpandLess/> : <ExpandMore />}
                        </ListItem>
                </StyledNavLink>
                <Collapse in={expandSendMail} timeout="auto" unmountOnExit>
                        <SubList component="div">
                            <StyledNavLink to='/mail/single' activeClassName='activeNav'> 
                                <ListItem button>
                                    <ListItemText primary="Single" />
                                </ListItem>
                            </StyledNavLink>
                            <StyledNavLink to='/mail/multiple' activeClassName='activeNav'> 
                                    <ListItem button>
                                        <ListItemText primary="Multiple" />
                                    </ListItem>
                            </StyledNavLink>
                        </SubList>
                </Collapse>
                <StyledNavLink to='/reminder' activeClassName='activeNav'> 
                    <ListItem button >
                        <ListItemIcon>
                            <AddAlertOutlinedIcon fontSize='small'/>
                        </ListItemIcon>
                        <ListItemText primary="Reminders" />
                    </ListItem>
                </StyledNavLink>
                <TrashNavLink to='/trash' activeClassName='activeNav'> 
                    <ListItem button >
                        <ListItemIcon>
                            <DeleteOutlineOutlinedIcon fontSize='small'/>
                        </ListItemIcon>
                        <ListItemText primary="Trash"/>
                    </ListItem>
                </TrashNavLink>
            </StyledList>           
        </div>
    )
}

export default Navigation;

const StyledList = styled(List)`
  ${({ theme }) => `
   &&& {
       color: #546e7a;
       padding-left : 0px;
       padding-right : 0px;
       .MuiListItem-root {
           padding-top : 5px;
           padding-bottom : 5px;
           &:hover {
               background : rgba(42, 82, 152, .2);
           }
       }
       .MuiListItemIcon-root {
           min-width : 0px;
           margin-right: 8px;
       }
       .MuiButtonBase-root {
           border-radius : 3px;
       }
       .MuiTypography-root{
           font-size: 0.915rem;
           font-weight : 500;
       }
   }
  `}
  
`
const SubList = styled(List)`
     &&& {
        .MuiListItem-root {
            padding-left : 45px;
       }
        .MuiTypography-root{
           font-size: 0.875rem;
           font-weight : 500;
       }
     }
`
const StyledNavLink = styled(NavLink)`
    ${({ theme }) => `
      &&& {
            color: #546e7a;
            text-decoration: none;
            &.activeNav {
                  color : ${theme.palette.primary.main};
                }
            }
            &.activeNav .MuiSvgIcon-root{
                color : ${theme.palette.primary.main};
            }
    `}
`
const TrashNavLink = styled(NavLink)`
        ${({ theme }) => `
        &&& {
                color: #546e7a;
                text-decoration: none;
                &.activeNav {
                    color : ${theme.palette.secondary.main};
                    }
                }
                &.activeNav .MuiSvgIcon-root{
                    color : ${theme.palette.secondary.main};
                }
                &.activeNav .MuiButtonBase-root {
                    background : rgba(244, 67, 54, 0.1);
                }
                &&& .MuiButtonBase-root {
                    &:hover {
                        background : rgba(244, 67, 54, 0.1);
                    } 
                }
        `}
`