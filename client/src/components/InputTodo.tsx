import { Fragment } from "react"
import useAddTodo from "../hooks/useAddTodo"
import InputComponent from "./Input"

const InputTodo = () => {
  const [ descriptionRef, onSubmitForm ] = useAddTodo()

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <InputComponent inputRef={descriptionRef} />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  )
}

export default InputTodo
