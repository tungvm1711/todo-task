import React from 'react';
import {Switch} from 'react-router-dom';
import DashboardPage from './DashboardPage/DashboardPage.jsx';
import TodoPage from './TodoPage/TodoPage.jsx';
import LoginPage from './LoginPage/LoginPage';
import RequireAuthRoute from '../components/Auth/require-auth-route';
import RequireUnauthRoute from '../components/Auth/require-unauth-route';
import {connect} from "react-redux";


const mapStateToProps = state => {
    return {
        isAuth: state.session.isAuth
    }
};

class App extends React.Component {
    render(): React.Element<any> {
        const {...rest} = this.props;
        let isAuth = this.props.isAuth;
        console.log("hihi main");
        console.log(isAuth);
        return (
            <div className="content-wrapper">
                <Switch>
                    <RequireAuthRoute authenticated={isAuth} exact path="/" component={TodoPage}/>
{/*
                    <RequireAuthRoute authenticated={isAuth} path="/todos" component={TodoPage}/>
*/}
                    <RequireUnauthRoute authenticated={isAuth} exact path="/new-session" component={LoginPage}/>
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);