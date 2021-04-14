enum TaskStatus {
  READY = 0,
  IN_PROGRESS = 1,
  REVIEW = 2,
  DONE = 3,
}

interface InputTask {
  title: string
  body: string
  status: TaskStatus
}

interface Task extends InputTask {
  id: number
}

const API_URL = "http://localhost:4000/tasks"

class TaskApi {
  static async getTasks(): Promise<Task[]> {
    return fetch(API_URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        return res as Task[]
      })
  }

  static async newTask(title: string, body: string) {
    let task: InputTask = {
      title: title,
      body: body,
      status: TaskStatus.READY,
    }
    return fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
  }

  static async updateTask(task: Task) {
    let url = [API_URL, task.id].join("/")
    return fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
  }

  static async updateTaskStatus(task: Task, status: TaskStatus) {
    task.status = status
    return this.updateTask(task)
  }

  static deleteTask(taskId: number) {
    let url = [API_URL, taskId].join("/")
    return fetch(url, {
      method: "DELETE",
    })
  }
}

export type { Task }
export { TaskStatus, TaskApi }
