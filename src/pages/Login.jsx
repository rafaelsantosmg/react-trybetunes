import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Form from '../components/Form';
import Loading from '../components/Loading';
import './Login.css';
import logo from '../images/img_login.svg';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: '',
      },
      isDisabled: true,
      isLoading: false,
      redirect: false,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  async handleRedirect(event) {
    event.preventDefault();
    this.setState(({ isLoading: true }));
    const { user } = this.state;
    const response = await createUser(user);
    if (response === 'OK') return this.setState({ redirect: true, isLoading: false });
  }

  onChangeInput({ target }) {
    const { value } = target;
    const minLength = 3;
    this.setState(({
      user: {
        name: value,
      },
      isDisabled: value.length < minLength,
    }
    ));
  }

  render() {
    const {
      state: {
        isDisabled,
        isLoading,
        redirect,
      },
      onChangeInput,
      handleRedirect,
    } = this;

    return (
      isLoading ? (<Loading />) : (
        <div className="login-page" data-testid="page-login">
          <figure>
            <img src={ logo } alt="Logo TrybeTunes" />
          </figure>
          <Form
            inputId="login-name-input"
            buttonId="login-submit-button"
            onSubmit={ handleRedirect }
            isDisabled={ isDisabled }
            onChangeInput={ onChangeInput }
          />
          { redirect && (<Redirect to="/search" />) }
        </div>
      )
    );
  }
}
