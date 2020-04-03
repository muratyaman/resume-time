import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export const TopMenuBar = ({ sidebarVisible, onMenuClick }) => (
  <Menu inverted fixed='top'>
    <Menu.Item name='menu' active={sidebarVisible} onClick={onMenuClick}>
      <Icon name='bars' />
    </Menu.Item>
    <Menu.Item name='home'>
      <Icon name='history' /> Resume Time
    </Menu.Item>
  </Menu>
);
