/* eslint-disable react/prop-types */

import { shallow } from 'zustand/shallow'
import { tasksStore } from '../store'
import './Column.css'
import Task from './Task'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames/bind'

function Column({ state }) {
  const randomId = uuidv4()
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const tasks = tasksStore((store) =>
    store.tasks.filter((task) => task.state === state, shallow)
  )
  const addTask = tasksStore((store) => store.addTask)
  const setDraggedTask = tasksStore((store) => store.setDraggedTask)
  const draggedTask = tasksStore((store) => store.draggedTask)
  const moveTask = tasksStore((store) => store.moveTask)

  return (
    <div
      className={classNames('column', { drop: drop })}
      key={state}
      onDragOver={(e) => {
        e.preventDefault()
        setDrop(true)
      }}
      onDragLeave={(e) => {
        {
          e.preventDefault()
          setDrop(false)
        }
      }}
      onDrop={() => {
        moveTask(draggedTask, state)
        setDraggedTask(null)
        setDrop(false)
      }}
    >
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
