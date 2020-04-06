import React from 'react';
import { EducationHistoryItem } from './EducationHistoryItem';

export function EducationNode({ Education }) {
  const { History } = Education;
  return (
    <div className='education'>
      <h3>Education</h3>
      <div className='history'>
        {History.map((HistoryItem, idx) => (<EducationHistoryItem key={idx} HistoryItem={HistoryItem} />))}
      </div>
    </div>
  )
}
