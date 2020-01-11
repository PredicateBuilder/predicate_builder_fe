import React, { Component } from 'react';
import FilterForm from '../FilterForm/FilterForm';
import './FormContainer.scss';


class FormContainer extends Component {
  constructor() {
    super()
    this.state = {
      filters: [{
        predicate: 'user_email',
        operator: '=',
        customValue1: '',
        customValue2: 'undefined'
      }],
      response: ''
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
        customValue1: '',
        customValue2: 'undefined'
      }]
    });
  };

  sendQuery = async () => {
    const options = JSON.stringify(this.state.filters);
    const res = await fetch(`http://localhost:3001/?filters=${options}`);
    const builtQuery = await res.json();
    this.setState({
      response: builtQuery
    })
  }

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
      />);
    });
    return (
      <main>
        <section className='filter-section'>
          {mapForms}
          <button className='add-filter-form' onClick={this.handleAddForm}>AND</button>
        </section>
        {this.state.response && <p>{this.state.response}</p>}
        <button className='search-btn' onClick={this.sendQuery}>SEARCH</button>
      </main>
    )  
  }
}

export default FormContainer;