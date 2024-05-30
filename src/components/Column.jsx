/* eslint-disable react/prop-types */

import { shallow } from 'zustand/shallow'
import { tasksStore } from '../store'
import './Column.css'
import Task from './Task'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function Column({ state }) {
  const randomId = uuidv4()
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const tasks = tasksStore((store) =>
    store.tasks.filter((task) => task.state === state, shallow)
  )
  const addTask = tasksStore((store) => store.addTask)
  return (
    <div className="column">
      <div className="title-wrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(!open)}>Add</button>
      </div>
      {open && (
        <div className="modal">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => {
              addTask({ id: randomId, title: text, state: state })
              setText('')
              setOpen(false)
            }}
          >
            Add
          </button>
        </div>
      )}
      {tasks.map((task) => {
        return <Task title={task.title} state={task.state} key={task.id} />
      })}
    </div>
  )
}

export default Column
