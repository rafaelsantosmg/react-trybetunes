import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
    if (response === 'OK') return this.setState({ redirect: true });
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
      <div data-testid="page-login">
        <form onSubmit={ handleRedirect }>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Usuário</span>
            <input
              data-testid="login-name-input"
              type="text"
              className="form-control"
              placeholder="Nome de Usuário"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={ onChangeInput }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </div>
        </form>
        { isLoading && <Loading /> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}
