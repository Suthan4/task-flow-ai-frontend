import { useState } from "react";
import { Brain, Mail, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { siginSchema, type SigninFormData } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninFormData>({
    resolver: zodResolver(siginSchema),
  });
  const onSubmit = (data: SigninFormData) => {
    console.log("formdata", data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Brain className="w-10 h-10 text-primary-600" />
            <span className="text-3xl font-bold text-gray-800">
              TaskFlow AI
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">Sign in to continue to your dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full pl-11 pr-4 py-3 border-2 border-gray-200 ${
                    errors.email?.message && "border-red-400"
                  } rounded-lg focus:border-primary-600 ${
                    errors.email?.message && "focus:border-red-600"
                  } focus:outline-none transition-colors disabled:bg-gray-200 border-gray-300 cursor-not-allowed`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`w-full pl-11 pr-4 py-3 border-2 border-gray-200 ${
                    errors.password?.message && "border-red-400"
                  } rounded-lg focus:border-primary-600 ${
                    errors.password?.message && "focus:border-red-600"
                  } focus:outline-none transition-colors disabled:bg-gray-200 border-gray-300 cursor-not-allowed`}
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              {/* <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-gray-600">Remember me</span>
              </label> */}
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-primary-700 hover:text-primary-600 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={false}
              className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-lg shadow-primary-600/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-primary-700 hover:text-primary-600 font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
