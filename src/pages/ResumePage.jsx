import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import ResumeRenderer from '../components/ResumeRenderer';
import { TopMenuBar } from '../components/TopMenuBar';
import { extractOptions, filterResume } from '../helpers';
import { SideMenuBar } from '../components/SideMenuBar';

const defaultFilters = {
  years: [],
  tags: [],
  techs: [],
  jobTypes: [],
  orgs: [],
  places: [],
};

const defaultOptions = {
  yearListOptions: [],
  tagListOptions: [],
  techListOptions: [],
  jobTypeListOptions: [],
  orgListOptions: [],
  placeListOptions: [],
};

class ResumePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      resume: null,
      filteredResume: null,
      error: null,
      filters: defaultFilters,
      options: defaultOptions,
      sidebarVisible: false,
    };
  }

  getResume = async (fileParam) => {
    let loading = true, resume = null, error = null, filteredResume = null, options = {};
    this.setState({ loading, resume, error, filteredResume });
    try {
      const response = await fetch('/api/cv/' + fileParam);
      const body = await response.json();
      resume = body.data;
      filteredResume = resume;
      options = extractOptions(resume);
      loading = false;
    } catch (err) {
      error = err.message
    }
    this.setState({ loading, resume, error, filteredResume, options });
  };

  changeFilters = (key, value) => {
    let { resume, filters } = { ...this.state };
    filters[key] = value;
    const filteredResume = filterResume(resume, filters);
    this.setState({ filters, filteredResume });
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

  onOrgChange = (ev, { value }) => {
    this.changeFilters('orgs', value);
  };

  onPlaceChange = (ev, { value }) => {
    this.changeFilters('places', value);
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

  onMenuClick = () => {
    //console.log('onMenuClick');
    const { sidebarVisible } = this.state;
    this.setState({ sidebarVisible: !sidebarVisible });
  };

  showSidebar = () => {
    //console.log('showSidebar');
    this.setState({ sidebarVisible: true });
  };

  hideSidebar = () => {
    //console.log('hideSidebar');
    this.setState({ sidebarVisible: false });
  };

  render() {
    const { loading, resume, error, filteredResume, options, sidebarVisible } = this.state;
    let sidebarProps, resumeProps;

    if (resume) {
      const { yearListOptions, tagListOptions, techListOptions, jobTypeListOptions, orgListOptions, placeListOptions } = options;
      sidebarProps = {
        yearListOptions,
        onYearChange: this.onYearChange,
        tagListOptions,
        onTagChange: this.onTagChange,
        techListOptions,
        onTechChange: this.onTechChange,
        jobTypeListOptions,
        onJobTypeChange: this.onJobTypeChange,
        orgListOptions,
        onOrgChange: this.onOrgChange,
        placeListOptions,
        onPlaceChange: this.onPlaceChange,
      };
      resumeProps = { resume: filteredResume };
    }

    return (
      <>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {resume && (<>
            <DefaultLayout sidebar={<SideMenuBar {...sidebarProps} />}
                           sidebarVisible={sidebarVisible}
                           hideSidebar={this.hideSidebar}
                           header={<TopMenuBar sidebarVisible={sidebarVisible} onMenuClick={this.onMenuClick} />}>
              <ResumeRenderer {...resumeProps} />
            </DefaultLayout>
          </>)}
      </>
    );
  }

}

export default ResumePage;
