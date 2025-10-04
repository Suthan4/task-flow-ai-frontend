import { useState } from "react";
import { Brain, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
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
            Create your account
          </h1>
          <p className="text-gray-600">
            Start managing your tasks intelligently
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  {...register("fullName")}
                  className={`w-full pl-11 pr-4 py-3 border-2 border-gray-200 ${
                    errors.fullName?.message && "border-red-400"
                  } rounded-lg focus:border-primary-600 ${
                    errors.fullName?.message && "focus:border-red-600"
                  } focus:outline-none transition-colors disabled:bg-gray-200 border-gray-300 cursor-not-allowed`}
                  placeholder="John Doe"
                  disabled={true}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.fullName?.message}
                </p>
              )}
            </div>

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
                  disabled
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
                  placeholder="Min. 6 characters"
                  disabled
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={`w-full pl-11 pr-4 py-3 border-2 border-gray-200 ${
                    errors.confirmPassword?.message && "border-red-400"
                  } rounded-lg focus:border-primary-600 ${
                    errors.confirmPassword?.message && "focus:border-red-600"
                  } focus:outline-none transition-colors disabled:bg-gray-200 border-gray-300 cursor-not-allowed`}
                  placeholder="Confirm your password"
                  disabled
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={false}
              className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all font-semibold shadow-lg shadow-primary-600/20 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-gray-800 hover:text-gray-600 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
