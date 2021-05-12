import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

const drag = (event) => {
    event.dataTransfer.setData('card', event.target.id);
}

const Card = ({...props}) => {
    const task = props.taskDetail;
    return(
        <div className='Card' id={task.id} draggable onDragStart={drag}>
            <span className='Card-title'>
                { task.title }
                <span className='Icon-action'>
                    <CloseRoundedIcon color='inherit' fontSize='small' onClick={ (e) => { e.preventDefault(); props.removeTask(task.id) }}/>
                </span>    
            </span>
            <span className='Card-desc'>{task.description}</span>
        </div>
    )
}

export default Card;