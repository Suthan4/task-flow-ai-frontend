import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Sparkles,
  Brain,
  CheckCircle2,
  Circle,
  Plus,
  Zap,
} from "lucide-react";
import { taskApi } from "../api/taskApi";
import type { Task } from "../types/task";

interface TaskDetailProps {
  task: Task;
  onBack: () => void;
}

export default function TaskDetail({
  task: initialTask,
  onBack,
}: TaskDetailProps) {
  const [task, setTask] = useState(initialTask);
  const [loading, setLoading] = useState(false);
  const [generatingSubtasks, setGeneratingSubtasks] = useState(false);

  const handleStatusChange = async (newStatus: Task["status"]) => {
    setLoading(true);
    try {
      const updated = await taskApi.updateTask(task._id, { status: newStatus });
      setTask(updated);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSubtasks = async () => {
    setGeneratingSubtasks(true);
    try {
      const updated = await taskApi.generateSubtasks(task._id);
      setTask(updated);
    } catch (error) {
      console.error("Failed to generate subtasks:", error);
    } finally {
      setGeneratingSubtasks(false);
    }
  };

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      default:
        return "bg-slate-400";
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 80) return "from-red-500 to-orange-500";
    if (priority >= 50) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-teal-500";
  };

  const getComplexityBadge = (complexity: string) => {
    const colors = {
      low: "bg-green-100 text-green-700",
      medium: "bg-yellow-100 text-yellow-700",
      high: "bg-orange-100 text-orange-700",
      very_high: "bg-red-100 text-red-700",
    };
    return colors[complexity as keyof typeof colors] || colors.medium;
  };

  return (
    <div className="max-w-5xl">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -4 }}
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Tasks
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-6"
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold text-slate-800">{task.title}</h1>
            <div
              className={`px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r ${getPriorityColor(
                task.priority
              )}`}
            >
              Priority: {task.priority}
            </div>
          </div>

          {task.description && (
            <p className="text-slate-600 text-lg leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        {/* Status Buttons */}
        <div className="flex gap-3 mb-6">
          {(["todo", "in_progress", "completed"] as const).map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatusChange(status)}
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                task.status === status
                  ? `${getStatusColor(status)} text-white shadow-lg`
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status.replace("_", " ")}
            </motion.button>
          ))}
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {task.dueDate && (
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Due Date</p>
                <p className="font-semibold text-slate-800">
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
            <Tag className="w-6 h-6 text-cyan-600" />
            <div>
              <p className="text-sm text-slate-500">Created</p>
              <p className="font-semibold text-slate-800">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {task.tags?.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500 mb-2">Tags</p>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* AI Analysis */}
      {task.aiAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">AI Analysis</h2>
              <p className="text-slate-600">
                Intelligent insights for this task
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-slate-500 mb-1">AI Priority Score</p>
              <p className="text-3xl font-bold text-blue-600">
                {task.aiAnalysis.priorityScore}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-slate-500 mb-1">Complexity</p>
              <span
                className={`inline-block px-4 py-2 rounded-lg font-semibold ${getComplexityBadge(
                  task.aiAnalysis.complexity
                )}`}
              >
                {task.aiAnalysis.complexity.replace("_", " ")}
              </span>
            </div>
          </div>

          {task.aiAnalysis.insights.length > 0 && (
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Key Insights
              </h3>
              <ul className="space-y-2">
                {task.aiAnalysis.insights.map((insight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-slate-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Subtasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Subtasks</h2>
            <p className="text-slate-600">
              Break down this task into smaller steps
            </p>
          </div>

          {(!task.subtasks || task.subtasks.length === 0) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGenerateSubtasks}
              disabled={generatingSubtasks}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            >
              <Zap className="w-5 h-5" />
              {generatingSubtasks ? "Generating..." : "Generate with AI"}
            </motion.button>
          )}
        </div>

        {task.subtasks && task.subtasks.length > 0 ? (
          <div className="space-y-3">
            {task.subtasks.map((subtask, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                {subtask.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      subtask.completed
                        ? "text-slate-500 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {subtask.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-600">
              No subtasks yet. Generate them with AI!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
