import { useState, useEffect } from "react";
import {
  Brain,
  Plus,
  LogOut,
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  CreditCard as Edit2,
  X,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router";
// import { Task } from "../types";
import {
  calculateAIPriority,
  getPriorityColor,
  getStatusColor,
  sortTasksByAIPriority,
} from "../utils/task.utils";
import type { Task } from "../types";



const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     priority: "medium" as Task["priority"],
//     dueDate: "",
//   });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

const navigate = useNavigate()

//   useEffect(() => {
//     if (user) {
//       const storedTasks = localStorage.getItem(`tasks_${user.id}`);
//       if (storedTasks) {
//         setTasks(JSON.parse(storedTasks));
//       }
//     }
//   }, [user]);

//   const saveTasks = (updatedTasks: any) => {
//     if (user) {
//       localStorage.setItem(`tasks_${user.id}`, JSON.stringify(updatedTasks));
//       setTasks(updatedTasks);
//     }
//   };

  const handleCreateTask = () => {
    // if (!formData.title.trim() || !user) return;

    // const newTask: Task = {
    //   id: crypto.randomUUID(),
    //   userId: user.id,
    //   title: formData.title,
    //   description: formData.description,
    //   status: "todo",
    //   priority: formData.priority,
    //   aiPriorityScore: 50,
    //   dueDate: formData.dueDate || undefined,
    //   createdAt: new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // };

    // newTask.aiPriorityScore = calculateAIPriority(newTask);
    // saveTasks([...tasks, newTask]);
    // resetForm();
  };

  const handleUpdateTask = () => {
    // if (!editingTask || !formData.title.trim()) return;

    // const updatedTask: Task = {
    //   ...editingTask,
    //   title: formData.title,
    //   description: formData.description,
    //   priority: formData.priority,
    //   dueDate: formData.dueDate || undefined,
    //   updatedAt: new Date().toISOString(),
    // };

    // updatedTask.aiPriorityScore = calculateAIPriority(updatedTask);
    // saveTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    // resetForm();
  };

  const handleDeleteTask = (taskId: string) => {
    // saveTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    // const updatedTasks = tasks.map((t) => {
    //   if (t.id === taskId) {
    //     const updated = {
    //       ...t,
    //       status: newStatus,
    //       completedAt:
    //         newStatus === "completed" ? new Date().toISOString() : undefined,
    //       updatedAt: new Date().toISOString(),
    //     };
    //     updated.aiPriorityScore = calculateAIPriority(updated);
    //     return updated;
    //   }
    //   return t;
    // });
    // saveTasks(updatedTasks);
  };

  const openEditModal = (task: Task) => {
    // setEditingTask(task);
    // setFormData({
    //   title: task.title,
    //   description: task.description,
    //   priority: task.priority,
    //   dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    // });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
    // setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    // logout();
    navigate("/landing");
  };

  const sortedTasks = sortTasksByAIPriority(tasks);
  const todoTasks = sortedTasks.filter((t) => t.status === "todo");
  const inProgressTasks = sortedTasks.filter((t) => t.status === "in_progress");
  const completedTasks = sortedTasks.filter((t) => t.status === "completed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <nav className="bg-white border-b border-teal-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">
              TaskFlow AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              {/* Welcome, {user?.fullName} */}
              Welcome, User
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Tasks
            </h1>
            <p className="text-gray-600">
              AI-powered prioritization helps you focus on what matters most
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-lg shadow-primary-600/20"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <TaskColumn
            title="To Do"
            tasks={todoTasks}
            onStatusChange={handleStatusChange}
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
            color="slate"
          />
          <TaskColumn
            title="In Progress"
            tasks={inProgressTasks}
            onStatusChange={handleStatusChange}
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
            color="blue"
          />
          <TaskColumn
            title="Completed"
            tasks={completedTasks}
            onStatusChange={handleStatusChange}
            onEdit={openEditModal}
            onDelete={handleDeleteTask}
            color="green"
          />
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-teal-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTask ? "Edit Task" : "Create New Task"}

              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-primary-600 focus:outline-none"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-primary-600 focus:outline-none h-24 resize-none"
                  placeholder="Add details about this task"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as Task["priority"],
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-primary-600 focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-primary-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-teal-200">
              <button
                onClick={resetForm}
                className="flex-1 px-6 py-3 border-2 border-teal-200 text-gray-700 rounded-lg hover:bg-teal-50 transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={editingTask ? handleUpdateTask : handleCreateTask}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold"
              >
                {editingTask ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  color: string;
}

const TaskColumn = ({
  title,
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskColumnProps) => {
  return (
    <div className="bg-white rounded-2xl border border-teal-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <span className="px-3 py-1 bg-teal-100 text-gray-700 rounded-full text-sm font-semibold">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard = ({
  task,
  onStatusChange,
  onEdit,
  onDelete,
}: TaskCardProps) => {
  const getNextStatus = (): Task["status"] => {
    if (task.status === "todo") return "in_progress";
    if (task.status === "in_progress") return "completed";
    return "todo";
  };

  const StatusIcon =
    task.status === "completed"
      ? CheckCircle2
      : task.status === "in_progress"
      ? Clock
      : Circle;

  return (
    <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 hover:shadow-md transition-all group">
      <div className="flex items-start gap-3 mb-3">
        <button
          onClick={() => onStatusChange(task.id, getNextStatus())}
          className="flex-shrink-0 mt-1 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <StatusIcon className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
          {task.description && (
            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
          )}
          <div className="flex flex-wrap gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.replace("_", " ")}
            </span>
            <span className="px-2 py-1 rounded text-xs font-medium bg-primary-600 text-white">
              AI: {task.aiPriorityScore}
            </span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white border border-teal-200 text-gray-700 rounded-lg hover:bg-teal-50 transition-colors"
        >
          <Edit2 className="w-3 h-3" />
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
