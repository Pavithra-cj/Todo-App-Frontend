import React from "react";
import { Icon } from "@iconify/react";

const EmptyState = ({ searchQuery, currentView }) => {
  const getEmptyStateContent = () => {
    if (searchQuery) {
      return {
        icon: "mdi:magnify",
        title: "No tasks found",
        description:
          "Try adjusting your search terms or check if the task exists",
        iconColor: "text-gray-400",
      };
    }

    switch (currentView) {
      case "completed":
        return {
          icon: "mdi:check-circle-outline",
          title: "No completed tasks yet",
          description: "Complete some tasks to see them here!",
          iconColor: "text-green-400",
        };
      case "all":
        return {
          icon: "mdi:table",
          title: "No tasks in table view",
          description:
            "All your tasks are completed or create your first task!",
          iconColor: "text-blue-400",
        };
      case "recent":
        return {
          icon: "mdi:clipboard-text-outline",
          title: "No recent tasks",
          description: "Create your first task to get started!",
          iconColor: "text-purple-400",
        };
      default:
        return {
          icon: "mdi:clipboard-text-outline",
          title: "No tasks yet",
          description: "Create your first task to get started!",
          iconColor: "text-gray-400",
        };
    }
  };

  const { icon, title, description, iconColor } = getEmptyStateContent();

  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <Icon icon={icon} className={`text-6xl ${iconColor} mx-auto mb-4`} />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6">{description}</p>

        {!searchQuery && currentView !== "completed" && (
          <div className="space-y-2 text-sm text-gray-400">
            <p>💡 Tips:</p>
            <ul className="text-left inline-block">
              <li>• Click "Tambah Tugas" to create a new task</li>
              <li>• Set priorities to organize your work</li>
              <li>• Add due dates to stay on track</li>
              <li>• Use tags to categorize tasks</li>
            </ul>
          </div>
        )}

        {searchQuery && (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">Search suggestions:</p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                Try shorter keywords
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                Check spelling
              </span>
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                Search in description
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
