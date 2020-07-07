import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Backdrop from './UI/Backdrop';
import DateFnsUtils from '@date-io/date-fns';
import { Paper, 
        Typography, 
        Divider, 
        Grid, 
        TextField, 
        Select, 
        MenuItem, 
        InputLabel, 
        FormControl, Button, FormHelperText } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { addClient } from '../Store/Actions/manageClientActions';
import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

const formVariants = {
    start : { opacity: 0, y: '-50vh' },
    end : {
        opacity: 1,
        y : 0,
        transition : {
            type: 'tween',
            duration : 0.2,
            ease: 'easeInOut'
        }
    }
}

function AddClientForm({ openAddBtn, handleCloseAddBtn, addClient, loading, success, inputType }) {

    const [status, setStatus] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [name, setName] = useState({});
    const [email, setEmail] = useState({});
    const [phone, setPhone] = useState({});
    const [age, setAge] = useState({});
    const [address, setAddress] = useState({});
    const [remark, setRemark] = useState({});
    const [gender, setGender] = useState({});
    const [academic, setAcademic] = useState({});
    const [height, setHeight] = useState({});
    const [weight, setWeight] = useState({});
    const [martial, setMartial] = useState({});

    const handleDateChange = (date) => {
      setSelectedDate({ ...selectedDate, value: date });
    };
    const handleChangeStatus = event => {
        setStatus({...status, value: event.target.value});
    }

    const handleCreateRecord = () => {
        let nameError = false;
        let emailError = false;
        let phoneError = false;
        let statusError = false;
        const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if(name.value && name.value.length >= 1) {
            nameError = false;
        }
        else{
            nameError = true;
        }
        if(email.value.length=== 0 || emailRegx.test(email.value)) {
            emailError = false;
        }
        else{
            emailError = true;
        }
        if(phone.value.length >= 5 || phone.value.length === 0) {
            phoneError = false;
        }
        else{
            phoneError = true;
        }
        if(status.value.length > 0) {
            statusError = false;
        }
        else{
            statusError = true;
        }
        if(nameError || emailError || statusError || phoneError ) {
            setName({ ...name,error: nameError });
            setEmail({ ...email, error: emailError });
            setPhone({ ...phone, error: phoneError });
            setStatus({ ...status, error: statusError });
        }
        else {
            const data = {
                name: name.value,
                age: age.value,
                email: email.value,
                phone: phone.value,
                address: address.value,
                status: status.value,
                selectedDate: selectedDate,
                remark: remark.value,
                martialStatus : martial.value,
                height: height.value,
                date : selectedDate.value,
                gender : gender.value,
                academic : academic.value
            }
            addClient(data);
        }
    }

    useEffect(() => {
        if(success) {
            setName({...inputType['name']}); 
            setStatus({...inputType['status']});
            setSelectedDate({ ...inputType['date'] });
            setEmail({ ...inputType['email']  });
            setPhone({  ...inputType['phone']  });
            setAge({ ...inputType['age']  });
            setAddress({...inputType['address']  });
            setRemark({ ...inputType['remark']  });
            setGender({ ...inputType['gender']  });
            setAcademic({ ...inputType['academic']  });
            setHeight({ ...inputType['height']  });
            setWeight({ ...inputType['weight']  });
            setMartial({ ...inputType['martial']  });
        }
    }, [success, name, inputType])

    useEffect(() => {
        setName({...inputType['name']}); 
        setStatus({...inputType['status']});
        setSelectedDate({ ...inputType['date'] });
        setEmail({ ...inputType['email']  });
        setPhone({  ...inputType['phone']  });
        setAge({ ...inputType['age']  });
        setAddress({...inputType['address']  });
        setRemark({ ...inputType['remark']  });
        setGender({ ...inputType['gender']  });
        setAcademic({ ...inputType['academic']  });
        setHeight({ ...inputType['height']  });
        setWeight({ ...inputType['weight']  });
        setMartial({ ...inputType['martial']  });
    }, [inputType])

    return (
        <Backdrop open={openAddBtn} handleClose={handleCloseAddBtn}>
                <Container  variants={formVariants}
                            initial='start'
                            animate= 'end'
                            elevation={3} 
                            onClick={e => e.stopPropagation()}>
                <Title>
                        <Typography variant='subtitle2' style={{ fontSize: '17px' }} color='primary' align='center'>
                            Add new client
                        </Typography>  
                </Title> 
                <Divider />
                { loading ? <SigninProgressBar /> : null }
                <Grid container style={{ boxSizing: 'border-box', padding: '20px 30px' }}>
                            {name.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                <InputContainer>
                                    <StyledTextField
                                            label="Full name"
                                            variant="outlined"
                                            fullWidth
                                            type="text"
                                            margin='dense'
                                            required
                                            size='small'
                                            autoFocus
                                            error={name.error}
                                            helperText={ name.error ? name.errMsg : '' }
                                            value={name.value}
                                            onChange={e => setName({...name, value: e.target.value})}
                                        />
                                </InputContainer>    
                            </GridItem> }   
                           {email.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                            <StyledTextField
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    type="email"
                                                    margin='dense'
                                                    error={email.error}
                                                    helperText={ email.error ? email.errMsg : '' }
                                                    value={email.value}
                                                    onChange={e => setEmail({...email, value: e.target.value})}
                                                />
                                    </InputContainer>    
                            </GridItem> } 
                            {phone.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                                    <StyledTextField
                                                            label="Phone No."
                                                            variant="outlined"
                                                            fullWidth
                                                            type="number"
                                                            margin='dense'
                                                            error={phone.error}
                                                            helperText={ phone.error ? phone.errMsg : '' }
                                                            value={phone.value}
                                                            onChange={e => setPhone({...phone, value: e.target.value})}
                                                        />
                                    </InputContainer> 
                            </GridItem> } 
                            {address.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                                    <StyledTextField
                                                            id="outlined-error-helper-text"
                                                            label="Address"
                                                            variant="outlined"
                                                            fullWidth
                                                            type="text"
                                                            margin='dense'
                                                            value={address.value}
                                                            onChange={e => setAddress({...address, value: e.target.value})}
                                                        />
                                    </InputContainer> 
                            </GridItem>}
                            {age.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                                <StyledFormControl variant='outlined' style={{ width: '100%' }} margin='dense'>
                                                        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                                        <Select 
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={age.value}
                                                                onChange={e => setAge({...age, value: e.target.value})}
                                                                label="Age"
                                                                >
                                                                {
                                                                   age.options.map(val => 
                                                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                                                    )
                                                                }    
                                                        </Select>
                                                </StyledFormControl>
                                    </InputContainer> 
                            </GridItem>}
                            {height.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                                <StyledFormControl variant='outlined' style={{ width: '100%' }} margin='dense'>
                                                        <InputLabel id="demo-simple-select-outlined-label">Height</InputLabel>
                                                        <Select 
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={height.value}
                                                                onChange={e => setHeight({...height, value: e.target.value})}
                                                                label="Height"
                                                                >
                                                                {
                                                                   height.options.map(val => 
                                                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                                                    )
                                                                }    
                                                        </Select>
                                                </StyledFormControl>
                                    </InputContainer> 
                            </GridItem>}
                            {weight.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                                <StyledFormControl variant='outlined' style={{ width: '100%' }} margin='dense'>
                                                        <InputLabel id="demo-simple-select-outlined-label">Weight</InputLabel>
                                                        <Select 
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={weight.value}
                                                                onChange={e => setWeight({...weight, value: e.target.value})}
                                                                label="Weight"
                                                                >
                                                                {
                                                                   weight.options.map(val => 
                                                                        <MenuItem key={val} value={val}>{val}</MenuItem>
                                                                    )
                                                                }    
                                                        </Select>
                                                </StyledFormControl>
                                    </InputContainer> 
                            </GridItem>}
                            {gender.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                                <StyledFormControl variant='outlined' style={{ width: '100%' }} margin='dense'>
                                                        <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                                        <Select 
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={gender.value}
                                                                onChange={e => setGender({...gender, value: e.target.value})}
                                                                label="Gender"
                                                                >
                                                                {
                                                                   gender.options.map(val => 
                                                                        <MenuItem key={val} value={val}>{val[0].toUpperCase() + val.substring(1)}</MenuItem>
                                                                    )
                                                                }    
                                                        </Select>
                                                </StyledFormControl>
                                    </InputContainer> 
                            </GridItem>}
                            {martial.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                                <StyledFormControl variant='outlined' style={{ width: '100%' }} margin='dense'>
                                                        <InputLabel id="demo-simple-select-outlined-label">Martial Status</InputLabel>
                                                        <Select 
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                value={martial.value}
                                                                onChange={e => setMartial({...martial, value: e.target.value})}
                                                                label="Martial Status"
                                                                >
                                                                {
                                                                   martial.options.map(val => 
                                                                        <MenuItem key={val} value={val}>{val[0].toUpperCase() + val.substring(1)}</MenuItem>
                                                                    )
                                                                }    
                                                        </Select>
                                                </StyledFormControl>
                                    </InputContainer> 
                            </GridItem>}
                            {status.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                            <StyledFormControl  error={status.error} variant='outlined' style={{ width: '100%' }} margin='dense'>
                                                    <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                                                    <Select labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={status.value}
                                                            onChange={handleChangeStatus}
                                                            label="Status"
                                                            >
                                                            {
                                                               status.options.map((opt, i) => <MenuItem value={opt} key={i}>{opt}</MenuItem>)
                                                            }    
                                                    </Select>
                                                    { status.error && <FormHelperText>{status.errMsg}</FormHelperText>}
                                            </StyledFormControl>
                                    </InputContainer> 
                            </GridItem>}
                                {academic.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                    <InputContainer>
                                            <StyledFormControl  error={status.error} variant='outlined' style={{ width: '100%' }} margin='dense'>
                                                    <InputLabel id="demo-simple-select-outlined-label">Academic Qualification</InputLabel>
                                                    <Select labelId="demo-simple-select-outlined-label"
                                                            id="demo-simple-select-outlined"
                                                            value={academic.value}
                                                            onChange={e => setAcademic({...academic, value: e.target.value})}
                                                            label="Academic Qualification"
                                                            >
                                                            {
                                                               academic.options.map((opt, i) => <MenuItem value={opt} key={i}>{opt}</MenuItem>)
                                                            }    
                                                    </Select>
                                            </StyledFormControl>
                                    </InputContainer> 
                                </GridItem>}
                                {selectedDate.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                        <InputContainer>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <StyledKeyboardDatePicker
                                                        margin="dense"
                                                        id="date-picker-dialog"
                                                        label="Select Date"
                                                        format="MM/dd/yyyy"
                                                        value={selectedDate.value}
                                                        onChange={handleDateChange}
                                                        inputVariant = 'outlined'
                                                        disablePast
                                                        fullWidth
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change date',
                                                        }}
                                                />
                                            </MuiPickersUtilsProvider>
                                        </InputContainer> 
                                </GridItem>}
                                {remark.checked && <GridItem item lg={4} md={3} sm={6} xs={12}>
                                        <InputContainer>
                                                        <StyledTextField
                                                                id="outlined-error-helper-text"
                                                                label="Remark for others"
                                                                variant="outlined"
                                                                fullWidth
                                                                type="text"
                                                                helperText= ''
                                                                margin='dense'
                                                                multiline
                                                                value={remark.value}
                                                                onChange={e => setRemark({...remark, value: e.target.value})}
                                                            />
                                        </InputContainer> 
                                </GridItem>}
                 </Grid> 
                 <Divider />
                 <ActionBar>
                        <Button size="small" variant="contained" color="primary" disableElevation style={{ marginRight: '10px' }}
                                onClick={handleCreateRecord}
                                disabled= {loading}>
                               Create     
                        </Button>   
                        <Button size="small" variant="contained" color="default" disableElevation onClick={handleCloseAddBtn}
                                disabled= {loading}>
                               Cancel     
                        </Button>  
                </ActionBar> 
                </Container>    
        </Backdrop>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.manageClientReducer.loading,
        success: state.manageClientReducer.success,
        inputType: state.settingReducer.entryForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addClient : data => dispatch(addClient(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClientForm);

const Container = motion.custom(styled(Paper)`
     width : 80%;
`);

const Title = styled.div`
    padding: 15px;
    box-sizing : border-box;
    position: relative;
`
const ActionBar = styled.div`
    padding: 15px;
    box-sizing : border-box;
    position: relative;
    display : flex;
    justify-content : flex-end;
`
const GridItem = styled(Grid)`
   &&& {
    box-sizing: border-box;
    padding: 0px 25px;
   }
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
        .MuiInputLabel-outlined.MuiInputLabel-marginDense {
            transform : translate(14px, 13px) scale(1);
            font-size: 14px
        }
        .MuiInputLabel-outlined.MuiInputLabel-shrink {
            transform : translate(14px, -6px) scale(1);
            font-size: 12px;
        }
        textarea {
            max-height: 60px;
        }
        `}
`

const StyledFormControl = styled(FormControl)`
    &&& {
        label  {
            font-size: 14px;
            font-weight: 500;
        }
        .MuiInputLabel-outlined.MuiInputLabel-marginDense {
            transform: translate(14px, 13px) scale(1);
        }
        .MuiInputLabel-outlined.MuiInputLabel-shrink {
            transform : translate(14px, -6px) scale(1);
            font-size: 12px;
        }
        ${({ theme }) => `
              .MuiOutlinedInput-root {
                    &:hover fieldset {
                        border-color: rgba(0, 0, 0, 0.23);
                    }
                    &.Mui-focused fieldset {
                        border-color: ${theme.palette.primary.main};
                    }
                }
        `}

    }
`

const StyledKeyboardDatePicker = styled(KeyboardDatePicker)`
      &&& {
          margin-top: 8px;
          ${({ theme }) => `
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
      }
`
const SigninProgressBar = styled(LinearProgress)`
        position : absolute;
        top : 0px;
        left : 0px;
        && {
            height : 3px;
        }
`