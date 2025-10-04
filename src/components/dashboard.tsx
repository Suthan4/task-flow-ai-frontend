import { useState } from "react";
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  Lightbulb,
  Plus,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TaskList from "./taskList";
import CreateTask from "./createTask";
import Analytics from "./analytics";
import Recommendations from "./recommendations";

interface DashboardProps {
  onLogout: () => void;
}

type View = "tasks" | "create" | "analytics" | "recommendations";

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeView, setActiveView] = useState<View>("tasks");

  const navItems = [
    { id: "tasks" as View, label: "Tasks", icon: ListTodo },
    { id: "create" as View, label: "Create Task", icon: Plus },
    { id: "analytics" as View, label: "Analytics", icon: BarChart3 },
    { id: "recommendations" as View, label: "AI Insights", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-72 bg-white shadow-xl border-r border-slate-200 z-10"
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">TaskMaster</h1>
              <p className="text-sm text-slate-500">AI-Powered Tasks</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeView === item.id
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-72 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === "tasks" && <TaskList />}
            {activeView === "create" && (
              <CreateTask onTaskCreated={() => setActiveView("tasks")} />
            )}
            {activeView === "analytics" && <Analytics />}
            {activeView === "recommendations" && <Recommendations />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
