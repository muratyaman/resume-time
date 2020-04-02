import React from 'react';
import ProfileNode from '../../components/cv/ProfileNode';
import { IntroductionNode } from '../../components/cv/IntroductionNode';
import { EducationNode } from '../../components/cv/EducationNode';
import { ExperienceNode } from '../../components/cv/ExperienceNode';
import { AwardsNode } from '../../components/cv/AwardsNode';
import { TrainingNode } from '../../components/cv/TrainingNode';
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
