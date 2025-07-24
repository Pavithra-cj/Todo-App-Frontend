import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Icon } from "@iconify/react";

const TaskForm = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "Medium");
      setDueDate(
        taskToEdit.dueDate
          ? new Date(taskToEdit.dueDate).toISOString().slice(0, 16)
          : ""
      );
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
    }
    setErrors({});
  }, [taskToEdit, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (dueDate && new Date(dueDate) < new Date()) {
      newErrors.dueDate = "Due date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fix the errors in the form",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f3f4f6"
          : "#000000",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: taskToEdit ? "Update this task?" : "Create a new task?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: document.documentElement.classList.contains("dark")
        ? "#1f2937"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#f3f4f6"
        : "#000000",
    });

    if (confirm.isConfirmed) {
      const task = {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      };

      if (taskToEdit) {
        task.id = taskToEdit.id;
      }

      try {
        await onSave(task);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: taskToEdit
            ? "Task updated successfully!"
            : "Task created successfully!",
          background: document.documentElement.classList.contains("dark")
            ? "#1f2937"
            : "#ffffff",
          color: document.documentElement.classList.contains("dark")
            ? "#f3f4f6"
            : "#000000",
        });

        onClose();
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
        return;
      }
    }
  };

  const handleClose = () => {
    if (title.trim() || description.trim()) {
      Swal.fire({
        title: "Are you sure?",
        text: "You have unsaved changes. Are you sure you want to close?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "No, keep editing",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#f3f4f6"
          : "#000000",
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
        }
      });
    } else {
      onClose();
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Icon icon={taskToEdit ? "mdi:pencil" : "mdi:plus"} />
            {taskToEdit ? "Update Task" : "Add New Task"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon icon="mdi:close" className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Icon icon="mdi:text" className="inline mr-1" />
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors bg-white text-gray-900 placeholder-gray-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icon icon="mdi:alert-circle" className="text-sm" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Icon icon="mdi:text-box" className="inline mr-1" />
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none transition-colors bg-white text-gray-900 placeholder-gray-500"
              rows="3"
            />
          </div>

          {/* Priority Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Icon icon="mdi:flag" className="inline mr-1" />
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Low", "Medium", "High"].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-3 py-2 rounded-lg border transition-colors flex items-center justify-center gap-1 text-sm font-medium ${
                    priority === p
                      ? "bg-teal-600 text-white border-teal-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    icon={getPriorityIcon(p)}
                    className={
                      priority === p ? "text-white" : getPriorityColor(p)
                    }
                  />
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Icon icon="mdi:calendar" className="inline mr-1" />
              Due Date
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors bg-white text-gray-900 ${
                errors.dueDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <Icon icon="mdi:alert-circle" className="text-sm" />
                {errors.dueDate}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2"
            >
              <Icon icon="mdi:close" className="text-sm" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Icon
                icon={taskToEdit ? "mdi:content-save" : "mdi:plus"}
                className="text-sm"
              />
              {taskToEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
