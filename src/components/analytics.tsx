import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  Target,
  Brain,
} from "lucide-react";
import { taskApi } from "../api/taskApi";
import type { Analytics as AnalyticsType } from "../types/task";

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const data = await taskApi.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to load analytics:", error);
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

  if (!analytics) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600">Failed to load analytics</p>
      </div>
    );
  }

  const statusData = [
    {
      label: "To Do",
      value: analytics.statusDistribution.todo,
      color: "bg-slate-500",
    },
    {
      label: "In Progress",
      value: analytics.statusDistribution.in_progress,
      color: "bg-blue-500",
    },
    {
      label: "Completed",
      value: analytics.statusDistribution.completed,
      color: "bg-green-500",
    },
  ];

  const complexityData = [
    {
      label: "Low",
      value: analytics.complexityDistribution.low,
      color: "bg-green-500",
    },
    {
      label: "Medium",
      value: analytics.complexityDistribution.medium,
      color: "bg-yellow-500",
    },
    {
      label: "High",
      value: analytics.complexityDistribution.high,
      color: "bg-red-500",
    },
  ];

  const maxStatusValue = Math.max(...statusData.map((d) => d.value));
  const maxComplexityValue = Math.max(...complexityData.map((d) => d.value));

  return (
    <div className="max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-slate-600">
          Track your productivity and task metrics
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Tasks",
            value: analytics.totalTasks,
            icon: Target,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Completion Rate",
            value: `${analytics.completionRate.toFixed(1)}%`,
            icon: CheckCircle2,
            color: "from-green-500 to-emerald-500",
          },
          {
            label: "Average Priority",
            value: analytics.averagePriority.toFixed(0),
            icon: TrendingUp,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "AI Enhanced",
            value: analytics.tasksWithAI,
            icon: Brain,
            color: "from-purple-500 to-pink-500",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div
              className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mb-4`}
            >
              <metric.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-slate-600 text-sm mb-1">{metric.label}</p>
            <p className="text-3xl font-bold text-slate-800">{metric.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Status Distribution
            </h2>
          </div>

          <div className="space-y-6">
            {statusData.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-700">
                    {item.label}
                  </span>
                  <span className="font-bold text-slate-800">{item.value}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.value / maxStatusValue) * 100}%`,
                    }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Total</span>
              <span className="font-bold text-slate-800">
                {analytics.totalTasks} tasks
              </span>
            </div>
          </div>
        </motion.div>

        {/* Complexity Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-cyan-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Complexity Breakdown
            </h2>
          </div>

          <div className="space-y-6">
            {complexityData.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-700">
                    {item.label}
                  </span>
                  <span className="font-bold text-slate-800">{item.value}</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(item.value / maxComplexityValue) * 100}%`,
                    }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Average Priority</span>
              <span className="font-bold text-slate-800">
                {analytics.averagePriority.toFixed(1)}/100
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Overall Progress
        </h2>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-slate-700">
              Completion Progress
            </span>
            <span className="font-bold text-blue-600">
              {analytics.completionRate.toFixed(1)}%
            </span>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analytics.completionRate}%` }}
              transition={{ delay: 0.7, duration: 1 }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-slate-800">
              {analytics.statusDistribution.todo}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">Active</p>
            <p className="text-2xl font-bold text-blue-600">
              {analytics.statusDistribution.in_progress}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-sm text-slate-600 mb-1">Done</p>
            <p className="text-2xl font-bold text-green-600">
              {analytics.statusDistribution.completed}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
