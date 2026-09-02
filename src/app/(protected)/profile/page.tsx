'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import Toast from '@/components/Toast'
import {
  User as UserIcon,
  Mail,
  Lock,
  ShieldCheck,
  GlassWater,
  LogOut,
  ArrowLeft,
  Loader2,
  Check,
} from 'lucide-react'

export default function ProfilePage() {
  const { user, setUser, logout, isLoading } = useUser()
  const router = useRouter()

  // Local form state to hold uncommitted changes
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Sync form data whenever user context hydrates/updates
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: user.password || '',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    if (error) setError(null)
  }

  const handleCancel = () => {
    // Reset form data to existing context or navigate back
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: user.password || '',
      })
    }
    router.push('/')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)
    setError(null)

    const updatedUser = { ...user, ...formData }

    try {
      const response = await axios.post('/api/user', { user: updatedUser })
      const data = response.data

      if (data.success) {
        setUser(updatedUser) // Persist updated user state & cookie via UserContext
        setMessage(data.message || 'Profile updated successfully!')
      } else {
        setError(data.message || 'Failed to update profile.')
      }
    } catch (err) {
      console.error('Error updating user profile:', err)
      setError('An unexpected error occurred while saving.')
    } finally {
      setIsSaving(false)
    }
  }

  // 1. Loading Guard: Wait for UserContext cookie hydration
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-xs uppercase tracking-widest font-mono">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden selection:bg-amber-500 selection:text-stone-950">
      {/* Ambient Lighting Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Toast Notifications */}
      {message && <Toast type="success" message={message} onClose={() => setMessage(null)} />}
      {error && <Toast type="error" message={error} onClose={() => setError(null)} />}

      <div className="relative z-10 w-full max-w-lg">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-semibold transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Profile Card Form */}
        <div className="bg-stone-900/60 backdrop-blur-2xl border border-stone-800/80 rounded-3xl p-8 shadow-2xl shadow-black/80">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/20 text-xs font-semibold tracking-wider text-amber-400 mb-4 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <span className="uppercase tracking-widest text-[10px]">Account Settings</span>
            </div>
            <h1 className="text-3xl font-serif font-bold tracking-tight text-stone-100">
              Mixologist Profile
            </h1>
          </div>

          {/* Avatar Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-amber-500 via-amber-600 to-orange-600 flex items-center justify-center text-stone-950 text-2xl font-bold shadow-lg shadow-amber-500/20 mb-3 border border-amber-400/30">
              {formData.username ? (
                formData.username.charAt(0).toUpperCase()
              ) : (
                <GlassWater className="w-8 h-8" />
              )}
            </div>
            <p className="text-xs text-stone-400 font-light">
              {formData.email ? `Logged in as ${formData.email}` : 'Update your account details below'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider ml-1">
                Username
              </label>
              <div className="relative flex items-center">
                <UserIcon className="absolute left-3.5 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="MasterMixer"
                  className="w-full pl-11 pr-4 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="mixologist@bar.com"
                  className="w-full pl-11 pr-4 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-stone-500 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all duration-200"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-stone-800/80">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="py-3 px-5 bg-stone-800/80 hover:bg-stone-800 text-stone-300 border border-stone-700/60 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 py-3 px-6 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all duration-200 shadow-lg shadow-amber-500/10 active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-3" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}