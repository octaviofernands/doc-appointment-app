const sessionPayload = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY)
  ? JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_KEY))
  : '';

const conditionsStorageKey = `${process.env.REACT_APP_LOCAL_STORAGE_KEY}_CONDITIONS`;
const conditionsPayload = localStorage.getItem(conditionsStorageKey)
  ? JSON.parse(localStorage.getItem(conditionsStorageKey))
  : null;

export const initialState = {
  user: sessionPayload.user || null,
  token: sessionPayload.accessToken || null,
  conditions: conditionsPayload || [],
  loading: false,
  errorMessage: null
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
  case 'REQUEST_LOGIN':
    return {
      ...initialState,
      loading: true
    };
  case 'LOGIN_SUCCESS':
    return {
      ...initialState,
      user: action.payload.user,
      token: action.payload.accessToken,
      loading: false
    };
  case 'LOGOUT':
    return {
      ...initialState,
      user: '',
      token: ''
    };

  case 'LOGIN_ERROR':
    return {
      ...initialState,
      loading: false,
      errorMessage: action.error
    };

  default:
    throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const ConditionsReducer = (initialState, action) => {
  switch (action.type) {
  case 'GET_CONDITIONS':
    return {
      ...initialState,
      loading: true
    };

  case 'GET_CONDITIONS_SUCCESS':
    return {
      ...initialState,
      conditions: action.payload,
      loading: false
    };

  case 'GET_CONDITIONS_ERROR':
    return {
      ...initialState,
      errorMessage: action.error,
      loading: false
    };

  default:
    throw new Error(`Unhandled action type: ${action.type}`);
  }
};