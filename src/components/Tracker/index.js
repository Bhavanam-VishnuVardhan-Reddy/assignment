import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiCloseCircleLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";

class Tracker extends Component {
  state = {
    text: "",
    trackersList: [{ id: uuidv4(), task: 'sample task', isChecked: false }]
  };

  onChangeText = (event) => {
    this.setState({
      text: event.target.value
    });
  };

  onClickButton = () => {
    const { text } = this.state;
    const taskDetails = {
      id: uuidv4(),
      task: text,
      isChecked: false
    };
    this.setState(prevState => ({
      trackersList: [...prevState.trackersList, taskDetails]
    }));
  };

  onClickCheck = (id) => {
    this.setState(prevState => ({
      trackersList: prevState.trackersList.map(each => {
        if (each.id === id) {
          return { ...each, isChecked: !each.isChecked };
        }
        return each;
      })
    }));
  };

  onDelete = (id) => {
    this.setState(prevState => ({
      trackersList: prevState.trackersList.filter(each => each.id !== id)
    }));
  };

  render() {
    const { text, trackersList } = this.state;
    return (
      <div>
        <div>
          <h1>Task Tracker</h1>
          <div>
            <input 
              type="text" 
              placeholder='Add a new task...' 
              value={text} 
              onChange={this.onChangeText} 
            />
            <button type="button" onClick={this.onClickButton}>Add Task</button>
          </div>
          <div>
            <ul>
              {
                trackersList.map(each => (
                  <li key={each.id}>
                    <button 
                      type="button" 
                      onClick={() => { this.onClickCheck(each.id) }}
                    >
                      {each.isChecked ? <IoMdCheckmarkCircleOutline /> : <RiCloseCircleLine />}
                    </button>
                    <p>{each.task}</p>
                    <button 
                      type="button" 
                      onClick={() => { this.onDelete(each.id) }}
                    >
                      <MdOutlineDelete />
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Tracker;
