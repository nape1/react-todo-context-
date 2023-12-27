import { useCallback } from "react"
import routes from "../routes/todo"

function useGetTodo() {
  console.log("useGetTodo hook rendered")
    const getTodos = useCallback(
        async () => {
            try {
              const response = await fetch(routes.todoList)
              const jsonData = await response.json()
              return jsonData
            } catch (err: unknown) {
              if (err instanceof Error) {
                console.error("Error while fetching todos:", err.message)
              } else {
                console.error("Unknown error:", err)
              }
            }
          },
      [],
    )


  return getTodos
}

export default useGetTodo
