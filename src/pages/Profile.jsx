import React, { Component } from 'react';
import Header from '../components/Header';
import './Profile.css';

export default class Profile extends Component {
  render() {
    return (
      <div className="page-profile" data-testid="page-profile">
        <Header
          active="profile"
        />
      </div>
    );
  }
}
