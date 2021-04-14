import React from "react"
import { HashRouter, Route, Redirect } from "react-router-dom"

import { Container } from "react-bootstrap"

import { TaskApi, TaskStatus } from "./api"
import type { Task } from "./api"

import AppNav from "./AppNav"
import TaskBoard from "./TaskBoard"
import TaskForm from "./TaskForm"

interface State {
  tasks: Task[]
}

class App extends React.Component<{}, State> {
  constructor() {
    super({})
    this.state = { tasks: [] }
    this.refreshTasks()
  }

  refreshTasks() {
    TaskApi.getTasks().then((res) => {
      this.setState({ tasks: res })
    })
  }

  changeTaskStatus(task: Task, status: TaskStatus) {
    TaskApi.updateTaskStatus(task, status).then(() => this.refreshTasks())
  }

  deleteTask(taskId: number) {
    TaskApi.deleteTask(taskId).then(() => this.refreshTasks())
  }

  addTask(title: string, body: string) {
    TaskApi.newTask(title, body).then(() => this.refreshTasks())
  }

  render() {
    return (
      <HashRouter>
        <AppNav />
        <Container>
          <Route path="/task-board">
            <TaskBoard
              tasks={this.state.tasks}
              changeStatusFunc={this.changeTaskStatus.bind(this)}
              deleteFunc={this.deleteTask.bind(this)}
            />
          </Route>
          <Route path="/add-task">
            <TaskForm submitFunc={this.addTask.bind(this)} />
          </Route>
          <Route path="/">
            <Redirect to="/task-board" />
          </Route>
        </Container>
      </HashRouter>
    )
  }
}

export default App
