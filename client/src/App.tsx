import "./App.css"
import InputTodo from "./components/InputTodo"
import ListTodos from "./components/ListTodos"
import { ToDoProvider } from "./contexts/ToDoContext"

function App() {
  return (
    <ToDoProvider>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </ToDoProvider>
  )
}

export default App
