import React from 'react';

export function ChildrenNode({ Children }) {
  return (
    <div className='children'>
      <label>Children:</label>
      <span>{Children}</span>
    </div>
  )
}