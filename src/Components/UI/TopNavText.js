import React from 'react'
import styled from 'styled-components'

function TopNavText({ navText, summaryText }) {
    return (
        <Container>
             <div className='navText'>
                    {
                        navText && navText.map((text, i) => <span key={i} style={{ marginRight : '10px' }}>{text}</span>)
                    }
              </div>  
              <div className='summary'>
                        {summaryText}
               </div>     
        </Container>
    )
}

export default TopNavText;

const Container = styled.div`
     flex : 1;
     .navText {
        font-size: 1rem;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        color: #5f6368;
     }
     .summary {
        font-size: 1.2853rem;
        color: #263238;
        font-weight: 500;
        line-height: 1.167;
        letter-spacing: -0.06px;
     }
`
