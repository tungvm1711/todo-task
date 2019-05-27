import React from 'react';
import {Redirect} from 'react-router';
import {connect} from "react-redux";
import {init} from "../../server/actions/session";
import CreateSession from "../../components/CreateSession";

const mapDispatchToProps = dispatch => ({
    init: (name) => dispatch(init(name))
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false, sessionName: ''};
    }

    handleInitSession = (name) => {
        this.props.init(name);
        this.setState({redirect: true});
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        return (
            <div className="g-row sign-in">
                <div className="g-col">
                    <CreateSession initSession={this.handleInitSession}/>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);