import EditTodo from "./EditTodo";
import { useTodosContext } from "../contexts/ToDoContext";

const ListTodos = () => {
const {todos, setTodos} = useTodosContext()

  //delete todo function
  const deleteTodo = async (id:string) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      if (deleteTodo.ok) {
          // Read the response body as text
        //   const data = await deleteTodo.json();
          const data = await deleteTodo.text();
          console.log('💣 ' + data);
    }
      

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err :unknown) {
        if(err instanceof Error)
        console.error(err.message);
    }
  };

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ListTodos;
