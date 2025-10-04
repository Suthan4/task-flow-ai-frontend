import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Zap,
  AlertTriangle,
  Layers,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { taskApi } from "../api/taskApi";
import type { Recommendations as RecommendationsType } from "../types/task";

export default function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<RecommendationsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const data = await taskApi.getRecommendations();
      setRecommendations(data);
    } catch (error) {
      console.error("Failed to load recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600">Failed to load recommendations</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          AI Recommendations
        </h1>
        <p className="text-slate-600">
          Smart insights to boost your productivity
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Tasks",
            value: recommendations.summary.totalTasks,
            icon: Layers,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Completed",
            value: recommendations.summary.completedTasks,
            icon: TrendingUp,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Overdue",
            value: recommendations.summary.overdueCount,
            icon: AlertTriangle,
            color: "from-red-500 to-orange-500",
          },
          {
            label: "High Priority",
            value: recommendations.summary.highPriorityCount,
            icon: Zap,
            color: "from-yellow-500 to-orange-500",
          },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-slate-600 text-sm mb-1">{item.label}</p>
            <p className="text-3xl font-bold text-slate-800">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Focus Now */}
      {recommendations.focusNow.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Focus Now</h2>
              <p className="text-slate-600">
                High priority tasks that need your attention
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.focusNow.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {task.title}
                </h3>
                <div className="flex items-center gap-2 text-blue-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">{task.reason}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Overdue Tasks */}
      {recommendations.overdue.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Overdue Tasks
              </h2>
              <p className="text-slate-600">Tasks that missed their deadline</p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.overdue.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-3">
                  {task.title}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
                    {task.daysOverdue} {task.daysOverdue === 1 ? "day" : "days"}{" "}
                    overdue
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Needs Breakdown */}
      {recommendations.needsBreakdown.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Complex Tasks
              </h2>
              <p className="text-slate-600">
                Tasks that could benefit from breaking down into subtasks
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.needsBreakdown.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {task.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    Complexity: {task.complexity.replace("_", " ")}
                  </span>
                  <span className="text-sm text-slate-600">
                    Consider generating subtasks with AI
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {recommendations.focusNow.length === 0 &&
        recommendations.overdue.length === 0 &&
        recommendations.needsBreakdown.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              You're all caught up!
            </h3>
            <p className="text-slate-600">
              No urgent recommendations at the moment. Keep up the great work!
            </p>
          </motion.div>
        )}
    </div>
  );
}
