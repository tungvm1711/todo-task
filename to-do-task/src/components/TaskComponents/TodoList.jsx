import React from 'react';
import TodoItem from './TodoItem';
import 'lodash';
import _ from 'lodash';
import {ClipLoader} from "react-spinners";

class TodoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            todosData: this.props.todosData,
            editing: null,
            newTodo: '',
        };
    }

    renderList() {
        if (this.props.todosData === undefined) {
            this.props.handleFetch();
            console.log(this.props.todosData);
            return (
                <div className='sweet-loading'>
                    <ClipLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#123abc'}
                        loading={this.props.todosData === undefined}
                    />
                </div>
            )
        }
        let all = this.props.todosData;
        let active = _.filter(this.props.todosData, ['isCompleted', false]);
        let completed = _.filter(this.props.todosData, ['isCompleted', true]);
        let todosData = all;

        if (!this.props.active && !this.props.completed) todosData = all;
        else if (this.props.active) todosData = active;
        else if (this.props.completed) todosData = completed;

        return Object.keys(todosData).map((key, index) => {
            return (
                <div>
                    <section className="main">
                        <label
                            htmlFor="toggle-all"
                        />
                        <ul className="todo-list">
                            <TodoItem
                                id={todosData[key].id}
                                key={todosData[key].id}
                                removeTask={this.props.removeTask}
                                text={todosData[key].text}
                                urgency={todosData[key].urgency}
                                isCompleted={todosData[key].isCompleted}
                            />
                        </ul>
                    </section>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <header className="header">
                    <h1>Todo List</h1>
                </header>
                {this.renderList()}
            </div>
        );
    }
}

export default TodoList;
