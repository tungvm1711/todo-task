import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux'
import {alter, remove} from "../server/actions/session";
import LinkButton from "../components/LinkButton";
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

const mapDispatchToProps = dispatch => ({
    remove: () => dispatch(remove()),
    alter: () => dispatch(alter())
});
const mapStateToProps = state => {
    return {
        session: state.session,
        isAuth: state.session.isAuth
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {display: 'flex'},
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: 'inherit'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 0.9,
        display: 'inline-flex',
        marginRight: '10px',
        alignItems: 'center',
    },
    white: {
        color: 'inherit'
    }
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    const handleDeleteSession = useCallback(() => {
        props.deleteSession()
    });

    const [failureRate, setFailureRate] = useState('');

    const handleAlterSession = useCallback((e) => {
        setFailureRate(e.target.value);
        props.alterSession(failureRate);
    });

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                        <SvgIcon
                            className={classes.icon}
                            color="primary"
                            fontSize="large"
                            component={svgProps => (
                                <svg {...svgProps}>
                                    <defs>
                                        <linearGradient id="gradient1">
                                            <stop offset="30%" stopColor={blue[400]}/>
                                            <stop offset="70%" stopColor={red[400]}/>
                                        </linearGradient>
                                    </defs>
                                    {React.cloneElement(svgProps.children[0], {fill: 'url(#gradient1)'})}
                                </svg>
                            )}
                        >
                            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </SvgIcon>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        To do App
                    </Typography>
                    {props.isAuth ? <li className={classes.flex}>
                        <Typography className={classes.title}>
                            Hi {localStorage.getItem('SessionName')}
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={handleDeleteSession}
                        >Delete Session
                        </Button>
                        <FormControl color="inherit" className={classes.formControl}>
                            <InputLabel color="inherit" className={classes.white} htmlFor="failureRate-native-helper">Alter
                                Failure Rate</InputLabel>
                            <NativeSelect
                                color="inherit"
                                value={failureRate}
                                onChange={e => handleAlterSession(e)}
                                input={<Input name="failureRate" id="failureRate-native-helper"/>}
                            >
                                <option value=""/>
                                <option value={0}>0</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                                <option value={60}>60</option>
                                <option value={70}>70</option>
                                <option value={80}>80</option>
                                <option value={90}>90</option>
                                <option value={100}>100</option>
                            </NativeSelect>
                            <FormHelperText className={classes.white} color="inherit">Some important helper
                                text</FormHelperText>
                        </FormControl>

                    </li> : <LinkButton to='/new-session'>Create New Session</LinkButton>}

                </Toolbar>
            </AppBar>
        </div>
    );
}

class Header extends React.Component {

    handleDeleteSession = () => {
        this.props.remove();
    };
    handleAlterSession = () => {
        this.props.alter();
    };

    render() {
        return (
            <header className="header">
                <div className="g-row">
                    <div className="g-col">
                        <ButtonAppBar
                            deleteSession={this.handleDeleteSession}
                            alterSession={this.handleAlterSession}
                            isAuth={this.props.isAuth}/>
                    </div>
                </div>
            </header>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
