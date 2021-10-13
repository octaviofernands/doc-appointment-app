const buildRequestOptions = (method = 'GET', options = {}, accessToken) => {
  const requestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if(options.auth) {
    requestOptions.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  if(options.body) {
    requestOptions.body = JSON.stringify(options.body);
  }

  return requestOptions;
};

const handleErrors = (response) => {
  if(response.status !== 200) {
    localStorage.clear();
    window.location.href = '/login';
    return;
  }
};

export const loginService = async (body) => {
  const options = buildRequestOptions('POST', {body});
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, options);
  const data = await response.json();

  return data;
};

export const getConditionsService = async (token) => {
  const options = buildRequestOptions('GET', {auth: true}, token);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/condition`, options);
  handleErrors(response);
  const {data} = await response.json();
  return data;
};

export const getNextCaseService = async (token) => {
  const options = buildRequestOptions('GET', {auth: true}, token);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/case/rate`, options);
  handleErrors(response);
  const {data} = await response.json();
  return data;
};

export const rateCaseService = async (caseId, conditionId, token) => {
  const body = {condition: conditionId};
  const options = buildRequestOptions('POST', {auth: true, body}, token);
  const response = await fetch(`${process.env.REACT_APP_API_URL}/case/rate/${caseId}`, options);
  handleErrors(response);
  const {data} = await response.json();
  return data;
};