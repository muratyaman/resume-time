import React from 'react';
import ProfileNode from '../../components/resume/ProfileNode';
import { IntroductionNode } from '../../components/resume/IntroductionNode';
import { EducationNode } from '../../components/resume/EducationNode';
import { ExperienceNode } from '../../components/resume/ExperienceNode';
import { AwardsNode } from '../../components/resume/AwardsNode';
import { TrainingNode } from '../../components/resume/TrainingNode';
import './default.scss';

function DefaultTemplate({ resume }) {
  const { Profile, Introduction, Education, Awards, Training, Experience } = resume;
  return (
    <div className='template template-default'>
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
