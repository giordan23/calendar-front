import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';
  
  import { LoginScreen } from '../components/auth/LoginScreen';
  import { CalendarScreen } from '../components/calendar/CalendarScreen';
  import { startChecking } from '../actions/auth';

export const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    const {checking, uid} = useSelector(state => state.auth);

    if (checking) {
        return (<h4> Espere... </h4>);
        }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact 
                        path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated={!!uid}
                    />      
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen } 
                        isAuthenticated={!!uid}
                    />

                    <Redirect to="/" />   
                </Switch>
            </div>
        </Router>
    )
}
