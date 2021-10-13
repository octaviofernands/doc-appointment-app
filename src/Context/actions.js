import { loginService, getConditionsService } from './services';

export const login = async (dispatch, payload) => {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    const data = await loginService(payload);
    if(data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem(
        process.env.REACT_APP_LOCAL_STORAGE_KEY,
        JSON.stringify(data)
      );

      return data;
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
    console.log(error);
  }
};

export const logout = async (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
};

export const getConditions = async (dispatch, state) => {
  try {
    dispatch({ type: 'GET_CONDITIONS' });
    const data = await getConditionsService(state);

    if(data) {
      dispatch({ type: 'GET_CONDITIONS_SUCCESS', payload: data });
      localStorage.setItem(
        `${process.env.REACT_APP_LOCAL_STORAGE_KEY}_CONDITIONS`,
        JSON.stringify(data)
      );

      return data;
    }

    dispatch({ type: 'GET_CONDITIONS_ERROR', error: data.error });
    return;
  } catch (error) {
    dispatch({ type: 'GET_CONDITIONS_ERROR', error: error });
    console.log(error);
  }
};