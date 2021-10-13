import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthState } from '../Context';

const AppRoute = ({ component: Component, path, isPrivate, ...otherProps }) => {
  const auth = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !auth.token ? (
          <Redirect to={{ pathname: '/login' }} />
        ) : (
          <Component {...props} />
        )
      }
      {...otherProps}
    />
  );
};

AppRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  path: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired
};


export default AppRoute;