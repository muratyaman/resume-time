import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import { DropDownNode } from '../../components/DropDownNode';

export const SideMenuBar = (props) => {
  const { yearListOptions, onYearChange, tagListOptions, onTagChange, techListOptions, onTechChange,
    jobTypeListOptions, onJobTypeChange, orgListOptions, onOrgChange, placeListOptions, onPlaceChange } = props;
  return (
    <>
      <Menu.Item name='filters'>
        <Icon name='filter' /> Filters
      </Menu.Item>
      <Menu.Item name='years'>
        <Icon name='calendar' /> Years
        <DropDownNode placeholder='Years ...' options={yearListOptions} onChange={onYearChange} />
      </Menu.Item>
      <Menu.Item name='tags'>
        <Icon name='tags' /> Tags
        <DropDownNode placeholder='Tags ...' options={tagListOptions} onChange={onTagChange} />
      </Menu.Item>
      <Menu.Item name='tech'>
        <Icon name='computer' /> Tech
        <DropDownNode placeholder='Tech ...' options={techListOptions} onChange={onTechChange} />
      </Menu.Item>
      <Menu.Item name='job-type'>
        <Icon name='briefcase' /> Job types
        <DropDownNode placeholder='Job type ...' options={jobTypeListOptions} onChange={onJobTypeChange} />
      </Menu.Item>
      <Menu.Item name='orgs'>
        <Icon name='building' /> Organisations
        <DropDownNode placeholder='Organisations ...' options={orgListOptions} onChange={onOrgChange} />
      </Menu.Item>
      <Menu.Item name='places'>
        <Icon name='map marker alternate' /> Places
        <DropDownNode placeholder='Places ...' options={placeListOptions} onChange={onPlaceChange} />
      </Menu.Item>
    </>
  );
};

export default SideMenuBar;