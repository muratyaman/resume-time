import React from 'react';
import { EducationIcon } from './Icons';
import { PlaceNode } from './PlaceNode';
import { ImageNode } from './ImageNode';

export function EducationHistoryItem({ HistoryItem }) {
  const { Org, Place, Start, End, Info, Topic, Type, Image, Degree } = HistoryItem;
  const endStr = End ? End : 'Present';
  return (
    <div className='history-item'>
      <div className='grad'><EducationIcon /></div>
      <div className='dates'>
        {Start && <div className='start'>{Start}</div>}
        {<div className='end'>{endStr}</div>}
      </div>
      {Org && <div className='org'>{Org}</div>}
      {Place && <PlaceNode Place={Place} />}
      {Type && <div className='type'>{Type}</div>}
      {Topic && <div className='topic'>{Topic}</div>}
      {Info && <p className='info'>{Info}</p>}
      {Image && <ImageNode Image={Image} width={64} />}
    </div>
  )
}
