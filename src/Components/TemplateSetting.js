import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography, Divider, Fab, IconButton, TextField, Button } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { motion, AnimatePresence } from 'framer-motion';
import { connect } from 'react-redux';
import { addTemplate, updateTemplate, deleteTemplate } from '../Store/Actions/settingAction';

const fabVariants = {
    start : { opacity : 0, scale: 0 },
    end : {
        opacity:  1,
        scale : 1,
        transition : {
            type : 'tween',
            duration : 0.2,
        }
    },
    exit : {
        opacity:  0,
        scale : 0,
        transition : {
            type : 'tween',
            duration : 0.2,
        }
    }
}

const slideDown = {
    start : { y : '-100%' },
    end : {
        y : 0,
        transition : {
            type : 'tween',
            duration : 0.2,
        }    
    }
}

function TemplateSetting({ templateMsg, addTemplate, updateTemplate, deleteTemplate }) {

    const [openAddTemplate, setOpenAddTemplate] = useState(false);
    const [message, setMessage] = useState({ value: '', error: false, errMsg : 'Enter atleast a character' });
    const [update, setUpdate] = useState({ is : false, index : 0 , val : '' });

    const openEditHandler = () => {
        setOpenAddTemplate(true);
        setUpdate({ ...update, is : false });
    }

    const saveTemplateHandler = () => {
        if(message.value.length < 1 ) {
            setMessage({
                ...message,
                error: true
            })
        }
        else {
            if(update.is){
                updateTemplate({ index : update.index, val : message.value });
            }else {
                addTemplate(message.value);
            }
            setMessage({ ...message, value: '' });
            setOpenAddTemplate(false);
        }
    }

    const handleInput = e => {
        setMessage({...message, value: e.target.value, error: false});
    }

    const editHandler = (i, msg) => {
        setUpdate({ ...update, is: true, index: i, val: msg });
        setMessage({ ...message, value : msg });
        setOpenAddTemplate(true);
    }

    const deleteHandler = (i, event) => {
         event.stopPropagation();
         deleteTemplate(i);
    }

    return (
        <div>
            <Title>
                <Typography variant='subtitle2' style={{ fontSize: '14px' }}>
                    Set message template 
                </Typography>  
             </Title> 
             <Divider />
             <Templates> 
                    {templateMsg && 
                           templateMsg.map((msg, i) => 
                                   <React.Fragment key={i}>
                                        <div className='template' onClick={editHandler.bind(null, i, msg)}>
                                            <Typography variant='subtitle2' color='textPrimary' noWrap
                                                    style={{ fontSize: '14px',padding:'10px 5px',flex:'1', fontWeight: 400 }}>  
                                                 {msg}
                                            </Typography>
                                            <IconButton size='small' onClick={deleteHandler.bind(null, i)}>
                                                <RemoveCircleOutlineIcon color='secondary' fontSize='small'/>
                                            </IconButton>
                                        </div>
                                        <Divider />   
                                    </React.Fragment>)
                    }  
                      
                      {openAddTemplate && 
                        <AddTemplate variants = {slideDown} initial='start' animate='end'>
                            <Typography variant='subtitle1' color='textSecondary' style={{ marginBottom: '10px' }}>  
                                Enter your custom template.
                            </Typography>
                            <StyledTextField
                                    id="outlined-multiline-static"
                                    label="Template"
                                    variant="outlined"
                                    fullWidth
                                    margin='dense'
                                    size='small'
                                    multiline
                                    autoFocus
                                    rows={4}
                                    error={message.error}
                                    helperText={ message.error ? message.errMsg : '' }
                                    value={message.value}
                                    onChange={handleInput}
                             />
                             <ActionArea>
                                    <Button variant='contained' color='primary' size='small' disableElevation 
                                             style={{ marginRight : '10px', textTransform : 'capitalize' }}
                                             onClick={saveTemplateHandler}>
                                            Save
                                     </Button>   
                                     <Button variant='contained' size='small' disableElevation
                                            style={{ textTransform : 'capitalize' }}
                                            onClick={() => setOpenAddTemplate(false)}>
                                            Cancel
                                     </Button>
                              </ActionArea>   
                       </AddTemplate>  } 
              </Templates>
              <AddBtn>
                  <AnimatePresence>
                        {!openAddTemplate && 
                        <StyledFab  variants = {fabVariants} initial='start' animate = 'end' exit='exit'
                                    color="primary" aria-label="add" size='medium'
                                    onClick = {openEditHandler}>
                            <CreateOutlinedIcon />
                        </StyledFab>}
                   </AnimatePresence> 
               </AddBtn>    
        </div>
    )
}

const mapStateToProps = state => {
    return {
        templateMsg : state.settingReducer.templateMsg
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTemplate : data => dispatch(addTemplate(data)),
        updateTemplate : data => dispatch(updateTemplate(data)),
        deleteTemplate : data => dispatch(deleteTemplate(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateSetting);

const Title = styled.div`
    padding: 12px;
    box-sizing : border-box;
    position: relative;
`

const Templates = styled.div`
    position: relative;
    margin-left: 9px;
    height: 305px;
    overflow-y: scroll;
    transition: color 0.3s;
    color: #00000000;
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
    .template {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
`

const AddBtn = styled.div`
    position: relative;
    height: 8px;
  
`

const StyledTextField = styled(TextField)`
    &&& {
    ${({ theme }) => `
        label {
            font-weight : 400;
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
        textarea {
            max-height: 60px;
        }
        `}
        }
`
const ActionArea = styled.div`
   display : flex;
   justify-content : flex-end;
   padding: 20px 0px;
`

const AddTemplate = motion.custom(styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    box-sizing : border-box;
    padding : 10px;
    background : #fff;
`)
const StyledFab = motion.custom(styled(Fab)`
   &&& {
       position : absolute;
       bottom: 20px;
       left : 45%;
   }
`)