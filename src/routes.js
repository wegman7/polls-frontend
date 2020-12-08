import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Posts from './posts/Posts';
import PostDetail from './posts/PostDetail';
import PostEdit from './posts/PostEdit';
import PostCreate from './posts/PostCreate';

const BaseRouter = (props) => (
    
    <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' render={(routeProps) => <Login {...props} {...routeProps} />} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/posts' render={(routeProps) => <Posts isAuthenticated={props.isAuthenticated} {...routeProps} />} />
        <Route exact path='/posts/detail/:postId' render={(routeProps) => <PostDetail isAuthenticated={props.isAuthenticated} user={props.user} {...routeProps} />} />
        <Route exact path='/posts/edit/:postId' component={PostEdit} />
        <Route path='/posts/create' component={PostCreate} />
    </div>
);

export default BaseRouter;
