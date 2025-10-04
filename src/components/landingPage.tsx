import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  BarChart3,
  Zap,
  CheckCircle2,
  Target,
  ArrowRight,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-2 mb-8"
          >
            <Sparkles className="w-5 h-5 text-blue-300" />
            <span className="text-blue-100 font-medium">
              AI-Powered Task Management
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Manage Tasks
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Effortlessly with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Transform your productivity with intelligent task creation,
            automatic prioritization, and AI-driven insights. Just describe what
            you need to do, and let AI handle the rest.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/60 transition-all"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid md:grid-cols-3 gap-8 mt-32"
        >
          {[
            {
              icon: Brain,
              title: "Natural Language Input",
              description:
                "Just type what you need to do. AI understands context, urgency, and automatically sets priorities.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: Target,
              title: "Smart Prioritization",
              description:
                "AI analyzes complexity and deadlines to help you focus on what matters most right now.",
              color: "from-cyan-500 to-teal-500",
            },
            {
              icon: Zap,
              title: "Auto-Generate Subtasks",
              description:
                "Break down complex tasks into actionable steps with a single click using AI intelligence.",
              color: "from-teal-500 to-green-500",
            },
            {
              icon: BarChart3,
              title: "Analytics Dashboard",
              description:
                "Visualize your productivity with comprehensive stats and completion metrics.",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: CheckCircle2,
              title: "AI Recommendations",
              description:
                "Get personalized suggestions on what to tackle next based on priority and deadlines.",
              color: "from-emerald-500 to-blue-500",
            },
            {
              icon: Sparkles,
              title: "Manual Control",
              description:
                "Prefer hands-on management? Create and customize tasks manually with full control.",
              color: "from-blue-500 to-cyan-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
            >
              <div
                className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-blue-100/80 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-12"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your workflow?
          </h2>
          <p className="text-blue-100/80 mb-8 text-lg">
            Start managing tasks smarter, not harder.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-white/20 transition-all"
          >
            Launch Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
