import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import * as taskService from "./service/taskService";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import TaskTable from "./components/TaskTable";
import SearchBar from "./components/SearchBar";
import NavigationTabs from "./components/NavigationTabs";
import CompletedTasksList from "./components/CompletedTaskList";
import EmptyState from "./components/EmptyState";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("recent");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load tasks. Please try again.",
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

  const getFilteredTasks = () => {
    let filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    switch (currentView) {
      case "recent":
        return filteredTasks
          .filter((task) => !task.completed)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
      case "all":
        return filteredTasks.filter((task) => !task.completed);
      case "completed":
        return filteredTasks.filter((task) => task.completed);
      default:
        return filteredTasks;
    }
  };

  const handleComplete = async (taskId) => {
    const confirm = await Swal.fire({
      title: "Mark as Complete?",
      text: "This task will be marked as completed",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, complete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#d33",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6"
        : "#000000",
    });

    if (confirm.isConfirmed) {
      try {
        await taskService.completeTask(taskId);
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, completed: true } : task
          )
        );

        Swal.fire({
          title: "Completed!",
          text: "Task has been marked as completed.",
          icon: "success",
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
    }
  };

  const handleDelete = async (taskId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6"
        : "#000000",
    });

    if (confirm.isConfirmed) {
      try {
        await taskService.deleteTask(taskId);
        setTasks(tasks.filter((task) => task.id !== taskId));

        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
          background: document.documentElement.classList.contains("dark")
            ? "#1f2937"
            : "#ffffff",
          color: document.documentElement.classList.contains("dark")
            ? "#f3f4f6"
            : "#000000",
        });
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
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const handleSave = async (taskData) => {
    try {
      if (taskData.id) {
        // Update existing task
        const response = await taskService.updateTask(taskData.id, taskData);
        setTasks(
          tasks.map((task) => (task.id === taskData.id ? response.data : task))
        );
      } else {
        // Create new task
        const response = await taskService.createTask(taskData);
        setTasks([...tasks, response.data]);
      }
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
      throw error;
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setTaskToEdit(null);
  };

  const handleAddTask = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  const displayedTasks = getFilteredTasks();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon
            icon="mdi:loading"
            className="text-4xl text-blue-600 animate-spin mx-auto mb-4"
          />
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Todo App</h1>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <NavigationTabs
              currentView={currentView}
              setCurrentView={setCurrentView}
            />

            <button
              onClick={handleAddTask}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 font-medium w-full sm:w-auto"
            >
              <Icon icon="mdi:plus" className="text-lg" />
              Add Task
            </button>
          </div>
        </div>

        {/* Content Area */}
        {displayedTasks.length === 0 ? (
          <EmptyState searchQuery={searchQuery} currentView={currentView} />
        ) : (
          <>
            {/* Card View (Recent Tasks) */}
            {currentView === "recent" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            {/* Table View (All Tasks) */}
            {currentView === "all" && (
              <TaskTable
                tasks={displayedTasks}
                onEdit={handleEdit}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            )}

            {/* Completed Tasks View */}
            {currentView === "completed" && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Completed Tasks
                </h2>
                <CompletedTasksList
                  tasks={displayedTasks}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </>
        )}

        {/* Task Form Modal */}
        <TaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSave={handleSave}
          taskToEdit={taskToEdit}
        />
      </div>
    </div>
  );
};

export default TodoApp;
