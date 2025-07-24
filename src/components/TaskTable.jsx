import React from "react";
import { Icon } from "@iconify/react";

const TaskTable = ({ tasks, onEdit, onComplete, onDelete }) => {
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
    if (!dateString) return "No Due Date";
    const date = new Date(dateString);
    const now = new Date();
    const isOverdue =
      date < now && !tasks.find((t) => t.dueDate === dateString)?.completed;

    const formatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });

    if (isOverdue) {
      return (
        <span className="text-red-600">
          {formatted} <span className="text-xs">(Overdue)</span>
        </span>
      );
    }

    return formatted;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={`hover:bg-gray-50 ${
                  task.completed ? "opacity-75" : ""
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div
                        className={`text-sm font-medium text-gray-900 ${
                          task.completed ? "line-through" : ""
                        }`}
                      >
                        {task.title}
                      </div>
                      {task.description && (
                        <div
                          className={`text-sm text-gray-500 ${
                            task.completed ? "line-through" : ""
                          }`}
                        >
                          {task.description}
                        </div>
                      )}
                    </div>
                    {task.completed && (
                      <Icon
                        icon="mdi:check-circle"
                        className="text-green-500 text-lg flex-shrink-0"
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(task.dueDate)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    <Icon
                      icon={getPriorityIcon(task.priority)}
                      className="text-sm"
                    />
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {!task.completed && (
                      <button
                        onClick={() => onComplete(task.id)}
                        className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded hover:bg-green-100 transition-colors flex items-center gap-1 text-sm font-medium"
                        title="Mark as complete"
                      >
                        <Icon icon="mdi:check" className="text-base" />
                        Done
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(task)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit task"
                    >
                      <Icon icon="mdi:pencil" className="text-lg" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete task"
                    >
                      <Icon icon="mdi:delete-outline" className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
