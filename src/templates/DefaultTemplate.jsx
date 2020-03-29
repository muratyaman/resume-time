import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import './default.scss';
import ProfileNode from '../components/ProfileNode';
import { IntroductionNode } from '../components/IntroductionNode';
import { EducationNode } from '../components/EducationNode';
import { ExperienceNode } from '../components/ExperienceNode';
import { getTagList, getTechList, getYearList } from '../helpers';
import { AwardsNode } from '../components/AwardsNode';
import { TrainingNode } from '../components/TrainingNode';

const DropDownNode = ({ placeholder, options }) => (<Dropdown placeholder={placeholder} fluid multiple selection options={options} />);

function DefaultTemplate({ resume }) {
  const { Profile, Introduction, Education, Awards, Training, Experience } = resume;
  const yearListOptions = getYearList(Experience).map(year => ({ key: year, text: year, value: year }));
  const tagListOptions = getTagList(Experience).map(({ tag, count }) => ({ key: tag, text: `${tag} (${count})`, value: tag }));
  const techListOptions = getTechList(Experience).map(({ tech, count }) => ({ key: tech, text: `${tech} (${count})`, value: tech }));;
  return (
    <div className='template template-default'>
      <Menu inverted fixed='top' >
        <Menu.Item name='home'>
          Resume Time
        </Menu.Item>
        <Menu.Item name='years'>
          <DropDownNode placeholder='Years' options={yearListOptions} />
        </Menu.Item>
        <Menu.Item name='tags'>
          <DropDownNode placeholder='Tags' options={tagListOptions} />
        </Menu.Item>
        <Menu.Item name='tech'>
          <DropDownNode placeholder='Tech' options={techListOptions} />
        </Menu.Item>
      </Menu>
      <div className='toolbox'>
        {/*
        <div className='year-list'>Years: {yearList.map((year, idx) => (<label key={idx}>{year}</label>))}</div>
        <div className='tag-list'>Tags: {tagList.map(({ tag, count }, idx) => (<span><label key={idx}>{tag}<i className='badge'>{count}</i></label>&nbsp;</span>))}</div>
        <div className='tech-list'>Tech: {techList.map(({ tech, count}, idx) => (<span><label key={idx}>{tech}<i className='badge'>{count}</i></label>&nbsp;</span>))}</div>
        */}
        <br />
        <br />
        <br />
      </div>
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
