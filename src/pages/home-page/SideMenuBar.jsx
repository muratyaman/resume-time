import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

export const SideMenuBar = (props) => {
  return (
    <>
      <Menu.Item name='home'>
        <Link to='/'><Icon name='home' /> Home</Link>
      </Menu.Item>
      <Menu.Item name='signup'>
        <Link to='/register'><Icon name='signup' /> Register</Link>
      </Menu.Item>
      <Menu.Item name='user'>
        <Link to='/update'><Icon name='user' /> Update</Link>
      </Menu.Item>
    </>
  );
};

export default SideMenuBar;
