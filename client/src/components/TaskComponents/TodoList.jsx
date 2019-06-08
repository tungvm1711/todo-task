import React from 'react';
import 'lodash';
import _ from 'lodash';
import TodoItem from './TodoItem';
import FlipMove from 'react-flip-move';


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

        let all = this.props.todosData;
        let active = _.filter(this.props.todosData, ['isCompleted', false]);
        let completed = _.filter(this.props.todosData, ['isCompleted', true]);
        let todosData = all;
        if (!this.props.active && !this.props.completed) todosData = all;
        else if (this.props.active) todosData = active;
        else if (this.props.completed) todosData = completed;
        return Object.keys(todosData).map((key, index) => {
            return (
                <TodoItem
                    id={todosData[key].id}
                    key={todosData[key].id}
                    removeTask={this.props.removeTask}
                    updateTask={this.props.updateTask}
                    text={todosData[key].text}
                    urgency={todosData[key].urgency}
                    isCompleted={todosData[key].isCompleted}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <section className="main">
                    <label
                        htmlFor="toggle-all"
                    />
                    <ul className="todo-list">
                        <FlipMove
                            staggerDurationBy="30"
                            duration={500}
                            enterAnimation={this.state.enterLeaveAnimation}
                            leaveAnimation={this.state.enterLeaveAnimation}
                        >
                        {this.renderList()}
                        </FlipMove>
                    </ul>
                </section>
            </div>
        );
    }
}

export default TodoList;
