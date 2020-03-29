import React from 'react';
import { LinkNode } from './LinkNode';

export function LinksNode({ Links }) {
  return (
    <ul className='links'>
      {Links.map((Link, idx) => (<LinkNode key={idx} Link={Link}/>))}
    </ul>
  )
}
