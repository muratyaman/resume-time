import React from 'react';
import { LinkNode } from './LinkNode';

export function LinksNode({ Links }) {
  return (
    <>
      <ul className='links links-col-1'>
        {Links.filter(l => l.Email || l.Mobile || l.Phone).map((Link, idx) => (<li className='link' key={idx}><LinkNode Link={Link}/></li>))}
      </ul>
      <ul className='links links-col-2'>
        {Links.filter(l => l.Blog || l.LinkedIn || l.Github).map((Link, idx) => (<li className='link' key={idx}><LinkNode Link={Link}/></li>))}
      </ul>
    </>
  )
}
