import React, { Component } from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      album: '',
      isDisabledSearch: true,
      isLoading: false,
      albumName: '',
      listAlbum: [],
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch(event) {
    event.preventDefault();
    const { album } = this.state;
    this.setState(({
      isLoading: true,
    }));
    const response = await searchAlbumsAPI(album);
    this.setState(({
      listAlbum: response,
      albumName: album,
      isLoading: false,
      album: '',
    }));
  }

  onChangeInput({ target }) {
    const { value } = target;
    const minLength = 2;
    this.setState(({
      album: value,
      isDisabledSearch: value.length < minLength,
    }
    ));
  }

  render() {
    const {
      state: {
        albumName,
        isDisabledSearch,
        isLoading,
        listAlbum,

      },
      onChangeInput,
      handleSearch,
    } = this;
    return (
      <div data-testid="page-search">
        <Header />
        { !isLoading && (
          <Form
            title="Album"
            inputId="search-artist-input"
            buttonId="search-artist-button"
            placeholder="Nome do artista"
            onSubmit={ handleSearch }
            isDisabled={ isDisabledSearch }
            onChangeInput={ onChangeInput }
          >
            Buscar
          </Form>
        ) }
        { isLoading && (<Loading />) }
        <p>
          Resultado de álbuns de:
          {' '}
          { albumName }
        </p>
        { listAlbum.map((album) => (
          <div key={ album.collectionId }>
            <p>{ album.artistName }</p>
            <p>{ album.collection }</p>
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
          </div>
        )) }
      </div>
    );
  }
}
