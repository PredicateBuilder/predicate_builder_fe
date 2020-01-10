import React, { Component } from 'react';
import './FilterForm.scss';
import { Component } from 'react';

class FilterForm extends Component {
  constructor() {
    super()
    this.predicate = '';
    this.operator = '';
    this.customValue = '';
  }

  determineOperatorDropDown = () => {
    const strings = ['user_email', 'user_first_name', 'user_last_name', 'domain', 'path'];
    const integers = ['screen_width', 'screen_height', 'visits', 'page_response'];
    if (strings.includes(this.predicate)) {
      return (
        <select>
          <option value='EQUAL'>equals</option>
          <option value='CONTAINS'>contains</option>
          <option value='LIKE'>starts with</option>
          <option value='IN'>in list</option>
        </select>
      )
    } else {
      return (
        <select>
          <option value='='>equals</option>
          <option value='BETWEEN'>range</option>
          <option value='>'>greater than</option>
          <option value='<'>less than</option>
          <option value='IN'>in list</option>
        </select>
      )
    }
  }

  render() {
    <form>
      <button>-</button>
      <select>
        <option value='user_email'>User Email</option>
        <option value='screen_width'>Screen Width</option>
        <option value='screen_height'>Screen Height</option>
        <option value='visits'># of Visits</option>
        <option value='user_first_name'>First Name</option>
        <option value='user_last_name'>Last Name</option>
        <option value='page_response'>Page Response Time (ms)</option>
        <option value='domain'>Domain</option>
        <option value='path'>Page Path</option>
      </select>
      {this.determineOperatorDropDown()}
    </form>
  }
}

export default FilterForm;