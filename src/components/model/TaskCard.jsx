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
      className={`bg-white dark:bg-gray-800 p-4 shadow-md dark:shadow-lg rounded-lg border dark:border-gray-700 transition-all duration-200 hover:shadow-lg dark:hover:shadow-xl ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <h3
              className={`font-semibold text-lg text-gray-900 dark:text-gray-100 ${
                task.completed ? "line-through" : ""
              } break-words`}
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

          {task.description && (
            <p
              className={`text-gray-600 dark:text-gray-300 mb-3 ${
                task.completed ? "line-through" : ""
              } break-words`}
            >
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            {/* Priority Badge */}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
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
                className="inline mr-1"
              />
              {task.priority}
            </span>

            {/* Due Date */}
            {dueDateInfo && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  dueDateInfo.isOverdue
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : dueDateInfo.isToday
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                <Icon
                  icon={
                    dueDateInfo.isOverdue
                      ? "mdi:clock-alert"
                      : "mdi:clock-outline"
                  }
                  className="text-sm"
                />
                {dueDateInfo.formatted}
                {dueDateInfo.isOverdue && !task.completed && (
                  <span className="text-xs">(Overdue)</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 text-lg sm:mt-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Edit task"
          >
            <Icon icon="mdi:pencil" />
          </button>

          {!task.completed && (
            <button
              onClick={() => onComplete(task.id)}
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Mark as complete"
            >
              <Icon icon="mdi:check-circle-outline" />
            </button>
          )}

          <button
            onClick={confirmDelete}
            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Delete task"
          >
            <Icon icon="mdi:delete-outline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
