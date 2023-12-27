import { useCallback, useRef } from "react"
import routes from "../routes/todo"
import { useTodosContext } from "../contexts/ToDoContext"

type UseTodoPostType = [
  React.RefObject<HTMLInputElement>,
  (e: React.FormEvent) => Promise<void>
]

function useTodoPost(): UseTodoPostType {
  const descriptionRef = useRef<HTMLInputElement>(null)
  const {setTodos} = useTodosContext()

  console.log("useTodoPost hook rendered")

  const onSubmitHandler = useCallback(
    async (e: React.FormEvent) => {
        e.preventDefault()
        if (!descriptionRef.current) return
        console.log({ description: descriptionRef.current.value }, "in post hook")
        try {
          const response = await fetch(routes.todoList, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              description: descriptionRef.current.value,
              completed: false,
            }),
          })
          const data = await response.json()
          if(data){
            setTodos((prev) => (
                [...prev,
                data]
            ))
          }
    
          if (!response.ok) {
            throw new Error(
              `Failed to post todo: ${response.status} - ${response.statusText}`
            )
          }
          descriptionRef.current.value = ""
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error("Error while posting todo:", err.message)
            // You might want to do something more with the error, like showing a user-friendly message
          } else {
            console.error("Unknown error:", err)
            // Handle other types of errors here
          }
        }
      },
    [],
  )
  

  return [descriptionRef, onSubmitHandler]
}

export default useTodoPost
