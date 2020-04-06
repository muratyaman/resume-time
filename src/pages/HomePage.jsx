import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import DefaultLayout from '../layout/DefaultLayout';
import { SideMenuBar } from './home-page/SideMenuBar';
import { TopMenuBar } from './home-page/TopMenuBar';
import RegisterPage from './RegisterPage';
import UpdatePage from './UpdatePage';

const DefaultContent = ({ history }) => {
  return (
    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical>Or</Divider>

        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header icon>
              <Icon name='signup' />
              Register your CV
            </Header>
            <Button primary onClick={() => history.push('/register')}>Register</Button>
          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon name='user' />
              Update your details
            </Header>
            <Button secondary onClick={() => history.push('/update')}>Update</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

class HomePage extends Component {

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
    const { history } = this.props;
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

          <Switch>
            <Route path='/register' component={RegisterPage} />
            <Route path='/update' component={UpdatePage} />
            <Route path='/' render={() => <DefaultContent history={history} /> }/>
            <Route path='*' render={() => <DefaultContent history={history} /> }/>
          </Switch>

        </DefaultLayout>
      </>
    );
  }
}

export default HomePage;
