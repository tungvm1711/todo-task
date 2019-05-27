import React from 'react';
import {connect} from "react-redux";
import {remove} from "../../server/actions/session";
import {fetch} from "../../server/actions/todotask";
import LinkButton from '../../components/LinkButton';


const mapDispatchToProps = dispatch => ({
    remove: () => dispatch(remove()),
    fetch: () => dispatch(fetch())
});

const mapStateToProps = state => {
    return {
        todos: state.todos,
        session: state.session
    }
};

class DashboardPage extends React.Component {
    handleSubmit = (e) => {
        console.log(this.props);

    };
    handlesmth = (e) => {
        console.log(this.props);
    };

    render() {
        return (
            <div className="App">
                This is welcome page
                <LinkButton
                    to='/todos'
                    onClick={this.handleSubmit}
                >Go to todos</LinkButton>
                <button onClick={this.handlesmth}>dsad</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);