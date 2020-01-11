import React, { Component } from 'react';
import './FilterForm.scss';

class FilterForm extends Component {

  //This method is designed to send action up to the form container to register a change in either <select> element
  handleDropDownChange = (e) => {
    //Deconstructs the props to pull out the updateFilter method and the index the the rendered form lives at within the filters array in FormContainer's state
    const { updateFilter, index } = this.props;
    //Creates an array from the string that is assigned in the targets value
    //Index 0 is the key to be updated, and index 1 is the updated value
    let valueArr = (e.target.value.split(','));
    updateFilter(valueArr, index);
  };

  //This method is designed to send action up to the form container to register a change in any of the input elements
  handleCustomFieldChange = (e) => {
    //Deconstruction like above
    const { updateFilter, index } = this.props;
    //Formats the data so that the updateFilter method can be reused here
    //...name is the key to be updated, ...value is the new value
    const valueArr = [e.target.name, e.target.value];
    updateFilter(valueArr, index);
  }

  //Method designed to conditionally render the appropriate operator dropdown based on the currently selected predicate
  determineOperatorDropDown = () => {
    //Deconstruct
    const { operator, predicate } = this.props;
    //Provides a list of values to check against
    const strings = ['user_email', 'user_first_name', 'user_last_name', 'domain', 'path'];
    //Creates a variable that stores the current value to be displayed during changes in render
    let operatorValue = ['operator', `${operator}`].join(',');
    if (strings.includes(predicate)) {
      //this select options renders if the currently selected predicate stores string values
      return (
        <select className='select--operator' onChange={this.handleDropDownChange} value={operatorValue}>
          <option value={['operator', '=']}>equals</option>
          <option value={['operator', 'CONTAINS']}>contains</option>
          <option value={['operator', 'LIKE']}>starts with</option>
          <option value={['operator', 'IN']}>in list</option>
        </select>
      )
    } else {
      //this select options renders if the currently selected predicate stores integer values
      return (
        <select className='select--operator' onChange={this.handleDropDownChange} value={operatorValue}>
          <option value={['operator', '=']}>equals</option>
          <option value={['operator', 'BETWEEN']}>range</option>
          <option value={['operator', '>']}>greater than</option>
          <option value={['operator', '<']}>less than</option>
          <option value={['operator', 'IN']}>in list</option>
        </select>
      );
    };
  };

  //This method allows me to conditionally render text/number inputs based up on operator being used
  determineCustomFields = () => {
    //Deconstruction
    const { operator } = this.props;
    return operator === 'BETWEEN' ?
      //This return is used when there is a range to be input
      <>
        <input className='range-input' type='number' name='customValue1' onChange={this.handleCustomFieldChange} />
        <p className='p--article'>AND</p>
        <input className='range-input' type='number' name='customValue2' onChange={this.handleCustomFieldChange} />
      </> :
      //This return is used when only a single input is needed
      <input className='single-input' type={this.determineInputType()} name='customValue1' onChange={this.handleCustomFieldChange} />
  }

  //This method determines which type to assign input based upon the currently selected predicate
  determineInputType = () => {
    //Deconstruction
    const { predicate } = this.props;
    //Variable provides a data set to check against
    const strings = ['user_email', 'user_first_name', 'user_last_name', 'domain', 'path'];
    //Ternary returns based on if the currently selected predicate stores strings or integers
    return strings.includes(predicate) ? 'text' : 'number';
  }

  render() {
    //Deconstruction
    const { operator, predicate, index, handleDeleteForm } = this.props;
    //Provides a variable to render without calling the method within the return value
    let operatorDropDown = this.determineOperatorDropDown();
    //Provides a way to store the currently selected predicate in case of re-renders
    let predicateValue = ['predicate', `${predicate}`].join(',');
        //Provides a variable to render without calling the method within the return value
    let customFields = this.determineCustomFields();
    return (
      <form className='filter-form'>
        <button className='delete-form-btn' onClick={(e) => handleDeleteForm(e, index)}>-</button>
        <select className='select--predicate' onChange={this.handleDropDownChange} value={predicateValue}>
          <option value={['predicate', 'user_email']}>User Email</option>
          <option value={['predicate', 'screen_width']}>Screen Width</option>
          <option value={['predicate', 'screen_height']}>Screen Height</option>
          <option value={['predicate', 'visits']}># of Visits</option>
          <option value={['predicate', 'user_first_name']}>First Name</option>
          <option value={['predicate', 'user_last_name']}>Last Name</option>
          <option value={['predicate', 'page_response']}>Page Response Time (ms)</option>
          <option value={['predicate', 'domain']}>Domain</option>
          <option value={['predicate', 'path']}>Page Path</option>
        </select>
        {operator === 'BETWEEN' && <p className='p--article'>IS</p>}
        {operatorDropDown}
        {customFields}
      </form>
    );
  };
};

export default FilterForm;