import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {signInWithGoogle, saveUserDataInFirebase} from './firebase/firebase.utils';
import {auth} from './firebase/firebase.utils';
import Home from './containers/Home/Home';
import User from './containers/User/User';
import Create from './containers/Create/Create';
import Fill from './containers/Fill/Fill';
import Edit from './containers/Edit/Edit';
import guestIcon from './assets/guest-icon.png';

class App extends React.Component {
    state = {
        currentUser: null
    }

    constructor() {
        super();
        this.unsubscribeFromAuth = null;
        this.templateArray = []
    }

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({currentUser: user});
            if (user) 
                saveUserDataInFirebase(user)
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/contract-drafting-tool" exact component={Home}/>
                <Redirect to="/contract-drafting-tool" component={Home}/>
            </Switch>
        )

        if (this.state.currentUser) {
            routes = (
                <Switch>
                    <Route path="/contract-drafting-tool" exact component={Home}/>
                    <Route path="/contract-drafting-tool/user/:uid" exact component={User}/>
                    <Route path="/contract-drafting-tool/user/:uid/create" component={Create}/>
                    <Route
                        path="/contract-drafting-tool/user/:uid/fill/:templateUid"
                        component={Fill}/>
                    <Route
                        path="/contract-drafting-tool/user/:uid/edit/:templateUid"
                        component={Edit}/>
                    <Redirect to="/contract-drafting-tool" component={Home}/>
                </Switch>
            )
        }

        return (
            <div className='user-info'>
                {this.state.currentUser
                    ? (
                        <div>
                            <Navbar
                                photo={this.state.currentUser.photoURL}
                                displayName={this.state.currentUser.displayName}
								uid={this.state.currentUser.uid}
                                auth={auth}/>
                        </div>
                    )
                    : <div>
                        <Navbar
                            photo={guestIcon}
                            displayName='Guest'
                            auth={auth}
                            signIn={signInWithGoogle}/>
                    </div>
				}
                {routes}
            </div >
        );
    }
}

export default withRouter(App);
