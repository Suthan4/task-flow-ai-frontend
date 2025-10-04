import type { Task } from "../types";

export const calculateAIPriority = (task: Task): number => {
  let score = 50;

  if (task.priority === "urgent") score += 30;
  else if (task.priority === "high") score += 20;
  else if (task.priority === "medium") score += 10;

  if (task.dueDate) {
    const daysUntilDue = Math.floor(
      (new Date(task.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDue < 0) score += 20;
    else if (daysUntilDue === 0) score += 15;
    else if (daysUntilDue <= 2) score += 10;
    else if (daysUntilDue <= 7) score += 5;
  }

  if (task.status === "in_progress") score += 5;

  return Math.min(100, Math.max(0, score));
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "low":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "todo":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const sortTasksByAIPriority = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => b.aiPriorityScore - a.aiPriorityScore);
};
