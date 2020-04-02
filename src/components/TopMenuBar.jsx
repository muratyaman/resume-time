import { Menu } from 'semantic-ui-react';
import { DropDownNode } from './DropDownNode';
import React from 'react';

export const TopMenuBar = ({ yearListOptions, tagListOptions, techListOptions }) => (
  <Menu inverted fixed='top'>
    <Menu.Item name='home'>
      Resume Time
    </Menu.Item>
    <Menu.Item name='years'>
      <DropDownNode placeholder='Years' options={yearListOptions} />
    </Menu.Item>
    <Menu.Item name='tags'>
      <DropDownNode placeholder='Tags' options={tagListOptions} />
    </Menu.Item>
    <Menu.Item name='tech'>
      <DropDownNode placeholder='Tech' options={techListOptions} />
    </Menu.Item>
  </Menu>
);
