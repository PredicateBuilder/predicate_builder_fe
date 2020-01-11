import React, { Component } from 'react';
import './FilterForm.scss';

class FilterForm extends Component {

  handleChange = (e) => {
    const { updateFilter, index } = this.props;
    let valueArr = (e.target.value.split(','));
    updateFilter(valueArr, index);
  };

  determineOperatorDropDown = () => {
    const strings = ['user_email', 'user_first_name', 'user_last_name', 'domain', 'path'];
    let operatorValue = ['operator', `${this.props.operator}`].join(',')

    if (strings.includes(this.props.predicate)) {
      return (
        <select onChange={this.handleChange} value={operatorValue}>
          <option value={['operator', '=']}>equals</option>
          <option value={['operator','CONTAINS']}>contains</option>
          <option value={['operator','LIKE']}>starts with</option>
          <option value={['operator','IN']}>in list</option>
        </select>
      )
    } else {
      return (
        <select onChange={this.handleChange} value={operatorValue}>
          <option value={['operator', '=']}>equals</option>
          <option value={['operator', 'BETWEEN']}>range</option>
          <option value={['operator', '>']}>greater than</option>
          <option value={['operator', '<']}>less than</option>
          <option value={['operator', 'IN']}>in list</option>
        </select>
      )
    }
  }

  render() {
    let operator = this.determineOperatorDropDown();
    let predicateValue = ['predicate', `${this.props.predicate}`].join(',') 
    return (
      <form>
        <button onClick={(e) => this.props.handleDeleteForm(e, this.props.index)}>-</button>
        <select onChange={this.handleChange} value={predicateValue}>
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
        {operator}
      </form>
    );
  };
};

export default FilterForm;