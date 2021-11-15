import React, { Component } from 'react';
import Header from '../components/Header';
import './Favorites.css';

export default class Favorites extends Component {
  render() {
    return (
      <div className="page-favorites" data-testid="page-favorites">
        <Header
          active="favorites"
        />
      </div>
    );
  }
}
