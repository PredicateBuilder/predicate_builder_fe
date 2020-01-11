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

  //This method allows me to update the filters within state at the appropriate index
  updateFilter = (values, i) => {
    //This variable provides an immutable copy that I can directly manipulate
    const newValues = this.state.filters.slice();
    //Here I manipulate the copy with the new values
    newValues[i][values[0]] = values[1];
    //This if statement is used to reassign customValue2 is the operator is changed from a range to anything else
    if (newValues[i].operator !== 'BETWEEN') {
      newValues[i].customValue2 = 'undefined';
    }
    //Here I set state with the newly modified copy
    this.setState({
      filters: newValues
    });
  };

  //This method allows me to remove a filterForm at the appropriate index
  handleDeleteForm = (e, i) => {
    //Used to stop hard refresh of the page upon button push
    e.preventDefault();
    //This was used because I was getting odd behavior that I attributed to the bubbling phase
    e.stopPropagation();
    //This provides a copy of the current state without the form that is being deleted
    const updatedFilters = this.state.filters.filter((filter, index) => index !== i);
    //This updates state with the mutated array
    this.setState({
      filters: updatedFilters
    });
  };

  //This method handles rendering an additional FilterForm below the last one
  handleAddForm = (e) => {
    //Used to stop hard refresh of the page upon button push
    e.preventDefault();
    //This spreads in the previous state along with a new set of default values added to the end
    this.setState({
      filters: [...this.state.filters, {
        predicate: 'user_email',
        operator: '=',
        customValue1: '',
        customValue2: 'undefined'
      }]
    });
  };

  //This method sends the query to my endpoint
  sendQuery = async () => {
    //This stringifies the filters within state so that they may be passed via query string
    const options = JSON.stringify(this.state.filters);
    //This sends the request with the stringified state interpolated onto the end
    const res = await fetch(`http://localhost:3001/?filters=${options}`);
    //This parses the response into readable format
    const builtQuery = await res.json();
    //This sets the response to state
    this.setState({
      response: builtQuery
    })
  }

  render() {
    //This provides a variable to render that maps through the filters within my state and renders each
    const mapForms = this.state.filters.map((form, i) => {
      return (<FilterForm
        //Passing props
        key={i}
        //How I track which form to manipulate
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
      <main className='main'>
        <section className='filter-section'>
          {/* renders each form that is returned by mapForms*/}
          {mapForms}
          <button className='add-filter-form' onClick={this.handleAddForm}>AND</button>
        {/* conditionally renders a response if it exists in state */}
        {this.state.response && <p>{this.state.response}</p>}
        </section>
        <button className='search-btn' onClick={this.sendQuery}>Search</button>
      </main>
    )  
  }
}

export default FormContainer;