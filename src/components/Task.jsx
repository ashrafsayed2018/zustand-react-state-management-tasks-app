/* eslint-disable react/prop-types */
import classNames from 'classnames'
import './Task.css'
import { tasksStore } from '../store'

function Task({ title, state }) {
  const task = tasksStore((store) => store.tasks.find((t) => t.title === title))
  const deleteTask = tasksStore((store) => store.removeTask)
  const setDraggedTask = tasksStore((store) => store.setDraggedTask)
  return (
    <div
      className="task"
      draggable
      onDragStart={() => {
        setDraggedTask(title)
      }}
    >
      <div>{title}</div>
      <div className="status-container">
        <div>
          {/* trash icon image */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
            style={{
              width: '20px',
              height: '20px',
              objectFit: 'contain',
              filter:
                'opacity(0.6) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)',
              cursor: 'pointer',
            }}
            alt=""
            onClick={() => deleteTask(task.id)}
          />
        </div>
        <div className={classNames('status', state)}>{state}</div>
      </div>
    </div>
  )
}

export default Task
