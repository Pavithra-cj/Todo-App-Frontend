import React from "react";
import { Icon } from "@iconify/react";

const NavigationTabs = ({ currentView, setCurrentView }) => {
  const tabs = [
    {
      value: "recent",
      label: "Recent",
      icon: "mdi:view-grid",
      description: "Recent 5 tasks in card view",
    },
    {
      value: "all",
      label: "Tabel",
      icon: "mdi:table",
      description: "All tasks in table view",
    },
    {
      value: "completed",
      label: "Completed",
      icon: "mdi:calendar",
      description: "Completed tasks view",
    },
  ];

  return (
    <div className="flex gap-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setCurrentView(tab.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentView === tab.value
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
          title={tab.description}
        >
          <Icon icon={tab.icon} className="text-lg" />
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
