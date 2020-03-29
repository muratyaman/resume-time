import React from 'react';
import { TrainingHistoryItem } from './TrainingHistoryItem';

export function TrainingNode({ Training }) {
  const { History } = Training;
  return (
    <div className='training'>
      <h3>Training</h3>
      <div className='history'>
        {History.map((HistoryItem, idx) => (<TrainingHistoryItem key={idx} HistoryItem={HistoryItem} />))}
      </div>
    </div>
  )
}
