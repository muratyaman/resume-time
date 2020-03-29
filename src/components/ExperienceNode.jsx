import React from 'react';
import { ExperienceHistoryItem } from './ExperienceHistoryItem';

export function ExperienceNode({ Experience }) {
  return (
    <div className='experience'>
      <h3>Experience</h3>
      {Experience.map(
        (ExperienceItem, idx) => {
          const { Section, History } = ExperienceItem;
          return (
            <div className='section' key={idx}>
              {Section && <h4>{Section}</h4>}
              <div className='history'>
                {History.map((HistoryItem, idx) => (<ExperienceHistoryItem key={idx} HistoryItem={HistoryItem} />))}
              </div>
            </div>
          )
        }
      )}
    </div>
  )
}
