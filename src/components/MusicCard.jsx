import React, { Component } from 'react';
import propTypes, { shape } from 'prop-types';
import Checkbox from './Checkbox';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
    };
    this.handleSaveFavorites = this.handleSaveFavorites.bind(this);
  }

  async handleSaveFavorites({ target }) {
    const { music } = this.props;
    const { checked } = target;
    this.setState({ isLoading: true }, async () => {
      if (checked) {
        await addSong(music);
        this.setState({
          isChecked: true,
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: false,
          isChecked: false,
        });
      }
    });
  }

  render() {
    const { music } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      isLoading ? (<Loading />) : (
        <div className="music-card">
          <div className="music-track">
            <p>{ music.trackName }</p>
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <Checkbox
              id={ music.trackId }
              dataId={ `checkbox-music-${music.trackId}` }
              onChange={ this.handleSaveFavorites }
              isChecked={ isChecked }
            />
          </div>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.arrayOf(shape({
    previewUrl: propTypes.string,
  })).isRequired,
};
