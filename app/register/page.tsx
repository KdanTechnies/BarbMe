"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Scissors,
  UserCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

type RegisterFormData = {
  full_name: string;
  email: string;
  phone: string;
  nin?: string;
  password: string;
  role: "customer" | "barber";
};

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      nin: "",
      password: "",
      role: "customer",
    },
  });

  // Role watcher and selector
  const role = watch("role");

  const onRegister: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);

    try {
      await api.post("/auth/register", data);

      router.push("/login?status=success");
    } catch (err: any) {
      alert(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl bg-[#111] border border-white/5 p-8 md:p-12 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black italic tracking-tighter text-white">
            BARB<span className="text-[#FF4D1C]">ME.</span>
          </h1>

          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">
            Join the Elite Grooming Network
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onRegister)}
          className="space-y-6"
        >
          {/* ROLE SELECTOR */}
          <div className="flex gap-4 p-1 bg-black border border-white/5 rounded-none mb-8">
            {/* CUSTOMER */}
            <label className="flex-1 cursor-pointer group">
              <input
                type="radio"
                {...register("role")}
                value="customer"
                className="sr-only"
              />

              <div
                className={`py-4 text-center transition-all ${
                  role === "customer"
                    ? "bg-[#FF4D1C] text-white"
                    : "text-gray-600 group-hover:text-gray-300"
                }`}
              >
                <UserCircle
                  className="mx-auto mb-1"
                  size={20}
                />

                <span className="text-[10px] font-black uppercase tracking-widest">
                  Looking for barbers
                </span>
              </div>
            </label>

            {/* BARBER */}
            <label className="flex-1 cursor-pointer group">
              <input
                type="radio"
                {...register("role")}
                value="barber"
                className="sr-only"
              />

              <div
                className={`py-4 text-center transition-all ${
                  role === "barber"
                    ? "bg-[#FF4D1C] text-white"
                    : "text-gray-600 group-hover:text-gray-300"
                }`}
              >
                <Scissors
                  className="mx-auto mb-1"
                  size={20}
                />

                <span className="text-[10px] font-black uppercase tracking-widest">
                  I am a Barber
                </span>
              </div>
            </label>
          </div>

          {/* FULL NAME + EMAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Full Name
              </label>

              <input
                {...register("full_name", {
                  required: "Full name is required",
                })}
                className="w-full bg-black border border-white/10 p-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none"
                required
              />

              {errors.full_name && (
                <p className="text-red-500 text-[9px]">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Email Address
              </label>

              <input
                {...register("email", {
                  required: "Email address is required",
                })}
                type="email"
                className="w-full bg-black border border-white/10 p-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none"
                required
              />

              {errors.email && (
                <p className="text-red-500 text-[9px]">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* PHONE + NIN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* PHONE */}
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Phone Number
              </label>

              <input
                {...register("phone", {
                  required: "Phone number is required",
                })}
                type="tel"
                className="w-full bg-black border border-white/10 p-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none"
                required
              />

              {errors.phone && (
                <p className="text-red-500 text-[9px]">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* CONDITIONAL NIN FIELD */}
            <AnimatePresence>
              {role === "barber" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1"
                >
                  <label className="text-[9px] font-black text-[#FF4D1C] uppercase tracking-widest ml-1 italic">
                    NIN (Verification Required)
                  </label>

                  <input
                    {...register("nin", {
                      required:
                        role === "barber"
                          ? "NIN is required for barbers"
                          : false,
                      pattern: {
                        value: /^\d{11}$/,
                        message: "NIN must be exactly 11 digits",
                      },
                    })}
                    type="text"
                    inputMode="numeric"
                    maxLength={11}
                    className="w-full bg-black border border-[#FF4D1C]/30 p-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none"
                    placeholder="11 DIGIT NUMBER"
                    required={role === "barber"}
                  />

                  {errors.nin && (
                    <p className="text-red-500 text-[9px]">
                      {errors.nin.message}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Create Password
            </label>

            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className="w-full bg-black border border-white/10 p-4 text-white text-xs font-bold focus:border-[#FF4D1C] outline-none"
              required
            />

            {errors.password && (
              <p className="text-red-500 text-[9px]">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FF4D1C] py-6 text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Create {role} Account
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* LOGIN REDIRECT */}
          <div className="text-center pt-4">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
              Already have an account?

              <Link
                href="/login"
                className="text-[#FF4D1C] hover:text-white transition-colors ml-2 border-b border-[#FF4D1C]/30 pb-0.5"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}