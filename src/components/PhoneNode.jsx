import React from 'react';

export function PhoneNode({ Phone }) {
  return (
    <div className='phone'>
      <label>Phone:</label>
      <span>{Phone}</span>
    </div>
  )
}