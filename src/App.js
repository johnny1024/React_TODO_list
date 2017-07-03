import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem.jsx';

// Root of our app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        counter: 0,
      filter: "all",
        selectAll: true,
      tasksList: [],
    };

    this.onCompletenessChange = this.onCompletenessChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem = (e) => {
      if(e.keyCode === 13 && e.target.value.length !== 0) {
          const taskText = e.target.value;

          let check = true;
          let count = this.state.counter;

          for(let i = this.state.tasksList.length - 1; i>=0; i--){
              if(this.state.tasksList[i].name === taskText) {
                  check = false;
                  break;
              }
          }

          if(check) {
              count += 1;
              let newArray = this.state.tasksList.slice();
              newArray.push({isDone: false, name: taskText});
              this.setState({tasksList: newArray, counter:count});
          }

          e.target.value = "";
      }
  }

  onCompletenessChange(name) {

      let count = this.state.counter;
      let tasks = this.state.tasksList;
      for (let task in tasks) {
          if(tasks[task].name === name) {
              tasks[task].isDone = !tasks[task].isDone;
              if(tasks[task].isDone){
                  count -= 1;
              }
              else{
                  count +=1;
              }
          }
      }
      this.setState({tasksList:tasks, counter:count})
    }

    deleteItem(name) {
      let count = this.state.counter;
      let tasks = this.state.tasksList;
        for (let task in tasks) {
            if (tasks[task].name === name) {
                if(!tasks[task].isDone) count -= 1;
                tasks.splice(parseInt(task), 1)
            }
        }
        this.setState({tasksList: tasks, counter:count});
    }

    clearList() {
        let tasks = this.state.tasksList;
        for(let i = tasks.length - 1; i>=0; i--){
            if(tasks[i].isDone === true){
                tasks.splice(i, 1);
            }
        }
        this.setState({tasksList: tasks});
    }

    selectAll(e) {
      let tasks = this.state.tasksList;
      let count = this.state.counter;
      for(let task in tasks) {
          tasks[task].isDone = this.state.selectAll;
          if (this.state.selectAll) {
              count = 0;
          }
          else {
              count = this.state.tasksList.length;
          }
      }

      this.setState({tasksList:tasks, selectAll:!this.state.selectAll, counter: count});
    }

    filtering(task) {
      if(this.state.filter === "all") {
          return true;
      }
      else if(task.isDone && this.state.filter === "done") {
          return true;
      }
      else if(!task.isDone && this.state.filter === "undone") {
          return true;
      }
      else {
          return false;
      }
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>To do list</h2>
        </div>
        <div>
          <div>
              <input type="checkbox" onChange={(e) => this.selectAll(e)} />
              <input type="text" onKeyUp={(e)=>this.addItem(e)} />
          </div>

          <div>
              {
                  this.state.tasksList
                      //.filter(task => (this.state.filter === "done" ? task.isDone : (this.state.show === "undone" ? !task.isDone : true)))
                      .filter((task) => {return this.filtering(task)})
                      .map(task => <TodoItem name={task.name} isDone={task.isDone} onCompletenessChange={this.onCompletenessChange} deleteItem={this.deleteItem} />)
              }
          </div>
            <button onClick={() => this.setState({filter: "all"})}>All</button>
            <button onClick={() => this.setState({filter: "done"})}>Done</button>
            <button onClick={() => this.setState({filter: "undone"})}>Active</button>
            <button onClick={() => this.clearList()}>Clear</button>

        </div>
        <div className="todo-list__undone-tasks-count">
          Left: { this.state.counter}
        </div>
      </div>
    );
  }
}

export default App;
