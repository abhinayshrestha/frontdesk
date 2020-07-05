import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';

const backDropVariants = {
    start: { opacity: 0 },
    end : {
        opacity: 1,
        transition : {
            type : 'tween',
            duration : 0.3
        }
    },
    exit : {
        opacity: 0,
        transition : {
            type : 'tween',
        }
    }
}

function Backdrop({ open, children }) {
    return (
        open && 
            <Container variants={backDropVariants}
                        initial='start'
                        animate='end'
                        exit='exit'>
                 {children}
            </Container>
    )
    
}

export default Backdrop;

const Container = motion.custom(styled.div`
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        background : rgba(0, 0, 0, 0.5);
        z-index: 1200;
        display : flex;
        justify-content : center;
        align-items : center;
`)


