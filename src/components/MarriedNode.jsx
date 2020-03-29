import React from 'react';

export function MarriedNode({ Married }) {
  return (
    <div className='married'>
      <label>Married:</label>
      <span>{Married}</span>
    </div>
  )
}