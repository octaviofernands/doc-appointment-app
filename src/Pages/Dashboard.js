/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
  Box,
  Paper,
  Typography,
  Select,
  Button
} from '@mui/material';
import {
  getConditions,
  useAuthState,
  useConditionsState,
  useConditionsDispatch
} from '../Context';
import {
  getNextCaseService,
  rateCaseService
} from '../Context/services';
import Header from '../Components/Header';

const DashboardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: theme.palette.grey[100],
}));

const DashboardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  padding: theme.spacing(2)
}));

const CaseDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '60%',
  paddingRight: theme.spacing(4)
}));

const CaseText = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(2),
  whiteSpace: 'pre-line',
  height: `calc(100% - ${theme.spacing(2)})`,
}));

const ConditionWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const ConditionSelect = styled(Select)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width:'100%',
  height: '100%',
  '& select': {
    height: '100% !important'
  },
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const Dashboard = ({ history }) => {
  const [condition, setCondition] = useState([]);
  const [currentCase, setCurrentCase] = useState(null);
  const dispatch = useConditionsDispatch();
  const conditionsState = useConditionsState();
  const auth = useAuthState();

  const getNextCase = async () => {
    const nextCase = await getNextCaseService(auth.token);
    setCurrentCase(nextCase);
  };

  useEffect(() => {
    getConditions(dispatch, auth.token);
  }, [auth.token]);

  const handleConditionChange = (e) => {
    setCondition([e.target.value]);
  };

  const handleRateCase = async () => {
    await rateCaseService(currentCase._id, condition[0], auth.token);
    setCondition([]);
    await getNextCase();
  };

  useEffect(() => {
    getNextCase();
  }, []);

  return (
    <DashboardWrapper>
      <Header history={history} />
      <DashboardContent>
        <CaseDisplay>
          <Typography component="h3">
            Please Review This Case:
          </Typography>
          <CaseText>
            {currentCase && currentCase._id ? currentCase.description : 'You are Done'}
          </CaseText>
        </CaseDisplay>
        <ConditionWrapper>
          <Typography component="h3">
            Select Condition:
          </Typography>
          <ConditionSelect
            multiple
            native
            value={condition}
            // @ts-ignore Typings are not considering `native`
            onChange={handleConditionChange}
            label="Native"
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {conditionsState.conditions.map((item) => (
              <option key={item._id} value={item._id}>
                {item.codeICD10} - {item.description}
              </option>
            ))}
          </ConditionSelect>
          <Box>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                !currentCase
                || !currentCase._id
                ||conditionsState.loading
                || !condition.length
              }
              onClick={handleRateCase}
            >
                Next Case
            </Button>
          </Box>
        </ConditionWrapper>
      </DashboardContent>
    </DashboardWrapper>
  );
};

Dashboard.propTypes = {
  history: PropTypes.object.isRequired
};

export default Dashboard;