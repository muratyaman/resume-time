import { Component } from 'react';
import { Button, Checkbox, Form, Message, Segment } from 'semantic-ui-react';
import api from '../api';

export class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formProps: {
        loading: false,
        success: false,
        error: false,
      },
      submitDisabled: true,
      formData: {
        username: null,
        password: null,
        password_confirm: null,
        url: null,
      },
      successMessage: null,
      errorMessage: null,
    }
  }

  onChangeAgree = (ev, { checked }) => {
    this.setState({ submitDisabled: !checked });
  };

  onChangeFormData = (ev) => {
    console.info(ev, ev.target, ev.target.name, ev.target.value);
    const { name, value } = ev.target;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({ formData });
  };

  onSubmit = async (ev) => {
    const { history } = this.props;
    const formData = { ...this.state.formData };
    let formProps = { ...this.state.formProps };
    let successMessage = null, errorMessage = null;

    try {
      formProps.loading = true;
      formProps.success = false;
      formProps.error = false;
      this.setState({ formProps, successMessage, errorMessage });

      const response = await api.resumeCreate(formData);

      const { data, error } = response.data; // read response body
      formProps.loading = false;
      if (data) {
        formProps.success = true;
        successMessage = 'Thanks for registering! Please wait...';
      } else if (error) {
        formProps.error = true;
        errorMessage = error;
      }

    } catch (err) {
      formProps.loading = false;
      formProps.error = true;
      errorMessage = 'Unexpected error';
      console.error('onSubmit ERROR', err.message);
    }

    this.setState({ formProps, successMessage, errorMessage });
    if (formProps.success) {
      setTimeout(() => {
        history.push('/resume/' + formData.username);
      }, 2000);
    }
  };

  render() {
    const { formProps, submitDisabled, successMessage, errorMessage } = this.state;
    return (
      <Segment padded='very'>

        <Form {...formProps}>

          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' name='username' onChange={this.onChangeFormData} />
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' type='password' name='password' onChange={this.onChangeFormData} />
          </Form.Field>

          <Form.Field>
            <label>Confirm Password</label>
            <input placeholder='Password' type='password' name='password_confirm' onChange={this.onChangeFormData} />
          </Form.Field>

          <Form.Field>
            <label>URL of your resume (YAML file)</label>
            <input placeholder='URL' name='url' onChange={this.onChangeFormData} />
          </Form.Field>

          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' onChange={this.onChangeAgree}/>
          </Form.Field>

          {successMessage && <Message success header='Form Completed' content={successMessage} />}

          {errorMessage && <Message error header='Form Completed' content={errorMessage} />}

          <Button type='button' disabled={submitDisabled} onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Segment>
    );
  }
}
