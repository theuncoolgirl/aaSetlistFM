import React from 'react';
import { connect } from 'react-redux';
import { actions, thunks } from '../store/auth';
import { Redirect } from 'react-router-dom';
import { Button, FormControl, Grid, Input, InputLabel, Paper } from '@material-ui/core';
import useStyles from '../styles.js';

const LoginForm = (props) => {
    const classes = useStyles();

    if (props.token) {
        return <Redirect to="/" />;
    }
    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={6}>
                <Paper className={classes.authForm}>
                    <h2>Login</h2>
                    <form>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="email">Email:</InputLabel>
                                <Input id="email" placeholder="Email" value={props.email || ''} onChange={props.updateEmailValue} />
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formItem}>
                                <InputLabel htmlFor="password">Password:</InputLabel>
                                <Input id="password" type='password' placeholder="Password" value={props.password || ''} onChange={props.updatePasswordValue} />
                            </FormControl>
                        </div>
                        <div>
                            <Button className={classes.formItem} variant="contained" color="primary" onClick={props.tryLogin} >Submit</Button>
                            <Button className={classes.formItem} variant="contained" color="primary" onClick={props.popDemoUser} >Demo User</Button>
                            {/* TODO: Link to Sign Up Page */}
                        </div>
                    </form>
                </Paper>
            </Grid >
        </Grid >
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateEmailValue: e => dispatch(actions.updateEmailValue(e.target.value)),
        updatePasswordValue: e => dispatch(actions.updatePasswordValue(e.target.value)),
        tryLogin: () => dispatch(thunks.tryLogin()),
        popDemoUser: () => dispatch(actions.popDemoUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);