import React, { RefObject } from "react"
import { Button, Form } from "react-bootstrap"
import { Redirect } from "react-router-dom"

const TaskFormStyle = {
  margin: "auto",
  maxWidth: "400px",
}

interface TaskFormProps {
  submitFunc: { (title: string, body: string): void }
}

interface TaskFormState {
  title: RefObject<HTMLInputElement>
  body: RefObject<HTMLInputElement>
  submitted: boolean
}

class TaskForm extends React.Component<TaskFormProps, TaskFormState> {
  constructor(props: TaskFormProps) {
    super(props)
    this.state = {
      title: React.createRef(),
      body: React.createRef(),
      submitted: false,
    }
  }

  render() {
    if (this.state.submitted === true) {
      return <Redirect to="/task-board" />
    }
    return (
      <div style={TaskFormStyle}>
        <h3 className="mb-3">Add a new task</h3>
        <Form
          onSubmit={() => {
            const titleInput = this.state.title.current
            const bodyInput = this.state.body.current
            if (titleInput == null || bodyInput == null) {
              return
            }
            this.props.submitFunc(titleInput.value, bodyInput.value)
            this.setState({ submitted: true })
          }}
        >
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              ref={this.state.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task body"
              ref={this.state.body}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default TaskForm
