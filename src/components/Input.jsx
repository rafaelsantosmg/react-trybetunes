import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Input extends Component {
  render() {
    const { id, onChangeInput } = this.props;
    return (
      <input
        data-testid={ id }
        type="text"
        className="form-control"
        placeholder="Nome de Usuário"
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={ onChangeInput }
      />
    );
  }
}

Input.propTypes = {
  id: propTypes.string,
  onChangeInput: propTypes.func,
};

Input.defaultProps = {
  id: '',
  onChangeInput: () => {},
};
