import React, { Component, PropTypes }  from 'react';
import classNames                       from 'classnames';
import {Button, Icon, Colors} from 'react-foundation';

const Toggle = ({clickHandler, text, icon, active, large}) => {
    const buttonClass = classNames({
        'button-toggle': true,
        'no-icon': !icon,
        active,
        large,
    });
    const iconClass = `${icon}`;

    return (
        <Button className={buttonClass} onClick={clickHandler}>
            {text}
        </Button>
    );
};

export default Toggle;