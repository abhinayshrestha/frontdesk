import React from 'react'
import { Typography, Paper, Button, CircularProgress } from '@material-ui/core';
import Backdrop from './Backdrop';
import styled from 'styled-components';

function AlertBox({ openAlert, handleCloseAlert, onAction, text, loading }) {

    return (
        <Backdrop open={openAlert}>
             <AlertContainer elevation={0}>
                    <Typography variant='body2'>
                         {text}
                    </Typography> 
                    <div className='actionArea'>
                        {loading ? <CircularProgress size={25}/> : null}
                        <StyledButton size='small' variant='contained' color='secondary' disabled={loading}
                                        onClick={() => onAction()} disableElevation>
                            Delete
                         </StyledButton>   
                         <StyledButton size='small' variant='contained' disableElevation onClick={handleCloseAlert} disabled={loading}>
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
       align-items : center;
   }
`
const StyledButton = styled(Button)`
   &&& {
       margin-left: 15px;
       text-transform : capitalize;
   }
`