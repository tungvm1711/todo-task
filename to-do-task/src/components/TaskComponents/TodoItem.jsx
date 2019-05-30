import React from 'react';
import classNames from 'classnames';
import { Badge, Colors } from 'react-foundation';

class TodoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {editText: this.props.text};
    }

    handleEdit = event => {
        /*
                this.props.onEdit();
        */
        this.setState({editText: this.props.text});
    };

    handleRemove = event => {
        this.props.removeTask(this.props.id);
    };

    handleChange = event => {
        if (this.props.editing) {
            this.setState({editText: event.target.value});
        }
    };
    handleSubmit = event => {
        /*        let val = this.state.editText.trim();
                if (val) {
                    this.props.onSave(val);
                    this.setState({editText: val});
                } else {
                    this.props.onDestroy();
                }*/
    };

    render() {
        const {removeTask} = this.props;
        console.log(this.props);

        let URGENCY = {
            1 : 'primary',
            2: 'secondary',
            3 : 'success',
            4 : 'warning',
            5 : 'alert'
        };
        let color = URGENCY[this.props.urgency];
        return (
            <li className={classNames({
                isCompleted: this.props.isCompleted,
                editing: this.props.editing
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={this.props.isCompleted}
                        onChange={this.props.onToggle}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {this.props.text}
                    </label>
                    <Badge color={color}>{this.props.urgency}</Badge>

                    <button className="destroy" onClick={this.handleRemove}
                    ></button>
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                />
            </li>
        );
    }
}

export default TodoItem;