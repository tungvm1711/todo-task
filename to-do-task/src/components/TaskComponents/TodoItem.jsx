import React from 'react';
import classNames from 'classnames';
import {Badge, Button} from 'react-foundation';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Done from '@material-ui/icons/Done';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {editing: false, urgency: this.props.urgency, text: this.props.text};
    }
    handleRemove = event => {
        this.props.removeTask(this.props.id);
    };

    toggleStatus = () => {
        const {id, text, urgency, isCompleted} = this.props;
        this.props.updateTask(id, text, urgency, !isCompleted);
    };
    handleEdit = () => {
        this.setState({editing: true});
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            this.handleSave(event);
        } else if (event.keyCode === 27) {
            this.stopEditing();
        }
    };


    handleSave = (event) => {
        if (this.state.editing) {
            const {id, text, urgency, isCompleted} = this.props;
            console.log(event);

            const newText = this.state.text.trim();
            if (newText.length && newText !== text) {
                this.props.updateTask(id, newText, urgency, isCompleted);
            }

            this.stopEditing();
        }
    };

    stopEditing = () => {
        this.setState({editing: false});
    };
    renderTitle = () => {
        return (
            <div className="task-item__title" tabIndex="0">
                {this.props.text}
            </div>
        );
    };
    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };
    renderTitleInput = () => {
        return (
            <div>
                <input
                    autoComplete="off"
                    autoFocus
                    className="task-item__input"
                    defaultValue={this.props.text}
                    maxLength="64"
                    onKeyUp={this.handleKeyUp}
                    type="text"
                    name='text'
                    onChange={this.handleChange}
                />
                <FormControl style={{display: 'flex'}}>
                    <InputLabel htmlFor="age-native-simple">Urgency</InputLabel>
                    <Select
                        native
                        name='urgency'
                        value={this.state.urgency}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </Select>
                </FormControl>
            </div>
        )
            ;
    };

    render() {

        let URGENCY = {
            1: 'primary',
            2: 'secondary',
            3: 'success',
            4: 'warning',
            5: 'alert'
        };
        let color = URGENCY[this.props.urgency];
        const {editing} = this.state;

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
                        onChange={this.toggleStatus}
                    />
                    <label onDoubleClick={this.handleEdit}>
                        {editing ? this.renderTitleInput() : this.renderTitle()}
                    </label>
                    <Badge className={classNames({'hide': editing})} color={color}>{this.props.urgency}</Badge>
                    <div className="edit-btn-group">
                        <Button
                            className={classNames('btn--icon', {'hide': editing})}
                            onClick={this.handleEdit}>
                            <Edit/>
                        </Button>
                        <Button
                            className={classNames('btn--icon', {'hide': !editing})}
                            onClick={this.handleSave}
                        >
                            <Done/>
                        </Button>
                        <Button
                            className={classNames('btn--icon', {'hide': !editing})}
                            onClick={this.stopEditing}>
                            <Close/>
                        </Button>
                        <Button
                            className={classNames('btn--icon', {'hide': editing})}
                            onClick={this.handleRemove}>
                            <Close/>
                        </Button>
                    </div>
                </div>
            </li>
        );
    }
}

export default TodoItem;