import React from "react";
import { Icon } from "@iconify/react";

const CompletedTaskList = ({ tasks, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return "mdi:flag";
      case "Medium":
        return "mdi:flag-outline";
      case "Low":
        return "mdi:flag-variant-outline";
      default:
        return "mdi:flag-outline";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon
          icon="mdi:check-circle-outline"
          className="text-4xl text-gray-400 mx-auto mb-2"
        />
        <p className="text-gray-500">No completed tasks yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Complete some tasks to see them here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Icon
              icon="mdi:check-circle"
              className="text-green-500 text-xl flex-shrink-0 mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 line-through truncate mb-1">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-gray-500 line-through truncate mb-2">
                  {task.description}
                </p>
              )}

              {/* Task Details */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {task.dueDate && (
                  <span className="flex items-center gap-1 text-gray-500">
                    <Icon icon="mdi:calendar-outline" className="text-sm" />
                    {formatDate(task.dueDate)}
                  </span>
                )}

                {task.tags && task.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {task.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > 2 && (
                      <span className="text-gray-400">
                        +{task.tags.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 flex-shrink-0 ml-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded border flex items-center gap-1 ${getPriorityColor(
                task.priority
              )}`}
            >
              <Icon icon={getPriorityIcon(task.priority)} className="text-xs" />
              {task.priority}
            </span>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete task"
            >
              <Icon icon="mdi:delete-outline" className="text-lg" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTaskList;
