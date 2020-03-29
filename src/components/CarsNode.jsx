import React from 'react';

export function CarsNode({ Cars }) {
  return (
    <div className='cars'>
      <label>Cars:</label>
      <span>{Cars}</span>
    </div>
  )
}