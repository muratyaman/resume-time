import React from 'react';

export function NationalityNode({ Nationality }) {
  const text = Array.isArray(Nationality) ? Nationality.join(', ') : String(Nationality);
  return (
    <div className='nationality'>
      <label>Nationality:</label>
      <span>{text}</span>
    </div>
  )
}