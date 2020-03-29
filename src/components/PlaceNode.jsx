import React from 'react';
import { LabelledNode } from './LabelledNode';
import { PlaceIcon } from './Icons';

export const PlaceNode = ({ Place }) => (<LabelledNode className='place' label={<PlaceIcon />} content={Place} />);
