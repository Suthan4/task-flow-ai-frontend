import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Tag,
  Trash2,
  CreditCard as Edit,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
} from "lucide-react";
import { taskApi } from "../api/taskApi";
import type { Task } from "../types/task";
import TaskDetail from "./taskDetail";

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm, statusFilter]);

  const loadTasks = async () => {
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  const handleStatusChange = async (
    taskId: string,
    newStatus: Task["status"]
  ) => {
    try {
      await taskApi.updateTask(taskId, { status: newStatus });
      loadTasks();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await taskApi.deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 80) return "bg-red-500";
    if (priority >= 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  if (selectedTask) {
    return (
      <TaskDetail
        task={selectedTask}
        onBack={() => {
          setSelectedTask(null);
          loadTasks();
        }}
      />
    );
  }

  return (
    <div className="max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Your Tasks</h1>
        <p className="text-slate-600">
          Manage and track all your tasks in one place
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-12 pr-10 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-100"></div>
            <span className="text-slate-600">Total: {tasks.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-100"></div>
            <span className="text-slate-600">
              In Progress:{" "}
              {tasks.filter((t) => t.status === "in_progress").length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-100"></div>
            <span className="text-slate-600">
              Completed: {tasks.filter((t) => t.status === "completed").length}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Task List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </div>
      ) : filteredTasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-lg p-12 text-center"
        >
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            No tasks found
          </h3>
          <p className="text-slate-600">
            Try adjusting your filters or create a new task
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getStatusIcon(task.status)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-slate-800 truncate">
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div
                          className={`w-2 h-2 rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                          title={`Priority: ${task.priority}`}
                        ></div>
                        <span className="text-sm font-medium text-slate-600">
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    {task.description && (
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center flex-wrap gap-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full font-medium ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status.replace("_", " ")}
                      </span>

                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}

                      {task.tags.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-slate-400" />
                          {task.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                          {task.tags.length > 3 && (
                            <span className="text-slate-400 text-xs">
                              +{task.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {task.aiAnalysis && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-xs">AI Enhanced</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex gap-2 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedTask(task)}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Edit className="w-5 h-5 text-blue-600" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteTask(task._id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
