import React, { Component } from 'react';
import './FilterForm.scss';

class FilterForm extends Component {

  handleDropDownChange = (e) => {
    const { updateFilter, index } = this.props;
    let valueArr = (e.target.value.split(','));
    updateFilter(valueArr, index);
  };

  handleCustomFieldChange = (e) => {
    const { updateFilter, index } = this.props;
    const valueArr = [e.target.name, e.target.value];
    updateFilter(valueArr, index);
  }

  determineOperatorDropDown = () => {
    const { operator, predicate } = this.props;
    const strings = ['user_email', 'user_first_name', 'user_last_name', 'domain', 'path'];
    let operatorValue = ['operator', `${operator}`].join(',');
    if (strings.includes(predicate)) {
      return (
        <select className='select--operator' onChange={this.handleDropDownChange} value={operatorValue}>
          <option value={['operator', '=']}>equals</option>
          <option value={['operator', 'CONTAINS']}>contains</option>
          <option value={['operator', 'LIKE']}>starts with</option>
          <option value={['operator', 'IN']}>in list</option>
        </select>
      )
    } else {
      return (
        <select className='select-operator' onChange={this.handleDropDownChange} value={operatorValue}>
          <option value={['operator', '=']}>equals</option>
          <option value={['operator', 'BETWEEN']}>range</option>
          <option value={['operator', '>']}>greater than</option>
          <option value={['operator', '<']}>less than</option>
          <option value={['operator', 'IN']}>in list</option>
        </select>
      );
    };
  };

  determineCustomFields = () => {
    const { operator } = this.props;
    return operator === 'BETWEEN' ? <><input type='number' name='customValue1' onChange={this.handleCustomFieldChange} /> <p className='p--article'>AND</p> <input type='number' name='customValue2' onChange={this.handleCustomFieldChange} /> </> : <input type={this.determineInputType()} name='customValue1' onChange={this.handleCustomFieldChange}/>
  }

  determineInputType = () => {
    const { predicate } = this.props;
    const strings = ['user_email', 'user_first_name', 'user_last_name', 'domain', 'path'];
    return strings.includes(predicate) ? 'text' : 'number';
  }

  render() {
    const { operator, predicate, index, handleDeleteForm } = this.props;
    let operatorDropDown = this.determineOperatorDropDown();
    let predicateValue = ['predicate', `${predicate}`].join(',');
    let customFields = this.determineCustomFields();
    return (
      <form className='filter-form'>
        <button onClick={(e) => handleDeleteForm(e, index)}>-</button>
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