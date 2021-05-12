import Card from '../components/Card';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Button from '@material-ui/core/Button';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import React from 'react';
import { setSessionData, getSession } from '../App';
import TaskForm from '../components/TaskForm';


export class List extends React.Component {
    
    constructor() {
        super();
        const taskJson = getSession('task');
        this.state = {
            isEditMode: false,
            taskArray: taskJson
        };
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }
      
    // handle card drop into list
    drop = (ev) => {
        ev.preventDefault();
        const taskId = ev.dataTransfer.getData('card');
        if (ev.target.className === 'List-tasks') {
            const elementId = ev.target.id;
            // add dropped card (task) on the top of the list
            const listNode = document.getElementById(elementId);
            if (listNode.children.length > 0) {
                listNode.insertBefore(document.getElementById(taskId), listNode.childNodes[0]);
            } else {
                ev.target.appendChild(document.getElementById(taskId));
            }
            // add dropped card (task) on the top of the list
            const taskArr = getSession('task');
            for (let i = 0; i < taskArr.length; i++) {
                if (+taskId === taskArr[i].id) {
                    taskArr[i].listMappingId = this.props.list.listId;
                    break;
                }
            }
            setSessionData('task', taskArr);
        }
    }

    // Remove a task from the current list
    removeTask = (id) => {
        const taskArr = getSession('task');
        for (let i = 0; i < taskArr.length; i++) {
            if (id === taskArr[i].id) {
                taskArr.splice(i, 1);
                break;
            }
        }
        setSessionData('task', taskArr);
        document.getElementById(id).remove();
    }

    // add new task
    addTask = () => {
        this.setState({
            isEditMode: true
        })
    }

    // To close the task form and update the state if new task is added by the user.
    closeDialogBox = (isSaved) => {
        if (isSaved) {
            const taskJson = getSession('task');
            this.setState({
                taskArray: taskJson
            });
        }
        this.setState({
            isEditMode: false
        })
    }

    render() {
        const tasks = this.state.taskArray;
        const list = this.props.list;

        return (
            <div className='List'>
                <div className='List-head-ctn'>
                <span className='List-head'>
                    {list.listName}
                    <span className='Icon-action'><CloseRoundedIcon color='inherit' onClick={ (e) => { e.preventDefault(); this.props.deleteList(list.listId)} }/></span>
                </span>
                </div>
                <div className='List-tasks' id={`list_${list.listId}`} onDrop={this.drop} onDragOver={this.allowDrop}>
                {
                    tasks.map(task => {
                        if (task.listMappingId === list.listId) {
                            return <Card taskDetail={task} key={task.id} removeTask={this.removeTask}/>
                        }
                        return null
                    })
                }
                </div>
                <Button variant='contained' color='primary' size='small' fullWidth endIcon={ <AddBoxSharpIcon/> } onClick={this.addTask}>Add Task</Button>
                {
                    this.state.isEditMode ? <TaskForm listDetail={list} closeForm={this.closeDialogBox}/> : null
                }
            </div>
        );
    }

}

export default List;