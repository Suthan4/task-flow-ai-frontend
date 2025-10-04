import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, PenTool, Calendar, Tag, AlertCircle } from "lucide-react";
import { taskApi } from "../api/taskApi";

interface CreateTaskProps {
  onTaskCreated: () => void;
}

export default function CreateTask({ onTaskCreated }: CreateTaskProps) {
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [aiInput, setAiInput] = useState("");
  const [manualForm, setManualForm] = useState({
    title: "",
    description: "",
    priority: 50,
    tags: "",
    dueDate: "",
  });

  const handleAISubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await taskApi.createTaskWithAI(aiInput);
      setSuccess(true);
      setAiInput("");
      setTimeout(() => {
        onTaskCreated();
      }, 1500);
    } catch (err) {
      setError("Failed to create task with AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await taskApi.createTaskManually({
        title: manualForm.title,
        description: manualForm.description || undefined,
        priority: manualForm.priority,
        tags: manualForm.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        dueDate: manualForm.dueDate || undefined,
      });
      setSuccess(true);
      setManualForm({
        title: "",
        description: "",
        priority: 50,
        tags: "",
        dueDate: "",
      });
      setTimeout(() => {
        onTaskCreated();
      }, 1500);
    } catch (err) {
      setError("Failed to create task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Create New Task
        </h1>
        <p className="text-slate-600">
          Choose between AI-powered or manual task creation
        </p>
      </motion.div>

      {/* Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-2 mb-8 flex gap-2"
      >
        <button
          onClick={() => setMode("ai")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
            mode === "ai"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Sparkles className="w-5 h-5" />
          AI Creation
        </button>
        <button
          onClick={() => setMode("manual")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
            mode === "manual"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <PenTool className="w-5 h-5" />
          Manual Creation
        </button>
      </motion.div>

      {/* AI Mode */}
      {mode === "ai" && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Describe Your Task
            </h2>
            <p className="text-slate-600">
              AI will analyze and create a task with proper priority and tags
            </p>
          </div>

          <form onSubmit={handleAISubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What do you need to do?
              </label>
              <textarea
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="e.g., Fix the login bug ASAP by Friday, it's blocking users from signing in"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                rows={4}
                required
              />
              <p className="text-sm text-slate-500 mt-2">
                Include details like urgency, deadlines, and context for better
                AI analysis
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium"
              >
                Task created successfully! Redirecting...
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading || success}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating with AI..." : "Create Task with AI"}
            </motion.button>
          </form>
        </motion.div>
      )}

      {/* Manual Mode */}
      {mode === "manual" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Manual Task Creation
            </h2>
            <p className="text-slate-600">
              Fill in the details to create your task
            </p>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                value={manualForm.title}
                onChange={(e) =>
                  setManualForm({ ...manualForm, title: e.target.value })
                }
                placeholder="e.g., Implement user authentication"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={manualForm.description}
                onChange={(e) =>
                  setManualForm({ ...manualForm, description: e.target.value })
                }
                placeholder="Add details about the task..."
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Priority: {manualForm.priority}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={manualForm.priority}
                onChange={(e) =>
                  setManualForm({
                    ...manualForm,
                    priority: Number(e.target.value),
                  })
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </label>
                <input
                  type="text"
                  value={manualForm.tags}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, tags: e.target.value })
                  }
                  placeholder="development, urgent"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
                <p className="text-xs text-slate-500 mt-1">Comma separated</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  Due Date
                </label>
                <input
                  type="date"
                  value={manualForm.dueDate}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, dueDate: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-xl"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-green-50 text-green-700 rounded-xl text-center font-medium"
              >
                Task created successfully! Redirecting...
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading || success}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Task..." : "Create Task"}
            </motion.button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
