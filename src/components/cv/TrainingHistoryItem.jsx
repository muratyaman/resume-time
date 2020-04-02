import React from 'react';
import { TrainingIcon } from '../Icons';
import { PlaceNode } from './PlaceNode';

export function TrainingHistoryItem({ HistoryItem }) {
  const { Org, Place, Date, Start, End, Topic } = HistoryItem;
  let dateStr = null;
  if (Date) dateStr = Date;
  if (Start) dateStr = Start + (End ? ' - ' + End : '');
  return (
    <div className='history-item'>
      <div className='dates'>
        <TrainingIcon />
        {dateStr && <div className='date'>{dateStr}</div>}
      </div>
      <div className='org-place'>
        {Org && <div className='org'>{Org}</div>}
        {Place && <PlaceNode Place={Place} />}
      </div>
      {Topic && <p className='topic'>{Topic}</p>}
    </div>
  )
}
