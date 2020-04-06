import React from 'react';
import { NationalityIcon } from '../Icons';

export function NationalityNode({ Nationality }) {
  const text = Array.isArray(Nationality) ? Nationality.join(', ') : String(Nationality);
  return (
    <div className='nationality'>
      <label><NationalityIcon /></label>
      <span>{text}</span>
    </div>
  )
}