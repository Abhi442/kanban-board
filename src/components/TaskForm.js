import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { setSessionData, getSession } from '../App';

export class TaskForm extends React.Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: ''
        }
    }

    // To store/update form value in state 
    handleChange = (name) => (e) => {
        this.setState({
          [name]: e.target.value
        });
    };
    
    // To add new task and update the session
    addTask = (e) => {
        const { listDetail } = this.props;
        e.preventDefault();        
        const payload = {
            id: getSession('task').length + 1,
            title: this.state.title,
            description: this.state.description,
            listMappingId: listDetail.listId
        };
        let updatedTasks = getSession('task');
        updatedTasks.push(payload);
        setSessionData('task', updatedTasks);
        this.props.closeForm(true);
    };

    render() {
        const { listDetail } = this.props;
        return (
            <div className='Form-wrap'>
                <div className='Form-ctn'>
                    <span className='Form-title'>
                        <span className='Form-logo'><AssignmentIcon /></span> 
                        Add Task in { listDetail.listName }
                        <span className='Icon-action'>
                            <CloseRoundedIcon color='inherit' fontSize='small' onClick={ (e) => { e.preventDefault(); this.props.closeForm(false)}}/>
                        </span>   
                    </span>
                    <form className='Form' onSubmit={this.addTask}>
                        <FormControl fullWidth required margin='normal'>
                            <InputLabel htmlFor='title'>
                                Title
                            </InputLabel>
                            <Input
                                name='title'
                                type='text'
                                autoComplete='title'
                                disableUnderline={false}
                                onChange={this.handleChange('title')}
                            />
                        </FormControl>
                        <FormControl fullWidth margin='normal' required>
                            <InputLabel htmlFor='description'>
                                Description
                            </InputLabel>
                            <Input
                                name='description'
                                type='text'
                                autoComplete='description'
                                disableUnderline={false}
                                onChange={this.handleChange('description')}
                            />
                        </FormControl>
                        <Button 
                            color='primary'
                            fullWidth
                            variant='contained'
                            type='submit'>
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        );
    }    

}

export default TaskForm;