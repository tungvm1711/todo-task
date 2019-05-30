import React from "react";
import {connect} from "react-redux";
import {create, fetch, remove} from "../../server/actions/todotask";
import TodoList from "../../components/TaskComponents/TodoList";
import TaskForm from "../../components/TaskComponents/TaskForm";
import 'lodash';
import {Button, ButtonGroup, Colors} from 'react-foundation';

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetch()),
    create: (todo) => dispatch(create(todo)),
    removeTask: (_id) => dispatch(remove(_id))
});

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
};
function getSafe(fn, defaultVal) {
    try {
        return fn();
    } catch (e) {
        return defaultVal;
    }
}
class TodoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            fetchTodoSuccess: false,
            todos: [],
/*
            todos: this.props.todos.todos.todos,
*/
            active: false,
            completed: false
        }
    };

    activeTodos = () => {
        this.setState({active: true});
        this.setState({completed: false});
    };

    completedTodos = () => {
        this.setState({active: false});
        this.setState({completed: true});
    };

    allTodos = () => {
        this.setState({active: false, completed: false});
    };

    componentDidMount = () => {
        this.props.fetch();
        let todos = this.props.todos.todos;
        console.log(this.props.todos);

        if (todos.todos !== undefined) {
            console.log("load duoc roi ne");
            this.setState({todos: todos.todos});
        }
    };

/*    static getDerivedStateFromProps(nextProps, prevState) {
        getSafe(() => nextProps.todos.todos.todos, []);
        console.log(nextProps.todos.todos.todos);
        console.log(prevState.todos);
        if (nextProps !== prevState) {
            return console.log("ahdasdahsdaisdh");

        } else return null;
    }*/

        componentWillReceiveProps = (nextProps) => {

            /*
                    if (this.state.todos !== undefined && nextProps.todos.todos.todos !== undefined && nextProps.todos.todos.todos !== this.state.todos ) {
            */
            try {
                if (nextProps.todos.todos.todos === 'undefined') {
                    console.log("dietmememem");
                }
            } catch (err) {
                console.log(err)
            }

            if (typeof (nextProps.todos.todos.todos) !== 'undefined') {
                if (this.state.todos !== nextProps.todos.todos.todos) {

                    console.log(nextProps.todos.todos.todos);
                    console.log(this.state.todos);
                    this.setState({todos: nextProps.todos.todos.todos});
                    console.log("dietmememem");
                }
            }
        };

    handleCreateTask = (text, urgency, complete) => {
        let isCompleted = (complete === 'True');
        let newTodo = {
            "text": text,
            "isCompleted": isCompleted,
            "urgency": parseInt(urgency)
        };
        this.props.create(newTodo);
        this.props.fetch();
    };

    handleFetchTask = (e) => {
        this.props.fetch();
        let todos = this.props.todos.todos;
        console.log(this.props.todos);
        if (todos.todos !== undefined) {
            console.log("load duoc roi ne");
            this.setState({todos: todos.todos});
        }
    };

    handleRemoveTask = (_id) => {
        console.log("Remove Task");
        this.props.removeTask(_id);
        this.props.fetch();
    };

    render() {
        let todosData = this.state.todos;
        let status = this.state.status;
        console.log(this.props);

        return (
            <div className="g-row todopage">
                <div className="g-col todoapp">
                    <TodoList
                        active={this.state.active}
                        completed={this.state.completed}
                        todosData={todosData}
                        removeTask={this.handleRemoveTask}
                        handleFetch={this.handleFetchTask}
                        shouldFetch={status}

                    />
                    <div className="btnGroup-wrapper">
                        <ButtonGroup className="order-btnGroup" isExpanded>
                            <Button
                                color={Colors.PRIMARY} isHollow
                                onClick={this.allTodos}
                            >
                                All
                            </Button>
                            <Button
                                color={Colors.SUCCESS} isHollow
                                onClick={this.activeTodos}
                            >
                                Active
                            </Button>
                            <Button
                                className="normal-btn"
                                color={Colors.ALERT} isHollow
                                onClick={this.completedTodos}
                            >
                                Completed
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className="g-col something">
                    <TaskForm handleAddTodo={this.handleCreateTask}/>
                </div>

            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
