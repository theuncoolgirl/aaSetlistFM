import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { actions } from '../store/search';
import background from '../images/concert.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formItem: {
        padding: theme.spacing(2)
    },
    hero: {
        height: 350,
        backgroundImage: `url(${background})`
    }
}));

function Homepage(props) {
    const classes = useStyles();
    const searchQuery = encodeURIComponent(props.searchQuery);

    return (
        <div>
            <div className={classes.hero}></div>
            <h1>Homepage Component</h1>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="searchBar" label="Artist, Venue, Location..." variant="outlined" onChange={props.updateSearchValue} />
                <Button className={classes.formItem} variant="contained" color="primary" onClick={() => window.location.href = `/search/${searchQuery}/1`}>Search</Button>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        searchQuery: state.search.searchQuery,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        receiveSetlists: e => dispatch(actions.receiveSetlists(e.target.value)),
        updateSearchValue: e => dispatch(actions.updateSearchValue(e.target.value)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);