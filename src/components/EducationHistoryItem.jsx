import React from 'react';

export function EducationHistoryItem({ HistoryItem }) {
  const { Org, Place, Start, End, Info, Topic, Type, Degree } = HistoryItem;
  return (
    <div className='history-item'>
      {Start && <div className='start'>{Start}</div>}
      {<div className='end'>{End ? End : 'Present'}</div>}
      {Org && <div className='org'>{Org}</div>}
      {Place && <div className='place'>{Place}</div>}
      {Type && <div className='type'>{Type}</div>}
      {Topic && <div className='topic'>{Topic}</div>}
      {Info && <p className='info'>{Info}</p>}
    </div>
  )
}
