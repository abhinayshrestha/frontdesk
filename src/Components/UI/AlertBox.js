import React from 'react'
import { Typography, Paper, Button } from '@material-ui/core';
import Backdrop from './Backdrop';
import styled from 'styled-components';

function AlertBox({ openAlert, handleCloseAlert }) {

    return (
        <Backdrop open={openAlert}>
             <AlertContainer elevation={0}>
                    <Typography variant='body2'>
                          Are you sure you want to delete this record permanently?
                    </Typography> 
                    <div className='actionArea'>
                        <StyledButton size='small' variant='contained' color='secondary' disableElevation>
                            Delete
                         </StyledButton>   
                         <StyledButton size='small' variant='contained' disableElevation onClick={handleCloseAlert}>
                            Cancel
                         </StyledButton> 
                    </div>       
              </AlertContainer>    
        </Backdrop>
    )
}

export default AlertBox;

const AlertContainer = styled(Paper)`
   padding: 25px;
   box-sizing: border-box;
   .actionArea {
       padding-top: 20px;
       display : flex;
       justify-content : flex-end;
   }
`
const StyledButton = styled(Button)`
   &&& {
       margin-left: 15px;
       text-transform : capitalize;
   }
`