import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
  AppBar,
  Divider,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthDispatch, logout, useAuthState } from '../Context';

const UserNameLabel = styled(Typography)({
  flexGrow: 1,
  textAlign: 'right'
});

const HeaderDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.grey[50],
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(2),
}));

const Header = ({history}) => {
  const dispatch = useAuthDispatch();
  const userDetails = useAuthState();

  const handleLogout = async () => {
    await logout(dispatch);
    history.push('/login');
  };

  return (
    <AppBar position="static" open>
      <Toolbar
        sx={{
          pr: '24px',
        }}
      >
        <UserNameLabel component="div">
          {userDetails.user.name}
        </UserNameLabel>
        <HeaderDivider orientation="vertical" variant="middle" flexItem />
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  history: PropTypes.object.isRequired
};

export default Header;