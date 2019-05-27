import React, {useCallback, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import EventNote from '@material-ui/icons/EventNote';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [name, setName] = useState('');
    const setSessionName = event =>
        setName({
            ...name,
            [event.target.name]: event.target.value
        });

    const handleClick = useCallback(() => {
        props.initSession(name);
    });
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EventNote/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create New Session
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        value={name}
                        required
                        fullWidth
                        label="Tell me your name"
                        name="name"
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                    <Button
                        fullWidth
                        onClick={handleClick}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Create new Session
                    </Button>
                </form>
            </div>
            <Box mt={5}>
            </Box>
        </Container>
    );
}