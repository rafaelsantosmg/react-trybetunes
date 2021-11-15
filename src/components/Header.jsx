import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
    const { active } = this.props;
    return (
      isLoading ? (<Loading />) : (
        <header data-testid="header-component">
          <div>
            <h1 data-testid="header-user-name">{ user }</h1>
          </div>
          <nav>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link
                  className={ `nav-link ${active === 'search' && 'active'}` }
                  aria-current="page"
                  data-testid="link-to-search"
                  to="/search"
                >
                  Pesquisar
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={ `nav-link ${active === 'favorites' && 'active'}` }
                  data-testid="link-to-favorites"
                  to="/favorites"
                >
                  Favoritos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={ `nav-link ${active === 'profile' && 'active'}` }
                  data-testid="link-to-profile"
                  to="/profile"
                >
                  Perfil
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )
    );
  }
}

Header.propTypes = {
  active: propTypes.string.isRequired,
};
