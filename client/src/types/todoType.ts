export type TodoType = {
    todo_id: string
    description: string,
    completed: boolean
}

export type TodoContextType = {
  todos:  TodoType[]
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
}

export type TodoProviderProps = {
  children: React.ReactNode
}
