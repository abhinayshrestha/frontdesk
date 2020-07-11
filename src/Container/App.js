import React from 'react'
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Login from './Login';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';

function App({ isAuth, isDark }) {

    const lightTheme = createMuiTheme({
        palette : {
            primary : {
                main : '#5850EC'
            },
            secondary : {
                main : '#f44336'
            },
            text : {
                primary : '#5f6368',
                hint : '#9e9e9e'
            }
        }
    })

    const darkTheme = createMuiTheme({
        palette : {
            primary : {
                main : '#5850EC'
            },
            secondary : {
                main : '#f44336'
            },
            text : {
                primary : '#ffffff',
                hint : '#f8f8f8'
            },
            background : {
                paper : '#1F1B24'
            }
        }
    })

    return (
                <MuiThemeProvider theme = {isDark && isDark ? darkTheme : lightTheme}>  
                    <ThemeProvider theme = {isDark && isDark ? darkTheme : lightTheme}>
                            <MainContainer>
                                     { true ? <Dashboard /> : <Login />}
                            </MainContainer>
                    </ThemeProvider> 
                </MuiThemeProvider> 
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuth,
        isDark: state.authReducer.isDark
    }
}

export default connect(mapStateToProps)(App);

const MainContainer = styled.div`
   height : 100vh;
   width : 100%;
`
