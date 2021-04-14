import { FC } from "react"

import { Row, Col, Card, ButtonGroup, Button } from "react-bootstrap"

import { TaskStatus } from "./api"
import type { Task } from "./api"

interface TaskCardProps {
  task: Task
  deleteFunc: { (): void }
  changeStatusFunc: { (modifier: number): void }
}

const TaskCard: FC<TaskCardProps> = ({
  task,
  deleteFunc,
  changeStatusFunc,
}) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{task.title}</Card.Title>
        <Card.Text>{task.body}</Card.Text>
        <ButtonGroup>
          <Button
            onClick={() => {
              changeStatusFunc(-1)
            }}
            variant="primary"
            disabled={task.status === TaskStatus.READY}
          >
            ←
          </Button>
          <Button onClick={deleteFunc} variant="danger">
            Delete
          </Button>
          <Button
            onClick={() => {
              changeStatusFunc(1)
            }}
            variant="primary"
            disabled={task.status === TaskStatus.DONE}
          >
            →
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  )
}

interface TaskBoardProps {
  tasks: Task[]
  changeStatusFunc: { (task: Task, status: TaskStatus): void }
  deleteFunc: { (taskId: number): void }
}

const TaskBoard: FC<TaskBoardProps> = ({
  tasks,
  changeStatusFunc,
  deleteFunc,
}) => {
  const columnNames = ["Ready", "In Progress", "Needs Review", "Done"]

  return (
    <Row>
      {columnNames.map((colName, index) => (
        <Col className="pt-1">
          <h3 className="text-center text-primary mb-4 py-3 border border-primary">
            {colName}
          </h3>
          {tasks
            .filter((task) => task.status === index)
            .map((task) => (
              <TaskCard
                task={task}
                deleteFunc={() => {
                  deleteFunc(task.id)
                }}
                changeStatusFunc={(modifier: number) => {
                  changeStatusFunc(task, task.status + modifier)
                }}
              />
            ))}
        </Col>
      ))}
    </Row>
  )
}

export default TaskBoard
