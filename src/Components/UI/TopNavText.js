import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function TopNavText({ navText, summaryText, children }) {
    return (
        <Container>
             <div className='navText'>
                    {
                        navText && navText.map((text, i) => 
                                <StyledLink key={i} to={text.to}>
                                      {text.label}
                                      { (i + 1) !== navText.length ? <span style={{ margin : '0px 7px', fontSize : '20px' }}> {'>'} </span> : null}
                                </StyledLink>
                        )
                    }
              </div>  
              <div className='summary'>
                        {summaryText}
               </div>  
               {children}   
        </Container>
    )
}

export default TopNavText;

const Container = styled.div`
     position : relative;
     flex : 1;
     .summary {
        font-size: 1.2853rem;
        color: #263238;
        font-weight: 500;
        line-height: 1.167;
        letter-spacing: -0.06px;
     }
`
const StyledLink = styled(Link)`
        font-size: 1rem;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.00938em;
        color: #5f6368;
        text-decoration : none;
`
