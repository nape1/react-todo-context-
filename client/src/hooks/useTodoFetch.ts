import { useEffect } from "react"
import routes from "../routes/todo"
import { useTodosContext } from "../contexts/ToDoContext"

function useTodoFetch() {
  const { todos, setTodos } = useTodosContext()

  console.log("useTodoFetch hook rendered")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(routes.todoList)
        const jsonData = await response.json()
        if (jsonData) {
          setTodos(jsonData)
        }
        setTodos(jsonData)
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error while fetching todos:", err.message)
          // You might want to do something more with the error, like showing a user-friendly message
        } else {
          console.error("Unknown error:", err)
          // Handle other types of errors here
        }
      }
    }
    fetchData()

  }, [])

  return todos
}

export default useTodoFetch
