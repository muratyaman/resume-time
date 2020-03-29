import React from 'react';
import { AwardIcon } from './Icons';
import { PlaceNode } from './PlaceNode';

export function AwardsHistoryItem({ HistoryItem }) {
  const { Org, Place, Date, Dates, Start, End, Info } = HistoryItem;
  let dateStr = null;
  if (Date) dateStr = Date;
  if (Dates) dateStr = Dates.join(', ');
  if (Start) dateStr = Start + (End ? ' - ' + End : '');
  return (
    <div className='history-item'>
      <div className='dates'>
        <AwardIcon />
        {dateStr && <div className='date'>{dateStr}</div>}
      </div>
      <div className='org-place'>
        {Org && <div className='org'>{Org}</div>}
        {Place && <PlaceNode Place={Place} />}
      </div>
      {Info && <p className='info'>{Info}</p>}
    </div>
  )
}
