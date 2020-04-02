import React from 'react';
import ProfileNode from '../../components/cv/ProfileNode';
import { IntroductionNode } from '../../components/cv/IntroductionNode';
import { EducationNode } from '../../components/cv/EducationNode';
import { ExperienceNode } from '../../components/cv/ExperienceNode';
import { getTagList, getTechList, getYearList } from '../../helpers';
import { AwardsNode } from '../../components/cv/AwardsNode';
import { TrainingNode } from '../../components/cv/TrainingNode';
import { TopMenuBar } from '../../components/TopMenuBar';
import './default.scss';

function DefaultTemplate({ resume }) {
  const { Profile, Introduction, Education, Awards, Training, Experience } = resume;
  const yearListOptions = getYearList(Experience).map(year => ({ key: year, text: year, value: year }));
  const tagListOptions = getTagList(Experience).map(({ tag, count }) => ({ key: tag, text: `${tag} (${count})`, value: tag }));
  const techListOptions = getTechList(Experience).map(({ tech, count }) => ({ key: tech, text: `${tech} (${count})`, value: tech }));
  const menuProps = { yearListOptions, tagListOptions, techListOptions };
  return (
    <div className='template template-default'>
      <TopMenuBar {...menuProps} />
      {Profile && <ProfileNode Profile={Profile} />}
      {Introduction && <IntroductionNode Introduction={Introduction} />}
      {Education && <EducationNode Education={Education} />}
      {Experience && <ExperienceNode Experience={Experience} />}
      {Awards && <AwardsNode Awards={Awards} />}
      {Training && <TrainingNode Training={Training} />}
    </div>
  );
}

export default DefaultTemplate;
