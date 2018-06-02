import React, { Component } from 'react';

// Application Styles
import './assets/scss/main.scss';

// Store
import { connect } from 'react-redux';
import { verify } from './store/auth';

// Utilities
import classNames from 'classnames';

// Routing & Transitions
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Components
import Loading from './components/Loading';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

class App extends Component {
    getAppClassNames = () => {
        switch (this.props.appStatus) {
            case 'showing-loader':
            case 'is-loading':
                return 'app is-loading show-loader';

            case 'hiding-loader':
                return 'app is-loading hide-loader';

            default:
                return 'app';
        }
    };

    componentDidMount() {
        this.props.verify();
    }

    render() {
        const { isLoading, hasVerified, isAuthenticated } = this.props;

        return (
            <div className={this.getAppClassNames()}>
                {hasVerified && (
                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/" component={Dashboard} />
                    </Switch>
                )}
                <Loading className="app-loader" />
            </div>
        );
    }
}

export default withRouter(
    connect(state => ({ ...state.auth, appStatus: state.status.app }), {
        verify
    })(App)
);
