import React, { useState, useRef } from 'react'
import TopNavText from './UI/TopNavText';
import styled from 'styled-components';
import { Grid, Paper, Typography, Divider, Button, Chip, TextField, Box, IconButton, Tooltip, MenuItem, Menu } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { connect } from 'react-redux';


function ViewClient({ templateMsg }) {

    const [message, setMessage] = useState({ value: '', error: false, errMsg : 'Enter atleast a character' });
    const [mail, setMail] = useState({ value: '', error: false, errMsg : 'Enter atleast a character' });
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorE2, setAnchorE2] = useState(null);
    const [attachment, setAttachment] = useState([]);
    const fileRef = useRef(null);
    const openTimelyOpt = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const openTimelyOpt2 = (event) => {
        setAnchorE2(event.currentTarget);
    };

    const closeTimelyOpt = msg => {
        setAnchorEl(null);
        setMail({ ...mail, value : msg })
    };

    const closeTimelyOpt2 = msg => {
        setAnchorE2(null);
        setMessage({ ...message, value : msg })
    };

    const fileHandler = e => {
        setAttachment(attachment.concat([...e.target.files]));
    }

    const removeFile = i => {
        const newFiles = [...attachment];
        newFiles.splice(i, 1);
        setAttachment([...newFiles]);
    }

    return (
            <>
                 <div style={{ marginBottom: '20px' }}>
                        <TopNavText navText={['Management','>','Manage Client','>', 'View Client']} summaryText="Abhinay Shrestha"/>   
                 </div>
                 <Grid container spacing={1}>
                       <Grid item xs={12} sm={12} md={4} lg={4}> 
                             <StyledPaper>
                                    <Title>
                                        <Typography variant='subtitle2' style={{ fontSize: '16px' }}>
                                             Client Info
                                        </Typography>    
                                    </Title>     
                                    <Divider/>
                                    <InfoContainer container>
                                        <Grid item xs={4} sm={4} md={4} lg={4}> 
                                               <Typography  variant='subtitle2' style={{ fontSize: '14px' }}>
                                                Name
                                               </Typography> 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}> 
                                                <Typography  variant='body1' style={{ fontSize: '14px' }}>
                                                     Abhinay Shrestha   
                                                 </Typography> 
                                             </Grid>   
                                     </InfoContainer>  
                                    <Divider/>
                                    <InfoContainer container>
                                        <Grid item xs={4} sm={4} md={4} lg={4}> 
                                               <Typography  variant='subtitle2' style={{ fontSize: '14px' }}>
                                                Email
                                               </Typography> 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}> 
                                                <Typography  variant='body1' style={{ fontSize: '14px' }} noWrap>
                                                     abhinay.shrestha11@gmail.com 
                                                 </Typography> 
                                             </Grid>   
                                     </InfoContainer>  
                                    <Divider/>
                                    <InfoContainer container>
                                        <Grid item xs={4} sm={4} md={4} lg={4}> 
                                               <Typography  variant='subtitle2' style={{ fontSize: '14px' }}>
                                                Phone no.
                                               </Typography> 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}> 
                                                <Typography  variant='body1' style={{ fontSize: '14px' }}>
                                                     9816593608  
                                                 </Typography> 
                                             </Grid>   
                                     </InfoContainer>  
                                    <Divider/>
                                    <InfoContainer container>
                                        <Grid item xs={4} sm={4} md={4} lg={4}> 
                                               <Typography  variant='subtitle2' style={{ fontSize: '14px' }}>
                                                 Address
                                               </Typography> 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}> 
                                                <Typography  variant='body1' style={{ fontSize: '14px' }}>
                                                     Chabahil 
                                                 </Typography> 
                                             </Grid>   
                                     </InfoContainer>  
                                    <Divider/>
                                    <InfoContainer container>
                                        <Grid item xs={4} sm={4} md={4} lg={4}> 
                                               <Typography  variant='subtitle2' style={{ fontSize: '14px' }}>
                                                 Academic
                                               </Typography> 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}> 
                                                <Typography  variant='body1' style={{ fontSize: '14px' }}>
                                                     Bachelor Degree 
                                                 </Typography> 
                                             </Grid>   
                                     </InfoContainer>  
                                    <Divider/>
                                    <InfoContainer container>
                                        <Grid item xs={4} sm={4} md={4} lg={4}> 
                                               <Typography  variant='subtitle2' style={{ fontSize: '14px' }}>
                                                 Status
                                               </Typography> 
                                            </Grid>
                                            <Grid item xs={8} sm={8} md={8} lg={8}> 
                                                <Typography  variant='body1' style={{ fontSize: '14px' }}>
                                                     Booked 
                                                 </Typography> 
                                             </Grid>   
                                     </InfoContainer>  
                                    <Divider/>
                                    <Title style ={{ display: 'flex', justifyContent : 'flex-end' }}>
                                           <Button variant="contained" color='primary' 
                                                  startIcon={<PublishIcon />} 
                                                  disableElevation
                                                  size='small'>
                                                 Export   
                                           </Button>     
                                     </Title>   
                              </StyledPaper>      
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}> 
                             <StyledPaper>
                                <Title>
                                    <Typography variant='subtitle2' style={{ fontSize: '16px' }}>
                                            Send Message
                                    </Typography>    
                                </Title>  
                                <Divider/> 
                                <MessageBody>
                                        <div className='receipt'>
                                             <Typography variant='body2' color='textSecondary'>
                                                    To : <Chip variant="outlined" color="primary" label='9816593608' size="small"/>
                                              </Typography>      
                                         </div>   
                                         <StyledTextField
                                            id="outlined-multiline-static"
                                            label="Message"
                                            variant="outlined"
                                            fullWidth
                                            margin='dense'
                                            size='small'
                                            multiline
                                            rows={4}
                                            error={message.error}
                                            helperText={ message.error ? message.errMsg : '' }
                                            value={message.value}
                                            onChange={e => setMessage({...message, value: e.target.value})}
                                        />
                                 </MessageBody>   
                                <Title style={{ display: 'flex', justifyContent : 'flex-end' }}>
                                            <div  style={{ flex: '1' }}>
                                                    <Button onClick={openTimelyOpt2} 
                                                            variant='contained' 
                                                            size = 'small'
                                                            style={{ padding:'0px 10px', height: '30px', textTransform: 'capitalize' }}
                                                            disableElevation>
                                                            Add Templates <ArrowDropDownIcon /> 
                                                    </Button>
                                                    <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorE2}
                                                            keepMounted
                                                            open={Boolean(anchorE2)}
                                                            onClose={closeTimelyOpt2}
                                                            style={{ width : '350px' }}
                                                            >
                                                                 <MenuItem onClick={closeTimelyOpt2.bind(null, '')}>
                                                                         <Typography noWrap>None</Typography>
                                                                  </MenuItem>
                                                            { templateMsg &&
                                                                templateMsg.map((msg, i) =>
                                                                     <MenuItem key={i} onClick={closeTimelyOpt2.bind(null, msg)}>
                                                                         <Typography noWrap>{msg}</Typography>
                                                                      </MenuItem>
                                                                )
                                                            }    
                                                    </Menu>
                                             </div>    
                                            <Button variant="contained" color='primary'
                                                  endIcon={<SendIcon />} 
                                                  disableElevation
                                                  size='small'>
                                                 Message 
                                           </Button>   
                                </Title> 
                              </StyledPaper>  
                        <StyledPaper style={{ marginTop : '20px' }}>
                            <div style={{ padding: '15px' }}>
                                <Typography variant='body1' color='textSecondary' style={{ fontSize: '14px' }}>
                                <Box color='gray'>Remember, if the record is deleted permanently it cannot be brought back.</Box>
                                </Typography>   
                                <div style={{ display: 'flex', justifyContent : 'flex-end', marginTop : '10px' }}>
                                        
                                            <Button variant="contained" color='secondary'
                                                  startIcon={<DeleteIcon />} 
                                                  disableElevation
                                                  size='small'>
                                                 Delete Record 
                                           </Button>   
                                </div> 
                             </div> 
                         </StyledPaper>   
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}> 
                        <StyledPaper>
                                <Title>
                                    <Typography variant='subtitle2' style={{ fontSize: '16px' }}>
                                            Send Email
                                    </Typography>    
                                </Title>  
                                <Divider/> 
                                <MessageBody>
                                        <div className='receipt'>
                                             <Typography variant='body2' color='textSecondary'>
                                                    To : <Chip variant="outlined" color="primary" label='abhinay.shrestha11@gmail.com' size="small"/>
                                              </Typography>      
                                         </div>   
                                         <StyledTextField
                                            id="outlined-multiline-static"
                                            label="Mail"
                                            variant="outlined"
                                            fullWidth
                                            margin='dense'
                                            size='small'
                                            multiline
                                            rows={4}
                                            error={mail.error}
                                            helperText={ mail.error ? mail.errMsg : '' }
                                            value={mail.value}
                                            onChange={e => setMail({...mail, value: e.target.value})}
                                        />
                                         {
                                             attachment[0] &&
                                             attachment.map((file, i) => 
                                                 <Chip label={file.name} 
                                                        size="small" 
                                                        color = 'primary'
                                                        variant = 'outlined'
                                                        style={{ margin: '2px 2px', maxWidth:'200px' }}
                                                        onDelete = {removeFile.bind(null, i)}/>
                                             )
                                         }
                                 </MessageBody>  
                                <Title style={{ display: 'flex', alignItems: 'center' }}>
                                            <div>
                                                <Tooltip title='Attach file'>
                                                        <IconButton onClick = {() => fileRef.current.click()}>
                                                            <AttachFileIcon />
                                                        </IconButton>
                                                </Tooltip>    
                                                <input type='file' onChange={fileHandler} ref={fileRef} style={{ display : 'none' }} multiple/>
                                            </div>
                                            <div  style={{ flex: '1' }}>
                                                    <Button onClick={openTimelyOpt} 
                                                            variant='contained' 
                                                            size = 'small'
                                                            style={{ padding:'0px 10px', height: '30px', textTransform: 'capitalize' }}
                                                            disableElevation>
                                                            Add Templates <ArrowDropDownIcon /> 
                                                    </Button>
                                                    <Menu
                                                            id="simple-menu"
                                                            anchorEl={anchorEl}
                                                            keepMounted
                                                            open={Boolean(anchorEl)}
                                                            onClose={closeTimelyOpt}
                                                            style={{ width : '350px' }}
                                                            >
                                                                 <MenuItem onClick={closeTimelyOpt.bind(null, '')}>
                                                                         <Typography noWrap>None</Typography>
                                                                  </MenuItem>
                                                            { templateMsg &&
                                                                templateMsg.map((msg, i) =>
                                                                     <MenuItem key={i} onClick={closeTimelyOpt.bind(null, msg)}>
                                                                         <Typography noWrap>{msg}</Typography>
                                                                      </MenuItem>
                                                                )
                                                            }    
                                                    </Menu>
                                             </div>    
                                            <Button variant="contained" color='primary'
                                                  endIcon={<SendIcon />} 
                                                  disableElevation
                                                  style={{ padding:'0px 10px', height: '30px' }}
                                                  size='small'>
                                                 Mail 
                                           </Button>   
                                </Title> 
                              </StyledPaper>  
                        </Grid>
                 </Grid>    
            </>
    )
}

const mapStateToProps = state => {
    return {
        templateMsg : state.settingReducer.templateMsg
    }
}

export default connect(mapStateToProps)(ViewClient);
 
const StyledPaper = styled(Paper)`
    &&& {
        box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
    }
`
const Title = styled.div`
    padding: 15px 15px;
    box-sizing : border-box;
    position: relative;
`
const InfoContainer = styled(Grid)`
    padding: 15px;
    display: flex;
    .left {
        flex: 1;
    }
    .right {
        flex: 1;
    }
`
const MessageBody = styled.div`
     box-sizing: border-box;
     padding: 15px 15px 0px 15px;
     .receipt {
         margin-bottom : 10px;
     }
`
const StyledTextField = styled(TextField)`
    &&& {
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
        textarea {
            max-height: 60px;
        }
        `}
        }
`