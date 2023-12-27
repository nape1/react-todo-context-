import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { TodoContextType, TodoProviderProps } from "../types/todoType"
import routes from "../routes/todo"

const InitialTodo: TodoContextType = {
  todos: [],
  setTodos: () => {},
}
const ToDoContext = createContext<TodoContextType>(InitialTodo)

export const ToDoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState(InitialTodo.todos)
  console.log("ToDoProvider Rendered")
  const getTodos = useCallback(async () => {
    console.log("getting todo list")

    try {
      const response = await fetch(routes.todoList)
      const jsonData = await response.json()
      if (jsonData) {
        setTodos(jsonData)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error while fetching todos:", err.message)
      } else {
        console.error("Unknown error:", err)
      }
    }
  }, [])

  useEffect(() => {
    getTodos()
  }, [])

  const value = useMemo(() => ({ todos, setTodos }), [todos])

  return <ToDoContext.Provider value={value}>{children}</ToDoContext.Provider>
}

export const useTodosContext = () => {
  const { todos, setTodos } = useContext(ToDoContext)
  if (!setTodos.name.includes("dispatchSetState")) {
    // experimental checking for provider wrapper
    console.error("Provider is missing")
  }
  return { todos, setTodos }
}

export const useTodoValue = () => {
  const { todos } = useTodosContext()
  return todos
}
