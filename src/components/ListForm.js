import React from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { FormControl, Input, InputLabel, Button } from '@material-ui/core';
import { setSessionData, getSession } from '../App';

export class ListForm extends React.Component {

    constructor() {
        super();
        this.state = {
            listTitle: ''
        }
    }

    // To store/update form value in state 
    handleChange = (e) => {
        this.setState({
            listTitle: e.target.value
        });
    };
    
    // To add new list and update the session
    addList = (e) => {
        e.preventDefault();        
        const payload = {
            listId: getSession('list').length + 1,
            listName: this.state.listTitle
        };
        let updatedTasks = getSession('list');
        updatedTasks.push(payload);
        setSessionData('list', updatedTasks);
        this.props.closeListForm(true);
    };

    render() {
        return (
            <div className='Form-wrap'>
                <div className='Form-ctn'>
                    <span className='Form-title'> 
                        Add New List
                        <span className='Icon-action'>
                            <CloseRoundedIcon color='inherit' fontSize='small' onClick={ (e) => { e.preventDefault(); this.props.closeListForm(false)}}/>
                        </span>   
                    </span>
                    <form className='Form' onSubmit={this.addList}>
                        <FormControl fullWidth required margin='normal'>
                            <InputLabel htmlFor='name'>
                                List Name
                            </InputLabel>
                            <Input
                                name='name'
                                type='text'
                                autoComplete='name'
                                disableUnderline={false}
                                onChange={this.handleChange}
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

export default ListForm;