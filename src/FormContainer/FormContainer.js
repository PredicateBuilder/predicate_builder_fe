import React, { Component } from 'react';
import FilterForm from '../FilterForm/FilterForm';
import './FormContainer.scss';


class FormContainer extends Component {
  constructor() {
    super()
    this.filters = []
  }

  render() {
    <main>
      <FilterForm />
    </main>
  }
}

export default FormContainer;