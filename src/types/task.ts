export interface Task {
  _id: string;
  title: string;
  description?: string;
  priority: number;
  status: "todo" | "in_progress" | "completed";
  tags: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  aiAnalysis?: {
    priorityScore: number;
    complexity: "low" | "medium" | "high" | "very_high";
    suggestedTags: string[];
    insights: string[];
  };
  subtasks?: Subtask[];
}

export interface Subtask {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface Analytics {
  totalTasks: number;
  statusDistribution: {
    todo: number;
    in_progress: number;
    completed: number;
  };
  complexityDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  averagePriority: number;
  completionRate: number;
  tasksWithAI: number;
}

export interface Recommendations {
  focusNow: Array<{
    id: string;
    title: string;
    reason: string;
  }>;
  overdue: Array<{
    id: string;
    title: string;
    dueDate: string;
    daysOverdue: number;
  }>;
  needsBreakdown: Array<{
    id: string;
    title: string;
    complexity: string;
  }>;
  summary: {
    totalTasks: number;
    completedTasks: number;
    overdueCount: number;
    highPriorityCount: number;
  };
}
