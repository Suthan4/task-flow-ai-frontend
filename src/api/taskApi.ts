import type { Task, Analytics, Recommendations } from "../types/task";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const taskApi = {
  async createTaskWithAI(naturalLanguageInput: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ naturalLanguageInput }),
    });
    const result = await response.json();
    return result.data;
  },

  async createTaskManually(task: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const result = await response.json();
    return result.data;
  },

  async getAllTasks(filters?: {
    status?: string;
    tag?: string;
  }): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.tag) params.append("tag", filters.tag);

    const response = await fetch(`${API_BASE_URL}/tasks?${params.toString()}`);
    const result = await response.json();
    return result.data;
  },

  async getTask(id: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`);
    const result = await response.json();
    return result.data;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const result = await response.json();
    return result.data;
  },

  async deleteTask(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
  },

  async generateSubtasks(id: string): Promise<Task> {
    const response = await fetch(
      `${API_BASE_URL}/tasks/${id}/subtasks/generate`,
      {
        method: "POST",
      }
    );
    const result = await response.json();
    return result.data;
  },

  async getAnalytics(): Promise<Analytics> {
    const response = await fetch(`${API_BASE_URL}/tasks/analytics`);
    const result = await response.json();
    return result.data;
  },

  async getRecommendations(): Promise<Recommendations> {
    const response = await fetch(`${API_BASE_URL}/tasks/recommendations`);
    const result = await response.json();
    return result.data;
  },
};
