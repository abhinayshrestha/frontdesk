import React, { useState } from 'react'
import styled from 'styled-components';
import { Typography, Divider, IconButton } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function VisitsChart() {

    const [anchorEl, setAnchorEl] = useState(null);

    const open = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const close = () => {
        setAnchorEl(null);
    };

    const [chartData] = useState({
                        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                        datasets: [{
                            label: 'Number of Visited People',
                            data: [12, 19, 3, 5, 2, 3],
                            barThickness: 25,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)'
                     }]
            })
    
    const [chartOption] = useState({ 
                    responsive: true,
                     maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                        },
                        animation: {
                            duration : 2000
                        }   
                })         

    return (
        <Container>
             <Title>
                <Typography variant='subtitle2' style={{ fontSize: '16px' }}>
                     Visits Over Time
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
                    <Bar data={chartData} options={chartOption}/>
              </div>   
        </Container>
    )
}

export default VisitsChart;

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