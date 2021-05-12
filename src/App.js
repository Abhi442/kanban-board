import './App.scss';
import React from 'react';
import List from './components/List';
import { Button } from '@material-ui/core';
import ListForm from './components/ListForm';

// to set the data in session storage
export const setSessionData = (name, data) => {
  sessionStorage.setItem(name, JSON.stringify(data));
}

// to get the data from session storage
export const getSession = (name) => {
  const task = sessionStorage.getItem(name);
  return JSON.parse(task);
}


const AddListView = ({...props}) => {
  return (
    <div className='New-board'>
      <span className='Welcome'>Hi User, Welcome to Trello</span>
      <Button color='secondary' variant='outlined' type='button' size='small' onClick={props.openAddList}>Add List</Button>
    </div>
  )
}

export class App extends React.Component {

  constructor() {
    super();
    const listJson = getSession('list') ? getSession('list') : [];
    const taskJson = getSession('task') ? getSession('task') : [];
    if (!getSession('list')) {
      setSessionData('list', listJson);
    }
    if (!getSession('task')) {
      setSessionData('task', taskJson);
    }
    this.state = {
      isNewList: false,
      listArray: listJson
    }
  }

  // add new list
  addList = () => {
    this.setState({
      isNewList: true
    })
  }

  // To close the List form and update the state if new list item is added by the user.
  closeListDialog = (isSaved) => {
    if (isSaved) {
      const listJson = getSession('list');
      this.setState({
        listArray: listJson
      });
    }
    this.setState({
      isNewList: false
    })
  }
  

  // Delete list and corresponding tasks for the choosen list   
  deleteListFromView = (id) => {
    const listArr = getSession('list');
    const taskArr = getSession('task');
    const updatedList = listArr.filter(list => list.listId !== id);
    setSessionData('list', updatedList);
    const updatedTasks = taskArr.filter(task => task.listMappingId !== id);
    setSessionData('task', updatedTasks);
    this.setState({
      listArray: updatedList
    });
  }

  render() {
    const listArray = this.state.listArray;
    return (
      <div className='App'>
        <header className='App-header'>
          Trello Board
        </header>
        <div className='List-ctn'>
          { 
            listArray.map((listItem) => {
              return <List list={listItem} key={listItem.listId} deleteList={this.deleteListFromView}/>
            })
          }
          {
            listArray.length > 0 ? 
            <div className='Btn-ctn'>
              <Button color='secondary' variant='outlined' type='button' size='small' onClick={this.addList}>Add List</Button>
            </div> : null
          }
        </div>
        {
          listArray.length === 0 ?
          <AddListView openAddList={this.addList}/> : null
        }
        {
          this.state.isNewList ? <ListForm closeListForm={this.closeListDialog}/> : null
        }
      </div>
    );
  }
}

export default App;
