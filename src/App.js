import React from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider, ConditionsProvider } from './Context';
import Routes from './Routes';
import AppRoute from './Components/AppRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <ConditionsProvider>
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                {Routes.map((route) => (
                  <AppRoute
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    isPrivate={route.isPrivate}
                  />
                ))}
              </Switch>
            </Router>
          </ThemeProvider>
        </ConditionsProvider>
      </AuthProvider>
    </>
  );
};

export default App;
