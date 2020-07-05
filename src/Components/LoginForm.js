import React, { useState } from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import { onAuth } from '../Store/Actions/authAction';
import logo from '../Assets/logo.png';

function LoginForm({ loading, auth }) {

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState({ value : '', error : false, errorMsg : 'Email is invalid.' });
    const [password, setPassword] = useState({ value : '', error : false, errorMsg : 'Password is incorrect.' });

    const handleClickShowPassword = () => {
             setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
            event.preventDefault();
      };

      const usernameChangeHandler = e => {
          setUsername({
              ...username,
              value : e.target.value,
              error : false
          })
      }

      const passwordChangeHandler = e => {
        setPassword({
            ...password,
            value : e.target.value,
            error : false
        })
    }

    const formSubmitHandler = () => {
         let usernameError = false;
         let passwordError = false;
          if(username.value.length > 5){
               usernameError = false;
          }
          else {
               usernameError = true;
          }
          if(password.value.length > 5){
                    passwordError = false;
            }
            else {
                passwordError = true;
            }
            console.log(usernameError, passwordError);
            if(!usernameError && !passwordError) {
                 auth(username.value, password.value);
            }
            else {
                 setUsername({
                     ...username,
                     error : usernameError
                 });
                 setPassword({
                     ...password,
                     error : passwordError
                 })	
            }
      }

    return (
        <LoginContainer>
            { loading ? <SigninProgressBar /> : null }
            <FormContainer>
                    <Typography variant='body1' align='center'>
                            Welcome To
                     </Typography>   
                    <Typography variant='h6' align='center' color='primary'>
                            <img src={logo} alt='' style={{ maxWidth : '50px' }}/>
                     </Typography>   
                     <Typography variant='body2' align='center' gutterBottom>
                            "Frontdesk Management System"
                     </Typography>  
                     <Typography variant='body1' align='center'>
                            <span style={{ fontWeight: '500' }}>Sign in to continue.</span>
                     </Typography>
                     <div style={{ padding : '20px 0px' }}>
                           <InputContainer style={{marginBottom : '25px'}}>
                                <StyledTextField
                                        id="outlined-error-helper-text"
                                        label="Email or Phone"
                                        variant="outlined"
                                        fullWidth
                                        type="email"
                                        autoFocus
                                        value= {username.value}
                                        error= {username.error}
                                        helperText= {username.error ? username.errorMsg : ''}
                                        onChange = {usernameChangeHandler}
                                    />
                            </InputContainer>    
                            <InputContainer>
                                <StyledTextField
                                        id="outlined-error-helper-text standard-adornment-password"
                                        label="Password"
                                        variant="outlined"
                                        fullWidth
                                        type={showPassword ? 'text' : 'password'}
                                        value= {password.value}
                                        error= {password.error}
                                        helperText= {password.error ? password.errorMsg : ''}
                                        onChange = {passwordChangeHandler}
                                    />
                                    <ShowHideBtn
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                     </ShowHideBtn>
                            </InputContainer> 
                            <Typography gutterBottom variant='subtitle2' color='primary'>
                                    Forgot Password?
                            </Typography>  
                            <Typography gutterBottom align='right'>
                                        <Button onClick={formSubmitHandler} 
                                                variant="contained" 
                                                color="primary" 
                                                disableElevation 
                                                disabled = { loading ? true : false }
                                                style={{ textTransform : 'capitalize' }}>
                                                Sign in
                                        </Button>
                            </Typography> 
                      </div>      
                   
            </FormContainer>    
        </LoginContainer>
    )
}

const mapStateToProps = state => {
    return {
        loading : state.authReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth : (username, password) => dispatch(onAuth(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const LoginContainer = styled.div`
      height : calc(100% - 56px);
      width : 100%;
      
`

const SigninProgressBar = styled(LinearProgress)`
        position : absolute;
        top : 0px;
        left : 0px;
        && {
            height : 3px;
        }
`
const FormContainer = styled.div`
    padding : 10px 30px;
    padding-top : 50px;
`
const InputContainer = styled.div`
    margin : 10px 0px;
    position : relative;
    .MuiFormHelperText-root {
        font-weight : 500;
    }
`
const StyledTextField = styled(TextField)`
    ${({ theme }) => `
        label {
            font-weight : 500;
        }
        .Mui-focused {
            font-weight : 400;
        }
        .MuiOutlinedInput-root {
            fieldset {
                border-color: rgba(0, 0, 0, 0.23);
            }
            &:hover fieldset {
                border-color: rgba(0, 0, 0, 0.23);
            }
            &.Mui-focused fieldset {
                border-color: ${theme.palette.primary.main};
            }
        }
        `}
`

const ShowHideBtn = styled(IconButton)`
    &&& {
        position: absolute;
        right : 10px;
        top : 5px;
    }
`