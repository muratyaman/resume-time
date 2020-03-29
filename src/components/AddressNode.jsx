import React from 'react';

export function AddressNode({ Address }) {
  return (
    <div className='address'>
      <label>Address:</label>
      <span>{Address}</span>
    </div>
  )
}