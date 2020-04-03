import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { DropDownNode } from './DropDownNode';

export const SideMenuBar = (props) => {
  const { yearListOptions, onYearChange, tagListOptions, onTagChange, techListOptions, onTechChange,
    jobTypeListOptions, onJobTypeChange } = props;
  //  <Menu inverted fixed='top' vertical>
  return (
    <>
      <Menu.Item name='filters'>
        <Icon name='filter' /> Filters
      </Menu.Item>
      <Menu.Item name='years'>
        <DropDownNode placeholder='Years ...' options={yearListOptions} onChange={onYearChange} selection compact />
      </Menu.Item>
      <Menu.Item name='tags'>
        <DropDownNode placeholder='Tags ...' options={tagListOptions} onChange={onTagChange} selection compact />
      </Menu.Item>
      <Menu.Item name='tech'>
        <DropDownNode placeholder='Tech ...' options={techListOptions} onChange={onTechChange} selection compact />
      </Menu.Item>
      <Menu.Item name='job-type'>
        <DropDownNode placeholder='Job type ...' options={jobTypeListOptions} onChange={onJobTypeChange} selection compact />
      </Menu.Item>
    </>
  );
  //</Menu>
};
