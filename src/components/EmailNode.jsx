import React from 'react';

export function EmailNode({ Email }) {
  return (
    <div className='email'>
      <label>Email:</label>
      <a href={`mailto:${Email}`}>{Email}</a>
    </div>
  )
}
