import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography, 
         Divider, 
         Box, 
         TableContainer, 
         Table, 
         TableHead, 
         TableBody, 
         TableRow, 
         TableCell,
         FormControlLabel,
         Switch,
         Button,
         CircularProgress,
         IconButton } from '@material-ui/core';
import { connect } from 'react-redux';     
import { updatingInput } from '../Store/Actions/settingAction';    
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import InputSetting from './UI/InputSetting';
import { AnimatePresence } from 'framer-motion';

function EntrySetting({ inputs, updatingInput, entryLoader }) {

    const [inputEl, setInputEl] = useState({});
    const [openSetting, setOpenSetting] = useState(null);

    const handleOpenSetting = (value, options) => {
        setOpenSetting(<InputSetting inValue={value} options={options} handleCloseSetting={handleCloseSetting} updateOptions={updateOptions}/>);
    }

    const handleCloseSetting = () => {
        setOpenSetting(null);
    }

    const handleChecked = (key, event) => {
        setInputEl({
            ...inputEl,
            [key] : {
              ...inputEl[key],
               checked : event.target.checked
            }
        })
    }

    const updateOptions = (opt, key) => {
        console.log(opt, key)
        setInputEl({
            ...inputEl,
            [key]: {
                ...inputEl[key],
                options: [...opt]
            }
        })
    }

    const saveInputSetting = () => {
        updatingInput(inputEl);
    }

    useEffect(() => {
        setInputEl({...inputs})
    }, [inputs])

    return (
        <div style={{ position : 'relative' }}>
            <AnimatePresence>
                    {openSetting}
             </AnimatePresence>   
            <Title>
                <Typography variant='subtitle2' style={{ fontSize: '14px' }}>
                    Customize Entry Form
                </Typography>  
             </Title> 
             <Divider />
             <Container>
                <Typography gutterBottom variant='subtitle2' style={{ fontSize: '14px',padding:'3px 0px', fontWeight: 400,  lineHeight: '18px' }}>
                        <Box color='gray'>Check the input element you want to set for your entry form.</Box>
                </Typography>   
                <TableContainer>
                        <Table size="small" padding='none' aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Input</TableCell>
                                    <TableCell align="center">Edit</TableCell>
                                    <TableCell align="right">Check</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { 
                                        Object.keys(inputEl).map(key => 
                                        <TableRow key={key}>
                                            <TableCell component="th" scope="row">
                                                {inputEl[key].label}
                                            </TableCell>
                                            <TableCell align="center">
                                            {(key === 'status' || key === 'academic') &&    
                                                    <IconButton onClick={handleOpenSetting.bind(null, key, inputEl[key].options)} disabled={!inputEl[key].checked}>
                                                        <FileCopyOutlinedIcon fontSize='small'/>
                                                    </IconButton>   
                                            }
                                            </TableCell>
                                            <TableCell align="right">
                                                    <StyledFormControlLabel
                                                            control={
                                                                <Switch color="primary"
                                                                        onChange={handleChecked.bind(null, key)}
                                                                        checked={inputEl[key].checked}/>
                                                            } />
                                            </TableCell>
                                        </TableRow>
                                     )      
                                                                 
                                }
                               
                            </TableBody>
                        </Table>
                </TableContainer>  
             </Container>
             <Divider />
             <ActionBar>
                        <Button size="small" variant="contained" color="primary" disableElevation 
                               style={{ marginRight: '10px', textTransform : 'capitalize' }}
                               onClick={saveInputSetting}
                               disabled={entryLoader}>
                               {entryLoader ? <CircularProgress size={18}/> : 'Save Changes'}  
                        </Button> 
            </ActionBar> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        inputs : state.settingReducer.entryForm,
        entryLoader : state.settingReducer.saveEntryLoader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updatingInput : data => dispatch(updatingInput(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntrySetting);

const Title = styled.div`
    padding: 12px;
    box-sizing : border-box;
    position: relative;
`
const Container = styled.div`
    position: relative;
    height: 250px;
    padding: 7px 17px; 
    overflow-y: scroll;
    transition: color 0.3s;
    color: #fff;
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

const StyledFormControlLabel = styled(FormControlLabel)`
   &&& {
        &.MuiFormControlLabel-root{
            margin-right: 0px;
        }
   }
`
const ActionBar = styled.div`
    padding: 9px;
    box-sizing : border-box;
    position: relative;
    display : flex;
    justify-content : flex-end;
`

