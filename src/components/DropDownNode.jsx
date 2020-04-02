import { Dropdown } from 'semantic-ui-react';
import React from 'react';

export const DropDownNode = ({ placeholder, options }) => (
  <Dropdown placeholder={placeholder} fluid multiple selection options={options}/>);
