import React, { useState } from 'react'
import styled from 'styled-components';
import { Typography, Divider, IconButton } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function DepositsChart() {

    const [anchorEl, setAnchorEl] = useState(null);

    const [chartData] = useState({
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                        datasets: [{
                            label: 'Deposited Cash',
                            data: [5000, 12000, 7000, 5000, 2000, 3000],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'transparent',
                            pointBackgroundColor :'rgba(255, 99, 132, 0.5)',
                            pointBorderColor: 'rgba(255, 99, 132, 1)'
                     }],
            })
    
    const [chartOption] = useState({ 
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            gridLines: {
                                drawBorder: false,
                                display:false,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, 0.1)',
                                borderDash: [5, 5],
                                drawBorder: false
                                },
                        }]
                      } 
                })         

        const open = (event) => {
            setAnchorEl(event.currentTarget);
        };
    
        const close = () => {
            setAnchorEl(null);
        };
                       

    return (
        <Container>
             <Title>
                <Typography variant='subtitle2' style={{ fontSize: '16px' }}>
                     Deposits Over Time
                </Typography>    
                <StyledButton onClick={open}>
                        <MoreVertIcon />
                </StyledButton>
                <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={close}
                        >
                        <MenuItem onClick={close}>Today</MenuItem>
                        <MenuItem onClick={close}>1 week ago</MenuItem>
                        <MenuItem onClick={close}>30 days abgo</MenuItem>
                </Menu>
             </Title>    
             <Divider />
             <div className='chartContainer'>
                    <Line data={chartData} options={chartOption}/>
              </div>   
        </Container>
    )
}

export default DepositsChart;

const Container = styled.div`
     height: 400px;
     box-shadow: 0 0 14px 0 rgba(53,64,82,.05);
     background: #fff;
     border-radius : 4px;
     overflow : hidden;
     box-sizing : border-box;
     position: relative;
     display : flex;
     flex-direction : column;
     width: 100%;
    .chartContainer {
        flex: 1;
        padding: 10px 15px;
    }
`
const Title = styled.div`
    padding: 15px 15px;
    box-sizing : border-box;
    position: relative;
`
const StyledButton = styled(IconButton)`
    &&& {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }
`