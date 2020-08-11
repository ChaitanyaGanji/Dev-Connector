import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Store';
import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import './App.css';
import { loadUser } from './actions/auth';

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Route path='/' exact component={Landing} />
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <Route path='/profiles' exact component={Profiles} />
          <Route path='/profile/:id' exact component={Profile} />
          <PrivateRoute path='/dashboard' exact component={Dashboard} />
          <PrivateRoute
            path='/create-profile'
            exact
            component={CreateProfile}
          />
          <PrivateRoute path='/edit-profile' exact component={EditProfile} />
          <PrivateRoute
            path='/add-experience'
            exact
            component={AddExperience}
          />
          <PrivateRoute path='/add-education' exact component={AddEducation} />
          <PrivateRoute path='/posts' exact component={Posts} />
          <PrivateRoute path='/posts/:id' exact component={Post} />
        </Switch>
      </Router>
    </Provider>
  );
};
export default App;
