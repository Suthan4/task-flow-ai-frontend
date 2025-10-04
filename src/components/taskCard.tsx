import { motion } from "framer-motion";
import {
  Calendar,
  Tag,
  Trash2,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Task } from "../types/task";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onGenerateSubtasks: (id: string) => void;
}

export function TaskCard({
  task,
  onDelete,
  onUpdate,
  onGenerateSubtasks,
}: TaskCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusColors = {
    todo: "bg-slate-100 text-slate-700",
    in_progress: "bg-amber-100 text-amber-700",
    completed: "bg-emerald-100 text-emerald-700",
  };

  const priorityColor = (priority: number) => {
    if (priority >= 80) return "text-rose-600";
    if (priority >= 50) return "text-amber-600";
    return "text-slate-600";
  };

  const complexityColors = {
    low: "text-emerald-600",
    medium: "text-amber-600",
    high: "text-rose-600",
    very_high: "text-rose-700",
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-slate-200"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={() =>
                onUpdate(task._id, {
                  status: task.status === "completed" ? "todo" : "completed",
                })
              }
              className="mt-1 transition-colors"
            >
              {task.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              ) : (
                <Circle className="w-5 h-5 text-slate-300 hover:text-slate-500" />
              )}
            </button>
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold text-slate-800 mb-1 ${
                  task.status === "completed" ? "line-through opacity-60" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-slate-600 text-sm mb-3">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-bold ${priorityColor(task.priority)}`}
            >
              {task.priority}
            </span>
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 hover:bg-rose-50 rounded-lg transition-colors group"
            >
              <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              statusColors[task.status]
            }`}
          >
            {task.status.replace("_", " ")}
          </span>
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}

        {task.aiAnalysis && (
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-semibold text-violet-900">
                AI Analysis
              </span>
            </div>
            <div className="flex gap-4 text-xs">
              <div>
                <span className="text-slate-600">Complexity: </span>
                <span
                  className={`font-medium ${
                    complexityColors[
                      task.aiAnalysis
                        .complexity as keyof typeof complexityColors
                    ] || "text-slate-600"
                  }`}
                >
                  {task.aiAnalysis.complexity}
                </span>
              </div>
            </div>
            {task.aiAnalysis.insights.length > 0 && (
              <div className="mt-2">
                {task.aiAnalysis.insights.map((insight, idx) => (
                  <p key={idx} className="text-xs text-violet-700">
                    • {insight}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {task.subtasks && task.subtasks.length > 0 && (
          <div className="border-t border-slate-200 pt-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2 hover:text-slate-900"
            >
              {showDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              Subtasks ({task.subtasks.filter((s) => s.completed).length}/
              {task.subtasks.length})
            </button>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="space-y-2"
              >
                {task.subtasks.map((subtask, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <div
                      className={`w-4 h-4 rounded border-2 ${
                        subtask.completed
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-slate-300"
                      }`}
                    >
                      {subtask.completed && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <span
                      className={
                        subtask.completed
                          ? "line-through text-slate-400"
                          : "text-slate-700"
                      }
                    >
                      {subtask.title}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            onClick={() =>
              onUpdate(task._id, {
                status: task.status === "in_progress" ? "todo" : "in_progress",
              })
            }
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
          >
            <Clock className="w-3 h-3" />
            {task.status === "in_progress" ? "Pause" : "Start"}
          </button>
          {!task.subtasks?.length && task.aiAnalysis && (
            <button
              onClick={() => onGenerateSubtasks(task._id)}
              className="flex items-center gap-1 px-3 py-1.5 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg text-xs font-medium transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              Generate Subtasks
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
