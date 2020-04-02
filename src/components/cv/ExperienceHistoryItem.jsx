import React from 'react';
import { PlaceNode } from './PlaceNode';

export function ExperienceHistoryItem({ HistoryItem }) {
  const { Org, Formerly, Place, Periods, Start, End = 'Present', Title, Info, Type, Tech, Projects, Tags } = HistoryItem;
  const TagsList = String(Tags).split(',').map(tag => String(tag).trim());
  return (
    <div className='history-item'>
      {Periods && (
        <div className='periods'>
          {Periods.map(({ Start, End = 'Present' }, idx) => (<span key={idx}>[{Start} - {End}]&nbsp;</span>))}
        </div>
      )}

      {!Periods && (
        <div className='dates'>
          {Start && <div className='start'>{Start}</div>}
          {<div className='end'>{End}</div>}
        </div>
      )}

      <div className='org-place'>
        {Org && <div className='org'>{Org}</div>}
        {Formerly && <div className='org formerly'>(Formerly: {Formerly})</div>}
        {Place && <PlaceNode Place={Place} />}
      </div>

      {Title && <div className='title'>{Title}</div>}
      {Type && <div className='type'>{Type}</div>}

      {Tech && <div className='tech'><label>Tech:</label> <span>{Tech}</span></div>}

      {Tags && <div className='tags'><label>Tags:</label> {TagsList.map((Tag, idx) => (<span key={idx}>{Tag}</span>))}</div>}

      <div className='info-projects'>
        {Info && <p className='info'>{Info}</p>}
        {Projects && (
          <div className='projects'>
            <h4>Projects</h4>
            {Projects.map((Project, idx) => {
              const { Info, Tech } = Project;
              return (
                <div className='project' key={idx}>
                  {Info && <h5 className='info'>{idx+1}. {Info}</h5>}
                  {Tech && <div className='tech'><label>Tech:</label> <span>{Tech}</span></div>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
