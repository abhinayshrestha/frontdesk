import React from 'react'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import LoginForm from '../Components/LoginForm';
import Menubar from '../Components/Menubar';
import Hidden from '@material-ui/core/Hidden';
import bg1 from '../Assets/bg1.png';
import FeaturesLayout from '../Components/FeaturesLayout';
import { motion } from 'framer-motion';

const imageVariants = {
    start : {
        opacity : 0,
        scale : 0
    },
    end : {
        opacity : 1,
        scale : 1,
        transition : {
            type : 'spring',
             mass : 1.5,
            stiffness : 100
        }
    }
}

function Login() {
    return (
        <StyledGrid container>
              <Hidden smDown>
                        <Grid square={true} component={LoginLeftPaper} xs={12} sm={12} md={8} lg={8}  item>
                            <motion.img variants={imageVariants} 
                                        initial='start' 
                                        animate='end' 
                                        src={bg1} alt='' 
                                        style={{ maxWidth:'55%', height: 'auto', marginTop: '5vh' }}/>   
                            <FeaturesLayout />
                        </Grid>
              </Hidden>  
           <Grid square={true} component={LoginRightPaper} xs={12} sm={12} md={4} lg={4} item>
                 <Menubar />
                 <LoginForm />
           </Grid>   
        </StyledGrid>
    )
}

export default Login

const StyledGrid = styled(Grid)`
    height : 100%;
`
const LoginLeftPaper = styled(Paper)`
   &&& {
    background: #1e3c72;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #2a5298, #1e3c72);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #2a5298, #1e3c72); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

            height : 100%;
            position : relative;
            display: flex;
            justify-content : center;
            align-items : flex-start; 
   }
`
const LoginRightPaper = styled(Paper)`
    height : 100%;

`


