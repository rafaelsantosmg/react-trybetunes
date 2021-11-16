import React, { Component } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import './Profile.css';

export default class Profile extends Component {
  render() {
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header />
        <Menu active="profile" />
      </div>
    );
  }
}
