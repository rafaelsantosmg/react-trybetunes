import React, { Component } from 'react';
import propTypes from 'prop-types';
import Input from './Input';
import Button from './Button';

export default class Form extends Component {
  render() {
    const { isDisabled, onChangeInput, onSubmit, inputId, buttonId } = this.props;
    return (
      <form onSubmit={ onSubmit }>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Usuário</span>
          <Input
            data-testid={ inputId }
            onChangeInput={ onChangeInput }
          />
          <Button
            id={ buttonId }
            isDisabled={ isDisabled }
          >
            Entrar
          </Button>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  onChangeInput: propTypes.func.isRequired,
  isDisabled: propTypes.bool.isRequired,
  onSubmit: propTypes.func.isRequired,
  inputId: propTypes.string.isRequired,
  buttonId: propTypes.string.isRequired,
};
