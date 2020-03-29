import React from 'react';

export function LinkNode({ Link }) {
  const { Blog, LinkedIn, Github } = Link;
  return (
    <li className='link'>
      {Blog && (<><label>Blog:</label><a href={`http://${Blog}`}>{Blog}</a></>)}
      {LinkedIn && (<><label>LinkedIn:</label><a href={`http://${LinkedIn}`}>{LinkedIn}</a></>)}
      {Github && (<><label>Github:</label><a href={`http://${Github}`}>{Github}</a></>)}
    </li>
  )
}
