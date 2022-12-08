{
  /* <html class="h-full">
<body class="h-full"> */
}

const TodoList = ({ data }) => {
  return (
    <div className="min-w-full">
      <div className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Dashboard</h1> */}
        </div>
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
    </div>
  )
}

export default TodoList
