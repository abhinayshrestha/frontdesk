import React from 'react'
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import profileAvatar from '../Assets/profile-avatar.png';
import Navigation from './Navigation';

function SideDrawer({ showDrawer }) {

    const drawerVariants = {
        end : { 
             width : 260,
             x: 0,
             transition : {
                 type : 'tween',
                 duration : 0.2
             }
         },
         exit : {
             width: 0,
             x: -260,
             transition : {
                type : 'tween',
                duration : 0.2
            }
         }
    }

    return (
        <AnimatePresence >
                { showDrawer &&
                    <DrawerContainer variants={drawerVariants} initial='start' animate='end' exit='exit'>
                          <CompanyInfo>
                                <AvatarContainer>
                                     <img src={profileAvatar} alt=''/>  
                                </AvatarContainer>
                                <Name>
                                    <Typography variant='subtitle2' color='textPrimary' align='center' style={{ fontSize: '16px' }}>
                                         Abhinay Shrestha
                                    </Typography>
                                    <Typography variant='subtitle2' color='textPrimary' style={{ fontWeight: 400, fontSize: '15px', lineHeight : '15px' }}> 
                                        Front Desk
                                    </Typography>    
                                </Name>   
                          </CompanyInfo>      
                          <Divider />
                          <NavigationContainer>
                                    <Navigation />
                          </NavigationContainer>  
                          <Divider /> 
                          <Helper>
                                <Typography variant='subtitle2' style={{ color: '#263238' }} gutterBottom>
                                         Need Help?
                                </Typography>
                                <Typography variant='body2' color='primary'>
                                         Check our Docs
                                </Typography>
                           </Helper>    
                    </DrawerContainer>
                }
        </AnimatePresence>  
    )
}

export default SideDrawer;

const DrawerContainer = styled(motion.div)`
    width : 260px;
    box-sizing: border-box;
    border-right: 1px solid rgba(0, 0, 0, 0.12);  
    height: 100%;
    overflow : scroll;
    overflow: overlay;
    color: #00000000;
    transition: color 0.3s;
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
`

const CompanyInfo = styled.div`
    width : 100%;
    height : 160px;
    display : flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
` 
const AvatarContainer = styled.div`
     width: 70px;
     height: 70px;
     border-radius: 70px;
   img {
      width: 70px;
      height:70px;
      object-fit: cover;
      border-radius: 70px;
   }
`
const Name = styled.div`
   width : 100%;
   display : flex;
   flex-direction : column;
   justify-content : flex-start;
   align-items : center;
`
const NavigationContainer = styled.div`
   padding : 5px 16px;
`
const Helper = styled.div`
   height : 70px;
   margin: 15px 20px 20px 20px;
   background : rgb(244, 246, 255);;
   box-sizing : border-box;
   padding:15px;
   border-radius : 5px;
`