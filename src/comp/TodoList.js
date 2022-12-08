const TodoList = ({ data }) => {
  return (
    <div className="min-w-full">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          {data &&
            data.map((item) => (
              <li key={item.id}>
                <p>{item.task}</p>
                <p>{item.is_complete}</p>
                <p>{item.inserted_at}</p>
              </li>
            ))}
        </div>
      </div>
    </div>
  )
}

export default TodoList
