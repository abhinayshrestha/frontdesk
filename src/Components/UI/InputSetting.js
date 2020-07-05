import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Paper, Typography, Button, Chip, IconButton, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const settingVariation = {
    start : { y : '100%', opacity: 0 },
    end : {
        y : 0,
        opacity: 1,
        transition : {
            type: 'tween',
            duration : 0.2
        }
    },
    exit : {
        y : '100%',
        opacity: 0,
        transition : {
            type: 'tween',
            duration : 0.2
        }
    }
}

function InputSetting({ handleCloseSetting, inValue, options, updateOptions }) {

    const [inputSetting, setInputSetting]= useState(null);

    useEffect(() => {
        if(inValue === 'status'){
              setInputSetting(<StatusSetting opt={options} closeSetting={handleCloseSetting} updateOptions={updateOptions}/>)  
        }
        if(inValue === 'academic'){
            setInputSetting(<AcademicSetting opt={options} closeSetting={handleCloseSetting} updateOptions={updateOptions}/>)  
        }
    }, [inValue, options, handleCloseSetting, updateOptions])
    

    return (<SettingDialogue elevation={4} 
                    square
                    variants={settingVariation}
                    initial='start'
                    animate='end'
                    exit='exit'>
                        {inputSetting}
             </SettingDialogue>  
               
    )
}

export default InputSetting;

const StatusSetting = ({ opt, closeSetting, updateOptions }) => {

    const [status, setStatus] = useState('');
    const [statusChip, setStatusChip] = useState([...opt]);

    const handleChange = e => {
        setStatus(e.target.value)
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter'){
            onAdd();
        }
    }

    const onAdd = () => {
        if(status.length > 0){
            const newArray = [...statusChip];
            newArray.push(status);
            setStatusChip([...newArray]);
            setStatus('');
        }
    }

    const deleteChip = (i) => {
        const newArray = [...statusChip];
        newArray.splice(i, 1);
        setStatusChip([...newArray]);
    }

    const saveHandler = () => {
        updateOptions(statusChip,'status')
        closeSetting();
    }

    return (<>
            <Typography variant='body2' gutterBottom>
                  <Box color='gray'>Set status for your entry form.</Box>
             </Typography>   
             <StyledPaper elevation={0}>
                 {
                    statusChip.map((chip, i) => 
                                    <Chip 
                                        key={i} 
                                        label={chip} 
                                        onDelete= {deleteChip.bind(null, i)}
                                        color="primary" 
                                        style={{ margin: '1px 3px 2px 0px', lineHeight: '2' }}
                                        size="small" />)
                 }
              </StyledPaper>  
              <ChipInput>
                   <input value={status} type='text' autoFocus onChange={handleChange} onKeyPress={handleKeyPress}/> 
                   <IconButton onClick={onAdd}><SendIcon fontSize='small'/></IconButton>
              </ChipInput>  
              <ActionBar>
                            <Button size="small" color="primary" disableElevation style={{ textTransform :'capitalize' }}
                                    onClick={saveHandler}>
                                    Ok     
                            </Button> 
                            <Button size="small" color="primary" disableElevation style={{ textTransform : 'capitalize' }}
                                    onClick={closeSetting}>
                                    Cancel    
                            </Button> 
              </ActionBar>   
            </>  
    )
}
const AcademicSetting = ({ opt, closeSetting, updateOptions }) => {

    const [status, setStatus] = useState('');
    const [statusChip, setStatusChip] = useState([...opt]);

    const handleChange = e => {
        setStatus(e.target.value)
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter'){
            onAdd();
        }
    }

    const onAdd = () => {
        if(status.length > 0){
            const newArray = [...statusChip];
            newArray.push(status);
            setStatusChip([...newArray]);
            setStatus('');
        }
    }

    const deleteChip = (i) => {
        const newArray = [...statusChip];
        newArray.splice(i, 1);
        setStatusChip([...newArray]);
    }

    const saveHandler = () => {
        closeSetting();
        updateOptions(statusChip,'academic');
    }

    return (<>
            <Typography variant='body2' gutterBottom>
                  <Box color='gray'>Set academic qualification for your entry form.</Box>
             </Typography>   
             <StyledPaper elevation={0}>
                 {
                    statusChip.map((chip, i) => 
                                    <Chip 
                                        key={i} 
                                        label={chip} 
                                        onDelete= {deleteChip.bind(null, i)}
                                        color="primary" 
                                        style={{ margin: '1px 3px 2px 0px', lineHeight: '2' }}
                                        size="small" />)
                 }
              </StyledPaper>  
              <ChipInput>
                   <input value={status} type='text' autoFocus onChange={handleChange} onKeyPress={handleKeyPress}/> 
                   <IconButton onClick={onAdd}><SendIcon fontSize='small'/></IconButton>
              </ChipInput>  
              <ActionBar>
                            <Button size="small" color="primary" disableElevation style={{ textTransform :'capitalize' }}
                                    onClick={saveHandler}>
                                    Ok     
                            </Button> 
                            <Button size="small" color="primary" disableElevation style={{ textTransform : 'capitalize' }}
                                    onClick={closeSetting}>
                                    Cancel    
                            </Button> 
              </ActionBar>   
            </>  
    )
}
const ActionBar = styled.div`
    padding: 10px 0px;
    box-sizing : border-box;
    position: relative;
    display : flex;
    justify-content : flex-start;
`

const ChipInput = styled.div`
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    box-sizing: border-box;
    input { 
        box-sizing: border-box;
        flex: 1;
        margin-right: 10px;
        outline: none;
        border: none;
        border-bottom : 1px solid #ccc;
        height: 100%;
    }
`

const StyledPaper = styled(Paper)`
    &&& {
        margin: 5px 0px;
        max-height: 100px;
        overflow-y: auto;
    }
`

const SettingDialogue = motion.custom(styled(Paper)`
    width: 100%;
    position: absolute;
    bottom : 0px;
    left : 0px;
    z-index : 1;
    box-sizing : border-box;
    padding: 10px 15px 0px;
    border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`)



