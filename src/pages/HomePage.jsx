import { Component } from 'react';
import { Outlet } from 'react-router-dom';

import { DefaultLayout } from '../layout/DefaultLayout';
import { SideMenuBar } from './home-page/SideMenuBar';
import { TopMenuBar } from './home-page/TopMenuBar';

export class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
    };
  }

  onMenuClick = () => {
    //console.log('onMenuClick');
    const { sidebarVisible } = this.state;
    this.setState({ sidebarVisible: !sidebarVisible });
  };

  hideSidebar = () => {
    //console.log('hideSidebar');
    this.setState({ sidebarVisible: false });
  };

  render() {
    const { sidebarVisible } = this.state;
    const sidebarProps = {};
    const topbarProps = {
      sidebarVisible,
      onMenuClick: this.onMenuClick,
    };
    const layoutProps = {
      sidebarVisible,
      sidebarWidth: 'thin',
      hideSidebar: this.hideSidebar,
      sidebar: (<SideMenuBar {...sidebarProps} />),
      header: (<TopMenuBar {...topbarProps} />),
    };
    return (
      <>
        <DefaultLayout {...layoutProps} >
          <br />
          <br />

          <Outlet />

        </DefaultLayout>
      </>
    );
  }
}
