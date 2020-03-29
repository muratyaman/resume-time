import React from 'react';

export function ExperienceHistoryItem({ HistoryItem }) {
  const { Org, Place, Periods, Start, End, Title, Info, Type, Tech, Projects, Tags } = HistoryItem;
  const TagsList = String(Tags).split(',').map(tag => String(tag).trim());
  return (
    <div className='history-item'>
      {Periods && (
        <div className='periods'>
          {Periods.map(({ Start, End }, idx) => (<span key={idx}>[{Start} - {End}]&nbsp;</span>))}
        </div>
      )}

      {!Periods && (
        <>
          {Start && <div className='start'>{Start}</div>}
          {<div className='end'>{End ? End : 'Present'}</div>}
        </>
      )}

      {Org && <div className='org'>{Org}</div>}
      {Place && <div className='place'>{Place}</div>}
      {Type && <div className='type'>Type: {Type}</div>}
      {Title && <div className='title'>Title: {Title}</div>}
      {Tech && <div className='tech'>Tech: {Tech}</div>}
      {Tags && <div className='tags'>Tags: {TagsList.map((Tag, idx) => (<label key={idx}>{Tag}</label>))}</div>}
      {Info && <p className='info'>{Info}</p>}

      {Projects && (
        <div className='projects'>
          <h4>Projects</h4>
          {Projects.map((Project, idx) => {
            const { Info, Tech } = Project;
            return (
              <div className='project' key={idx}>
                {Info && <h5 className='info'>{idx+1}. {Info}</h5>}
                {Tech && <div className='tech'>Tech: {Tech}</div>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
