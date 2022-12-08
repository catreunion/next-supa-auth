const TodoList = ({ data }) => {
  return (
    <div className="min-w-full">
      {data &&
        data.map((item) => (
          <li key={item.id}>
            <p>{item.task}</p>
            <p>{item.is_complete}</p>
            <p>{item.inserted_at}</p>
          </li>
        ))}
    </div>
  )
}

export default TodoList
