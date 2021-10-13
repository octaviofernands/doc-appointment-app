import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { initialState, AuthReducer, ConditionsReducer } from './reducer';

const useContextState = (baseContext, which, providerName) => {
  const context = React.useContext(baseContext);

  if (context === undefined) {
    throw new Error(`${which} must be used within a ${providerName}` );
  }

  return context;
};


// Auth
const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

export const useAuthState = () => useContextState(AuthStateContext, 'useAuthState', 'AuthProvider');
export const useAuthDispatch = () => useContextState(AuthDispatchContext, 'useAuthDispatch', 'AuthProvider');

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired
};

//Conditions
const ConditionsStateContext = React.createContext();
const ConditionsDispatchContext = React.createContext();

export const useConditionsState = () => useContextState(ConditionsStateContext, 'useConditionsState', 'ConditionsProvider');
export const useConditionsDispatch = () => useContextState(ConditionsDispatchContext, 'useConditionsDispatch', 'ConditionsProvider');

export const ConditionsProvider = ({ children }) => {
  const [conditions, dispatch] = useReducer(ConditionsReducer, initialState);

  return (
    <ConditionsStateContext.Provider value={conditions}>
      <ConditionsDispatchContext.Provider value={dispatch}>
        {children}
      </ConditionsDispatchContext.Provider>
    </ConditionsStateContext.Provider>
  );
};

ConditionsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired
};
