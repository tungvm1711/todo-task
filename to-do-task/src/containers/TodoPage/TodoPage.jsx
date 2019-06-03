import React from "react";
import {connect} from "react-redux";
import {create, fetch, remove, update} from "../../server/actions/todotask";
import TodoList from "../../components/TaskComponents/TodoList";
import TaskForm from "../../components/TaskComponents/TaskForm";
import Toggle from "../../components/TaskComponents/Toggle";
import 'lodash';
import _ from 'lodash';

import {Button, ButtonGroup, Colors} from 'react-foundation';

const mapDispatchToProps = dispatch => ({
    fetch: () => dispatch(fetch()),
    create: (todo) => dispatch(create(todo)),
    updateTask: (todo) => dispatch(update(todo)),
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
            todos: this.props.todos.todos,
            active: false,
            completed: false,
            order: 'asc',
            sortingMethod: 'chronological'
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

    componentWillMount = () => {
        this.props.fetch();

        if (this.props.todos.todos !== undefined) {
            this.setState({todos: this.props.todos.todos});
        }
    };


    componentWillReceiveProps = (nextProps) => {
        if (typeof (nextProps.todos) !== 'undefined') {
            if (this.state.todos !== nextProps.todos) {
                const sortAsc = _.orderBy(nextProps.todos.todos, ['urgency'], ['asc']);

                this.setState({todos: sortAsc});
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
    };

    handleRemoveTask = (_id) => {
        console.log("Remove Task");
        this.props.removeTask(_id);
    };

    handleShuffle = () => {
        this.setState({
            sortingMethod: 'shuffle',
            todos: _.shuffle(this.state.todos)
        });
    };

    handleUpdateTask = (_id, text, urgency, complete) => {
        console.log("Update Task");
        let updatedTodo = {
            "id": _id,
            "text": text,
            "isCompleted": complete,
            "urgency": parseInt(urgency)
        };
        this.props.updateTask(updatedTodo);
    };

    toggleSort = () => {
        const sortAsc = _.orderBy(this.state.todos, ['urgency'], ['asc']);
        const sortDesc = _.orderBy(this.state.todos, ['urgency'], ['desc']);

        this.setState({
            order: (this.state.order === 'asc' ? 'desc' : 'asc'),
            sortingMethod: 'chronological',
            todos: this.state.order === 'asc' ? sortDesc : sortAsc

        });
    };

    render() {

        let todosData = this.state.todos;

        return (
            <div className="g-row todopage">
                <header className="header">
                    <h1>Todo List</h1>
                </header>
                <div>
                    <Toggle
                        clickHandler={this.toggleSort}
                        text={this.state.order === 'asc' ? 'Ascending' : 'Descending'}
                        active={this.state.sortingMethod === 'chronological'}
                    />
                    <Toggle
                        clickHandler={this.handleShuffle}
                        text="Shuffle"
                        active={this.state.sortingMethod === 'shuffle'}
                    />

                </div>
                <div className="g-col todoapp">
                    <TodoList
                        active={this.state.active}
                        completed={this.state.completed}
                        todosData={todosData}
                        removeTask={this.handleRemoveTask}
                        updateTask={this.handleUpdateTask}
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
