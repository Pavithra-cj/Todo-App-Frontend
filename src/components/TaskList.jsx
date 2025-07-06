import React, { useState } from "react";
import { Icon } from "@iconify/react";
import TaskCard from "./model/TaskCard";

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  const filterTasks = (tasks, filter) => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "pending":
        return tasks.filter((task) => !task.completed);
      case "overdue":
        return tasks.filter(
          (task) =>
            !task.completed &&
            task.dueDate &&
            new Date(task.dueDate) < new Date()
        );
      case "today":
        return tasks.filter((task) => {
          if (!task.dueDate) return false;
          const today = new Date().toDateString();
          return new Date(task.dueDate).toDateString() === today;
        });
      default:
        return tasks;
    }
  };

  const sortTasks = (tasks, sortBy) => {
    const sortedTasks = [...tasks];

    switch (sortBy) {
      case "priority":
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return sortedTasks.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
      case "dueDate":
        return sortedTasks.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      case "title":
        return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
      case "createdAt":
      default:
        return sortedTasks.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  };

  const filteredTasks = filterTasks(tasks, filter);
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  const getTaskCounts = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = tasks.filter((t) => !t.completed).length;
    const overdue = tasks.filter(
      (t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
    ).length;
    const today = tasks.filter((t) => {
      if (!t.dueDate) return false;
      const todayStr = new Date().toDateString();
      return new Date(t.dueDate).toDateString() === todayStr;
    }).length;

    return { total, completed, pending, overdue, today };
  };

  const counts = getTaskCounts();

  const filterOptions = [
    {
      value: "all",
      label: "All Tasks",
      count: counts.total,
      icon: "mdi:format-list-bulleted",
    },
    {
      value: "pending",
      label: "Pending",
      count: counts.pending,
      icon: "mdi:clock-outline",
    },
    {
      value: "completed",
      label: "Completed",
      count: counts.completed,
      icon: "mdi:check-circle",
    },
    {
      value: "overdue",
      label: "Overdue",
      count: counts.overdue,
      icon: "mdi:clock-alert",
    },
    {
      value: "today",
      label: "Due Today",
      count: counts.today,
      icon: "mdi:today",
    },
  ];

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon
          icon="mdi:clipboard-text-outline"
          className="text-6xl text-gray-400 dark:text-gray-600 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
          No tasks yet
        </h3>
        <p className="text-gray-500 dark:text-gray-500">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter and Sort Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-md border dark:border-gray-700">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                filter === option.value
                  ? "bg-indigo-600 text-white dark:bg-indigo-500"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <Icon icon={option.icon} className="text-sm" />
              <span className="hidden sm:inline">{option.label}</span>
              <span className="sm:hidden">{option.label.split(" ")[0]}</span>
              <span className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs min-w-[20px] text-center">
                {option.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <Icon icon="mdi:sort" className="text-gray-500 dark:text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="createdAt">Sort by Created Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Task Count Summary */}
      {sortedTasks.length > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400 px-1">
          Showing {sortedTasks.length} of {tasks.length} tasks
        </div>
      )}

      {/* Tasks */}
      {sortedTasks.length === 0 ? (
        <div className="text-center py-8">
          <Icon
            icon="mdi:filter-variant"
            className="text-4xl text-gray-400 dark:text-gray-600 mx-auto mb-2"
          />
          <p className="text-gray-500 dark:text-gray-500">
            No tasks match the current filter
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onComplete={onComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
