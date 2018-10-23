import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './containers/login/LoginContainer';
import Dashboard from './containers/dashboard/DashboardContainer';
import Terminal from './containers/terminal/TerminalContainer';
import Ratings from './containers/ratings/Ratings';
import Orders from './containers/orders/Orders';
import Profile from './containers/profile/ProfileContainer';
import Leaderboard from './containers/leaderboard/Leaderboard';
import Hashlog from './containers/hashlog/Hashlog';
import ActionList from './containers/hashlog/ActionList';
import './MainContent.css';
import { Col } from 'reactstrap';

class MainContent extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {loggedIn, profile} = this.props;
    return (<Col xs="12" md>
      <Switch>
        <LoginRoute exact path="/login" loggedIn={loggedIn}/>
        <ProtectedRoute exact path="/dashboard" component={Dashboard} loggedIn={loggedIn}/>
        <ProtectedRoute exact path="/terminal" component={Terminal} loggedIn={loggedIn}/>
        <ProtectedRoute exact path="/orders" component={Orders} loggedIn={loggedIn}/>
        <Route exact path="/rating" component={Ratings} loggedIn={loggedIn}/>
        <Route exact path="/hashlog" component={Hashlog} loggedIn={loggedIn}/>
        <Route exact path="/hashlog/actions/" component={ActionList} loggedIn={loggedIn}/>
        <Redirect exact from="/ratings" to="/leaderboard"/>
        <Route exact path="/leaderboard" component={Leaderboard}/>
        <Redirect exact from="/profile" to={loggedIn ? `/${profile.name}` : '/login'}/>
        <Route exact path="/:id" component={Profile}/>
        <Redirect from="/" to="/profile"/>
      </Switch>
    </Col>
    );
  }
}

const LoginRoute = ({ loggedIn, ...props }) => {
  if(loggedIn) {
    return (<Redirect to="/profile" />);
  } else {
    return (<Route  {...props} component={Login} />);
  }
};

const ProtectedRoute = ({ component, loggedIn, ...props }) => {
  if(!loggedIn) {
    return (<Redirect to="/login" />);
  } else {
    return (<Route {...props} component={component} />);
  }
};

export default MainContent;
