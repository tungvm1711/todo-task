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

class TodoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            fetchTodoSuccess: false,
            todos: [],
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

        if (todos.status === 'OK') {
            console.log("load duoc roi ne");
            this.setState({todos: todos.todos});
        }
    };


    handleCreateTask = (text, urgency, isCompleted) => {
        let newTodo = {
            "text": "Think of something new to do",
            "isCompleted": false,
            "urgency": 5
        };
        console.log(newTodo);
        this.props.create(newTodo);
        this.props.fetch();

    };

    handleFetchTask = (e) => {
        this.props.fetch();
        let todos = this.props.todos.todos;
        console.log(this.props.todos);

        if (todos.status === 'OK') {
            console.log("load duoc roi ne");

            this.setState({todos: todos.todos});
        }
    };

    handleRemoveTask = (_id) => {
        console.log("Remove Task");
        this.props.removeTask(_id);
        this.props.fetch();
        let todos = this.props.todos.todos;

        if (todos.status === 'OK') {
            this.setState({todos: todos.todos});
        }
    };

    render() {
        let todosData = this.props.todos.todos.todos;
        let status = this.props.todos.todos.status;

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
