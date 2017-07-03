import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Represents each item in tasks to do collection
class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Here define how every todo item should look like.
    // You can use {this.props.name} to display name.
    // You can also use {this.props.isDone} to conditionally render some elements, like checkmark
    // You may also need to implement onClick function on checkmark to mark item as done/undone
    // For example:
    // { this.props.isDone ? <div className="todo_done"></div> : null}
    return (
      <div>
        <input type="checkbox" checked={this.props.isDone} onChange={() => this.props.onCompletenessChange(this.props.name)} />
        <input type="text" value={this.props.name} />
        <button onClick={() => this.props.deleteItem(this.props.name)}>x</button>
      </div>
    )
  }
}

// PropTypes define expected parameters passed down to component.
// These are only suggestions.
TodoItem.propTypes = {
  name: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  onCompletenessChange: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
};

export default TodoItem;
