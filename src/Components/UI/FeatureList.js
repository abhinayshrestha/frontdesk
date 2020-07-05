import React from 'react'
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

function FeatureList({ children, align }) {
    return (
        <StyledFeatureList variant='body1' align={align}>
            {align === 'left' ? <ArrowRightIcon /> : null} {children} {align === 'right' ? <ArrowLeftIcon /> : null}
        </StyledFeatureList>
    )
}

export default FeatureList;

const StyledFeatureList = styled(Typography)`
      padding : 20px;
      box-sizing : border-box;
      display : flex;
      align-items : center;
      justify-content : ${ props => props.align === 'left' ? 'flex-start' : 'flex-end' };
      &&& {
          color : #fff;
          font-weight : 400;
          text-shadow: 0px 0px 15px rgba(0, 0, 0, 0.76);
          font-size : 18px;
      }
`
