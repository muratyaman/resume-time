import { Menu } from 'semantic-ui-react';
import { DropDownNode } from './DropDownNode';
import React from 'react';

export const TopMenuBar = ({ yearListOptions, onYearChange, tagListOptions, onTagChange, techListOptions, onTechChange,
                             jobTypeListOptions, onJobTypeChange }) => (
  <Menu inverted fixed='top'>
    <Menu.Item name='home'>
      Resume Time
    </Menu.Item>
    <Menu.Item name='years'>
      <DropDownNode placeholder='Years ...' options={yearListOptions} onChange={onYearChange} />
    </Menu.Item>
    <Menu.Item name='tags'>
      <DropDownNode placeholder='Tags ...' options={tagListOptions} onChange={onTagChange} />
    </Menu.Item>
    <Menu.Item name='tech'>
      <DropDownNode placeholder='Tech ...' options={techListOptions} onChange={onTechChange} />
    </Menu.Item>
    <Menu.Item name='job-type'>
      <DropDownNode placeholder='Job type ...' options={jobTypeListOptions} onChange={onJobTypeChange} />
    </Menu.Item>
  </Menu>
);
