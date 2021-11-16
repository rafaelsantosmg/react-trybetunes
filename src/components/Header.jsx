import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';
import logoHeader from '../images/group-1.svg';
import avatar from '../images/icon/default.png';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  async handleUser() {
    this.setState(({ isLoading: true }));
    const { name } = await getUser();
    this.setState(({ user: name, isLoading: false }));
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      isLoading ? (<Loading />) : (
        <header className="header" data-testid="header-component">
          <figure className="header-figure">
            <img
              className="header-image"
              src={ logoHeader }
              alt="Logo Header"
            />
          </figure>
          <div className="user-name">
            <figure>
              <img src={ avatar } alt="Avatar" />
            </figure>
            <h2 data-testid="header-user-name">{ user }</h2>
          </div>
        </header>
      )
    );
  }
}
