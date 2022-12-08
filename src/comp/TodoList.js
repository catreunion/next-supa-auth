import { useState, useEffect } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

// const TodoList = ({ data }) => {
const TodoList = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const [error, setError] = useState('')

  // get todos
  useEffect(() => {
    const getData = async () => {
      const { data: todos, error } = await supabaseClient.from('todos').select()
      if (error) {
        console.log('error msg from supabase : ', error)
      } else {
        setTodos(todos)
      }
    }

    getData()
  }, [])

  const addTask = async (newTask) => {
    // let task = taskText.trim()
    // if (task.length) {
    // let { data: todo, error } = await supabase.from('todos').insert({ task, user_id: user.id }).single()
    const { data: addedTask, error } = await supabaseClient
      .from('todos')
      .insert({ user_id: user.id, task: newTask })
      .single()
    if (error) {
      console.log('error msg from supabase : ', error)
      setError(error)
    }
    setTodos([...todos, addedTask])
  }

  return (
    <div className="min-w-full">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          {todos &&
            todos.map((item) => (
              <div key={item.id}>
                <p>{item.task}</p>
              </div>
            ))}

          <div className="flex gap-3 py-6">
            <input
              type="text"
              value={newTask}
              id="newTask"
              name="newTask"
              placeholder="make coffee"
              onChange={(e) => {
                setNewTask(e.target.value)
              }}
              className="w-full rounded p-2"
            />
            <button onClick={() => addTask(newTask)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoList
