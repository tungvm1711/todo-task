import React, {Component} from 'react';
import {Button, Colors} from 'react-foundation';
import {Field, reduxForm} from 'redux-form';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



const newField = ({
                      input,
                      type,
                      placeholder,
                      id,
                      meta: { touched, error },
                      ...rest
                  }) => {
    return (
        <div>
            <input {...input} placeholder={placeholder} type={type} id={id} />
            {touched && error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};


const myValidator = values => {
    const errors = {};
    if (!values.urgency) {
        errors.urgency = 'Urgency is required';
    }
    if (!values.text) {
        errors.text = 'Hold on a minute, we need a task to do!';
    } else if (!/(.+)@(.+){2,}\.(.+){2,}/i.test(values.email)) {
        // use a more robust RegEx in real-life scenarios
        errors.email = 'Valid email please!';
    }
    return errors;
};

export class TaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAdding: false,
            isValid: false,
        };

    }

    handleClick = () => {
        this.setState({isAdding: true});
    };

    handleCancel = () => {
        const {reset} = this.props;
        this.setState({isAdding: false});
        reset();
    };

    onSubmit(values) {
        const {reset} = this.props;
        this.props.handleAddTodo(values.text, values.urgency, values.isCompleted);
/*        reset();
        this.setState({isAdding: false});*/
    };

    render() {
        const {handleSubmit, pristine, submitting} = this.props;

        return (
            <form
                name="add-form"
                className="add-form"
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') e.preventDefault();
                }
                }
            >
                {!this.state.isAdding &&
                <Button
                    onClick={this.handleClick}
                    className="add-btn"
                >
                    <Fab aria-label='Add' color='primary'>
                        <AddIcon/>
                    </Fab>
                </Button>
                }
                {this.state.isAdding &&
                <div>
                    <div>
                        <label>What do you want to do</label>
                        <div>
                            <Field
                                name="text"
                                type="text"
                                placeholder="Task"
                                validate={this.validate}
                                component={newField}
                            />

                        </div>
                    </div>
                    <div>
                        <label>Completed</label>
                        <div>
                            <label>
                                <Field
                                    name="isCompleted"
                                    component="input"
                                    type="radio"
                                    value='True'
                                />{' '}
                                Yes
                            </label>
                            <label>
                                <Field
                                    name="isCompleted"
                                    component="input"
                                    type="radio"
                                    value='False'
                                />{' '}
                                No
                            </label>
                        </div>
                    </div>
                    <div>
                        <label>Urgency Level</label>
                        <div>
                            <Field name="urgency" component="select" validate={this.validate}>
                                <option/>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Field>
                        </div>
                    </div>
                    <div className="buttonAddGroup">
                        <Button
                            type="submit"
                            className="submit-btn"
                            color={Colors.PRIMARY}
                            disabled={pristine || submitting}
                        >
                            Submit
                        </Button>
                        <Button
                            onClick={this.handleCancel}
                            className="add-form-cancel-btn"
                            color={Colors.SECONDARY}
                            disabled={submitting}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
                }
            </form>
        );
    }
}

export default reduxForm({
    validate: myValidator,
    form: 'AddNewForm',
})(TaskForm);
