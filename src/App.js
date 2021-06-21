import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MyFavoriteBooks from './MyFavoriteBooks';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Login';
import Logout from './components/Logout';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {
  render() {
    console.log('app', this.props);
    const {isAuthenticated} = this.props.auth0;
    return(
      <>
        <Router>
            <Header />
              <Switch>
                <Route exact path="/">
                  { isAuthenticated ? <MyFavoriteBooks /> : <Login />}
                </Route>
                <Route  exact path="/profile">
                  { isAuthenticated &&
                   <Profile />
                   }
                </Route>
                <Route exact path="/Login">
                  <Login />
                </Route>
                <Route exact path="/Logout">
                  <Logout />
                </Route>
                
              </Switch>
            <Footer />
        </Router>
      </>
    )
  }
}
export default withAuth0(App);
