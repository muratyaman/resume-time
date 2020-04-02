import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import ResumeRenderer from '../components/ResumeRenderer';
import { TopMenuBar } from '../components/TopMenuBar';
import {
  getTagList,
  getTechList,
  getYearListFromExperience,
  filterResume,
  getYearListFromHistory,
  combineYears
} from '../helpers';

class ResumePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      resume: null,
      error: null,
      filters: {
        years: [],
        tags: [],
        techs: [],
        jobTypes: [],
      }
    }
  }

  getResume = async (fileParam) => {
    let loading = true, resume = null, error = null;
    this.setState({ loading, resume, error });
    try {
      const response = await fetch('/api/cv/' + fileParam);
      const body = await response.json();
      resume = body.data;
      loading = false;
    } catch (err) {
      error = err.message
    }
    this.setState({ loading, resume, error });
  };

  changeFilters = (key, value) => {
    let { filters } = { ...this.state };
    filters[key] = value;
    this.setState({ filters });
  };

  onYearChange = (ev, { value }) => {
    this.changeFilters('years', value);
  };

  onTagChange = (ev, { value }) => {
    this.changeFilters('tags', value);
  };

  onTechChange = (ev, { value }) => {
    this.changeFilters('techs', value);
  };

  onJobTypeChange = (ev, { value }) => {
    this.changeFilters('jobTypes', value);
  };

  componentDidMount() {
    const { match: { params: { file }}} = this.props;
    this.getResume(file); // fire/forget
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { match: { params: { file }}} = this.props;
    if (file && (file === prevProps.match.params.file)) return;
    this.getResume(file); // fire/forget
  }

  render() {
    const { loading, resume, error, filters } = this.state;
    let menuProps, resumeProps;

    if (resume) {
      const { Experience, Education, Training, Awards } = resume;
      const years1 = getYearListFromExperience(Experience);
      const years2 = getYearListFromHistory(Education.History);
      const years3 = getYearListFromHistory(Training.History);
      const years4 = getYearListFromHistory(Awards.History);
      const allYears = combineYears(years1, years2, years3, years4);
      const yearListOptions = allYears.map(year => ({
        key: year,
        text: year,
        value: year,
      }));
      const tagListOptions = getTagList(Experience).map(({ tag, count }) => ({
        key: tag,
        text: `${tag} (${count})`,
        value: tag,
      }));
      const techListOptions = getTechList(Experience).map(({ tech, count }) => ({
        key: tech,
        text: `${tech} (${count})`,
        value: tech,
      }));
      const jobTypeListOptions = [{
        key: 'Permanent',
        text: 'Permanent',
        value: 'Permanent',
      }]; // TODO: extract job types
      menuProps = {
        yearListOptions,
        onYearChange: this.onYearChange,
        tagListOptions,
        onTagChange: this.onTagChange,
        techListOptions,
        onTechChange: this.onTechChange,
        jobTypeListOptions,
        onJobTypeChange: this.onJobTypeChange,
      };

      resumeProps = { resume: filterResume(resume, filters) };
    }

    return (
      <>
        <DefaultLayout>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {resume && (<>
            <TopMenuBar {...menuProps} />
            <ResumeRenderer {...resumeProps} />
          </>)}
        </DefaultLayout>
      </>
    );
  }

}

export default ResumePage;
