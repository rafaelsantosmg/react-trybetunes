import React, { Component } from 'react';
import propTypes, { shape } from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        { musics.map((music, index) => (
          <div key={ `${music.artistId}${index}` }>
            <p>{ music.trackName }</p>
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
          </div>
        )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: propTypes.arrayOf(shape({
    previewUrl: propTypes.string,
  })).isRequired,
};
