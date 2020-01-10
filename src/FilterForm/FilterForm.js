import React { Component } from 'react';
import './FilterForm.scss';
import { Component } from 'react';

class FilterForm extends Component {
  constructor() {
    super()
    this.predicate = '';
    this.operator = '';
    this.customValue = '';
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
    </form>
  }
}

export default FilterForm;