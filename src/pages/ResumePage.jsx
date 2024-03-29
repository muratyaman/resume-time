import { Component } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import ResumeRenderer from '../components/ResumeRenderer';
import { TopMenuBar } from './resume-page/TopMenuBar';
import { SideMenuBar } from './resume-page/SideMenuBar';
import { extractOptions, filterResume } from '../helpers';
import api from '../api';

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

export class ResumePage extends Component {

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

  getResume = async (username) => {
    let loading = true, resume = null, error = null, filteredResume = null, options = {};
    this.setState({ loading, resume, error, filteredResume });
    try {
      const response = await api.resumeRetrieveFile(username);
      const { data } = await response.data; // read response body
      resume = data;
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
    const { match: { params: { username }}} = this.props;
    this.getResume(username); // fire/forget
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { match: { params: { username }}} = this.props;
    if (username && (username === prevProps.match.params.username)) return;
    this.getResume(username); // fire/forget
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
                           header={<TopMenuBar sidebarVisible={sidebarVisible} onMenuClick={this.onMenuClick} />}
            >
              <ResumeRenderer {...resumeProps} />
            </DefaultLayout>
          </>)}
      </>
    );
  }

}
