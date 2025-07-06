import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import "./App.css";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./service/taskService";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch tasks. Please try again.",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f3f4f6"
          : "#000000",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSaveTask = async (task) => {
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, task);
      } else {
        await createTask(task);
      }
      setModalOpen(false);
      setTaskToEdit(null);
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save task. Please try again.",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f3f4f6"
          : "#000000",
      });
    }
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setModalOpen(true);
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete task. Please try again.",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f3f4f6"
          : "#000000",
      });
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await completeTask(id);
      fetchTasks();

      Swal.fire({
        icon: "success",
        title: "Great job!",
        text: "Task marked as complete!",
        timer: 2000,
        showConfirmButton: false,
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f3f4f6"
          : "#000000",
      });
    } catch (error) {
      console.error("Error completing task:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to complete task. Please try again.",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f3f4f6"
          : "#000000",
      });
    }
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;

    return { total, completed, pending, overdue };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Icon
            icon="mdi:loading"
            className="text-4xl text-indigo-600 dark:text-indigo-400 animate-spin mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm dark:shadow-md border dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 dark:bg-indigo-500 p-3 rounded-lg">
                <Icon
                  icon="mdi:clipboard-check"
                  className="text-white text-2xl"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Todo List
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Stay organized and productive
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Add Task Button */}
              <button
                onClick={() => {
                  setTaskToEdit(null);
                  setModalOpen(true);
                }}
                className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Icon icon="mdi:plus" className="text-xl" />
                <span className="hidden sm:inline">Add Task</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-md border dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:format-list-bulleted"
                className="text-blue-500 text-xl"
              />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-md border dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:clock-outline"
                className="text-yellow-500 text-xl"
              />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.pending}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pending
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-md border dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:check-circle"
                className="text-green-500 text-xl"
              />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.completed}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Done</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-md border dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:clock-alert" className="text-red-500 text-xl" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stats.overdue}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Overdue
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onComplete={handleCompleteTask}
        />

        {/* Task Form Modal */}
        <TaskForm
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveTask}
          taskToEdit={taskToEdit}
        />
      </div>
    </div>
  );
}

export default App;
