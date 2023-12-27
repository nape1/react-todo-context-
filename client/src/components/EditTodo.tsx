import React, { useEffect, useRef, useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import InputComponent from "./Input"
import { useTodosContext } from "../contexts/ToDoContext"
import { TodoType } from "../types/todoType"

const EditTodo = ({ todo }: { todo: TodoType }) => {
  const { todos, setTodos } = useTodosContext()

  const descriptionRef = useRef<HTMLInputElement>(null)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    //ref element visble when show is true
    if (show && descriptionRef.current != null) {
      descriptionRef.current.value = todo.description || ""
      descriptionRef.current.focus
    }
  }, [show, todo.description])

  const updateDescription = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      const body = { description: descriptionRef.current!.value } //descriptionRef.current is not null as modal is visbile so is save button
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      )
      if (response.ok) {
        const upDatedTodos = todos.map((todoItem) => ({
          ...todoItem,
          description:
            todo.todo_id == todoItem.todo_id
              ? descriptionRef.current!.value
              : todoItem.description,
        }))
        setTodos(upDatedTodos)
      }

      handleClose()
    } catch (err: unknown) {
      if (err instanceof Error) console.error(err.message)
    }
  }

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-warning"
      >
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputComponent className="form-control" inputRef={descriptionRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateDescription}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditTodo
