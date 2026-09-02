'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { userType } from '@/lib/types'
import { User, Mail, Lock, UserPlus, AlertCircle, GlassWater } from 'lucide-react'

const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<userType>({ username: '', email: '', password: '' })
  const [error, setError] = useState<string>('')
  const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post('/api/signup', payload);
      const data = response.data;

      if (data.success) {
        router.push('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-stone-950 text-stone-100 px-4 overflow-hidden selection:bg-amber-500 selection:text-stone-950">
      <div className="absolute top-1/3 right-1/2 translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Header Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/20 text-xs font-semibold tracking-wider text-amber-400 backdrop-blur-md shadow-lg shadow-black/40">
            <GlassWater className="w-3.5 h-3.5 text-amber-500" />
            <span className="uppercase tracking-widest text-[10px]">Start Crafting</span>
          </div>
        </div>

        {/* Card Container */}
        <div className="bg-stone-900/60 backdrop-blur-2xl border border-stone-800/80 rounded-3xl p-8 shadow-2xl shadow-black/80">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-serif font-bold tracking-tight text-stone-100 mb-2">Create Account</h2>
            <p className="text-xs text-stone-400 font-light">Join to discover, save, and craft custom drink recipes</p>
          </div>

          <form onSubmit={signup} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300 tracking-wide uppercase text-[10px] ml-1">Username</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300 tracking-wide uppercase text-[10px] ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-stone-300 tracking-wide uppercase text-[10px] ml-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 mt-2 bg-linear-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 active:scale-[0.98] text-stone-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Join Lounge</span>
              <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
            </button>
          </form>

          {/* Existing Account Link */}
          <div className="mt-8 pt-6 border-t border-stone-800/60 text-center text-xs text-stone-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="font-semibold text-amber-400 hover:text-amber-300 transition-colors ml-1 inline-flex items-center hover:underline"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page