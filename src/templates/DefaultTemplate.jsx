import React from 'react';
import './default.scss';
import ProfileNode from '../components/ProfileNode';
import { IntroductionNode } from '../components/IntroductionNode';
import { EducationNode } from '../components/EducationNode';
import { ExperienceNode } from '../components/ExperienceNode';

function extractYear(str, pattern) {
  let result = null;
  if (str) {
    const found = String(str).match(pattern);
    if (found) {
      result = found[1];
    }
  }
  return result;
}

function getYearList (Experience) {
  const yearList = {}; // unique year list
  const pattern = /([0-9]{4})$/; // 'YYYY'
  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      const { Start, End } = historyItem;
      const year1 = extractYear(Start, pattern);
      if (year1) yearList[year1] = year1;
      const year2 = End ? new Date().getFullYear() : extractYear(End, pattern);
      if (year2) yearList[year2] = year1;
    });
  });
  return Object.keys(yearList).sort();
}

function getTagList (Experience) {
  const tagList = {}; // unique tag list
  Experience.forEach(experienceItem => {
    experienceItem.History.forEach(historyItem => {
      const { Tags } = historyItem;
      if (Tags) {
        const tagArr = String(Tags).split(',').map(t => String(t).trim());
        tagArr.forEach(tag => tagList[tag] = tag);
      }
    });
  });
  return Object.keys(tagList).sort((a, b) => String(a).toLowerCase() < String(b).toLowerCase());
}

function DefaultTemplate({ resume }) {
  const { Profile, Introduction, Education, Awards, Training, Experience } = resume;
  const yearList = getYearList(Experience);
  const tagList = getTagList(Experience);
  return (
    <div className='template template-default'>
      <div className='toolbox'>
        <div>Toolbox</div>
        <div>all </div>
        <div className='year-list'>Years: {yearList.map((year, idx) => (<label key={idx}>{year}</label>))}</div>
        <div className='tag-list'>Tags: {tagList.map((tag, idx) => (<span><label key={idx}>{tag}</label>&nbsp;</span>))}</div>
      </div>
      {Profile && <ProfileNode Profile={Profile} />}
      {Introduction && <IntroductionNode Introduction={Introduction} />}
      {Education && <EducationNode Education={Education} />}
      {Experience && <ExperienceNode Experience={Experience} />}
    </div>
  );
}

export default DefaultTemplate;
