import React from 'react'
import FeatureList from './UI/FeatureList';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const containerVariants = {
    start : { opacity : 0 },
    end : {
        opacity : 1,
        transition : {
            staggerChildren: 0.5,
            delayChildren : 1
        }
    }
}

const listVariants = {
    start : i => ({ x :  i * 100, opacity: 0 }),
    end : { x : 0,opacity : 1, transition: { type : 'spring', mass: 0.8} }
}

function FeaturesLayout() {
    return (
        <FeatureGrid container variants={containerVariants} initial='start' animate='end'>
                <MotionGrid item xs={6} variants={listVariants} custom={-1}>  
                        <FeatureList align='left'>
                                User-friendliness 
                        </FeatureList>    
                </MotionGrid>   
                <MotionGrid item xs={6} variants={listVariants} custom={1}>
                        <FeatureList align='right'>
                               Integrate billing and invoicing features    
                         </FeatureList>   
                </MotionGrid>   
                <MotionGrid item xs={6} variants={listVariants} custom={-1}>
                        <FeatureList align='left'>
                                Identify and prevent errors
                         </FeatureList>  
                </MotionGrid>   
                <MotionGrid item xs={6} variants={listVariants} custom={1}>
                        <FeatureList align='right'>
                               Easily connect with stakeholders
                         </FeatureList>  
                </MotionGrid>   
                <MotionGrid item xs={6} variants={listVariants} custom={-1}>
                        <FeatureList align='left'>
                                Identify and prevent errors
                         </FeatureList>  
                </MotionGrid>   
                <MotionGrid item xs={6} variants={listVariants} custom={1}>
                        <FeatureList align='right'>
                               Easily connect with stakeholders
                         </FeatureList>  
                </MotionGrid>  
        </FeatureGrid>    
    )
}

export default FeaturesLayout;

const FeatureGrid = motion.custom(styled(Grid)`
     &&& {
         position : absolute;
         width : 100%;
         bottom : 20px;
     }
`)

const MotionGrid = motion.custom(styled(Grid)`
   
`)
