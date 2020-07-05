import React from 'react'
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Login from './Login';
import { connect } from 'react-redux';

function App({ isAuth }) {

    return (
        <MainContainer>
            { true ? <Dashboard /> : <Login />}
        </MainContainer>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

export default connect(mapStateToProps)(App);

const MainContainer = styled.div`
   height : 100vh;
   width : 100%;
`
