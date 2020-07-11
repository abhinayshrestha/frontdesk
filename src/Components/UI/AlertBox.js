import React from 'react'
import { Typography, Paper, Button, CircularProgress } from '@material-ui/core';
import Backdrop from './Backdrop';
import styled from 'styled-components';

function AlertBox({ openAlert, handleCloseAlert, onAction, text, loading, isDelete }) {
    console.log(isDelete);
    return (
        <Backdrop open={openAlert}>
             <AlertContainer elevation={0}>
                    <Typography variant='body2'>
                         {text}
                    </Typography> 
                    <div className='actionArea'>
                        {loading ? <CircularProgress size={25}/> : null}
                          <StyledActionBtn size='small' variant='contained' colorProps = {isDelete} disabled={loading}
                                            onClick={() => onAction()} disableElevation>
                                {isDelete ? 'Delete' : 'Restore'}
                            </StyledActionBtn>  
                         <StyledButton size='small' color='default' variant='contained' disableElevation onClick={handleCloseAlert} disabled={loading}>
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
const StyledActionBtn = styled(Button)`
    &&& {
        margin-left: 15px;
        text-transform : capitalize;
        ${({ theme, colorProps }) => `
            background : ${ colorProps && colorProps ? theme.palette.secondary.main : theme.palette.success.main  };
            color : #fff;    
        `
        }
    }
`
