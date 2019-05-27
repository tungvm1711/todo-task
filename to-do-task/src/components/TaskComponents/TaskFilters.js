import React from 'react';
import {NavLink} from 'react-router-dom';


const TaskFilters = ({filter}) => (
    <ul className="task-filters">
        <li><NavLink isActive={() => !filter} to="/">View All</NavLink></li>
        <li><NavLink isActive={() => filter === 'active'}
                     to={{pathname: '/', search: '?filter=active'}}>Active</NavLink></li>
        <li><NavLink isActive={() => filter === 'completed'}
                     to={{pathname: '/', search: '?filter=completed'}}>Completed</NavLink></li>
    </ul>
);


export default TaskFilters;
