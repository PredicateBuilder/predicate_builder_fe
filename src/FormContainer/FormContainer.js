import React, { Component } from 'react';
import FilterForm from '../FilterForm/FilterForm';
import './FormContainer.scss';


class FormContainer extends Component {
  constructor() {
    super()
    this.state = {
      filters: [{ predicate: 'user_email', operator: '=', customValue1: '', customValue2: 'null' }]
    };
  };

  updateFilter = (values, i) => {
    const newValues = this.state.filters.slice();
    newValues[i][values[0]] = values[1];
    this.setState({
      filters: newValues
    });
  };

  handleDeleteForm = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedFilters = this.state.filters.filter((filter, index) => index !== i);
    this.setState({
      filters: updatedFilters
    });
  };

  handleAddForm = (e) => {
    e.preventDefault();
    this.setState({
      filters: [...this.state.filters, {
        predicate: 'user_email',
        operator: '=',
        customValue: ''
      }]
    });
  };

  

  render() {
    const mapForms = this.state.filters.map((form, i) => {
      return (<FilterForm
        key={i}
        index={i}
        updateFilter={this.updateFilter}
        handleDeleteForm={this.handleDeleteForm}
        predicate={form.predicate}
        operator={form.operator}
        customValue1={form.customValue1}
        customValue2={form.customValue2}
        display={form.display}
      />);
    });
    return (
      <main>
        <section className='filter-section'>
          {mapForms}
          <button className='add-filter-form' onClick={this.handleAddForm}>AND</button>
        </section>
        <button className='search-btn'>SEARCH</button>
      </main>
    )  
  }
}

export default FormContainer;