import { Button, Divider, Grid, Header, Icon, Segment } from 'semantic-ui-react';

export const DefaultContent = ({ history }) => {
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
