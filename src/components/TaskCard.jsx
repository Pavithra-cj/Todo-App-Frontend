import React from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

const TaskCard = ({ task, onEdit, onComplete, onDelete }) => {
  const confirmDelete = () => {
    Swal.fire({
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
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(task.id);
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
      }
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const now = new Date();
    const isOverdue = date < now && !task.completed;

    return {
      formatted: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
      }),
      isOverdue,
      isToday: date.toDateString() === now.toDateString(),
    };
  };

  const dueDateInfo = formatDueDate(task.dueDate);

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      {/* Task Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-2 flex-1">
          <h3
            className={`font-semibold text-gray-900 text-lg leading-tight ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.completed && (
            <Icon
              icon="mdi:check-circle"
              className="text-green-500 text-xl flex-shrink-0 mt-0.5"
            />
          )}
        </div>

        <div className="flex gap-1 ml-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit task"
          >
            <Icon icon="mdi:pencil" className="text-lg" />
          </button>
          <button
            onClick={() => confirmDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete task"
          >
            <Icon icon="mdi:delete-outline" className="text-lg" />
          </button>
        </div>
      </div>

      {/* Task Description */}
      {task.description && (
        <p
          className={`text-gray-600 text-sm mb-4 line-clamp-3 ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.description}
        </p>
      )}

      {/* Due Date */}
      {dueDateInfo && (
        <div className="flex items-center gap-2 mb-4 text-sm">
          <Icon
            icon={
              dueDateInfo.isOverdue ? "mdi:clock-alert" : "mdi:calendar-outline"
            }
            className="text-base"
          />
          <span
            className={
              dueDateInfo.isOverdue
                ? "text-red-600"
                : dueDateInfo.isToday
                ? "text-blue-600"
                : "text-gray-500"
            }
          >
            {dueDateInfo.formatted}
            {dueDateInfo.isOverdue && !task.completed && (
              <span className="text-red-600 ml-1">(Overdue)</span>
            )}
          </span>
        </div>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Priority Badge */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(
            task.priority
          )}`}
        >
          <Icon
            icon={
              task.priority === "High"
                ? "mdi:flag"
                : task.priority === "Medium"
                ? "mdi:flag-outline"
                : "mdi:flag-variant-outline"
            }
            className="text-sm"
          />
          {task.priority}
        </span>
      </div>

      {/* Done Button */}
      {!task.completed && (
        <div className="flex justify-end">
          <button
            onClick={() => onComplete(task.id)}
            className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-1 text-sm font-medium"
          >
            <Icon icon="mdi:check" className="text-base" />
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
