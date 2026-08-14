'use client'
import Link from 'next/link'
import { ArrowRight, GlassWater, Search, Sparkles, User } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950 text-stone-100 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Warm Ambient Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-152 h-152 bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center max-w-4xl px-6 py-20 text-center">
        {/* Brand Header Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 border border-stone-800 backdrop-blur-md shadow-xl mb-10">
          <GlassWater className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase text-[10px]">
            Bar Service Engine
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-stone-100 mb-6 leading-tight">
          Craft Exceptional Drinks with <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-500 to-orange-500">
            Precision & Passion
          </span>
        </h1>

        {/* Hero Paragraph */}
        <p className="max-w-xl text-base sm:text-lg text-stone-400 font-light leading-relaxed mb-10">
          Discover curated cocktail recipes, search drink menus by key ingredients, and manage your personalized mixologist profile.
        </p>

        {/* Action Button Row */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <Link
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 px-6 text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/10 cursor-pointer"
            href="/drinks"
          >
            <Search className="w-4 h-4 text-stone-950" />
            <span>Explore Recipes</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </Link>

          <Link
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/30 px-6 text-sm font-semibold text-stone-200 transition-all duration-200 hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            href="/profile"
          >
            <User className="w-4 h-4 text-stone-400" />
            <span>Mixologist Profile</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full text-left">
          <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-sm font-semibold text-stone-200 mb-1">Curated Cocktails</h3>
            <p className="text-xs text-stone-400">Detailed ingredient measures and step-by-step mixology instructions.</p>
          </div>
          <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm">
            <GlassWater className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-sm font-semibold text-stone-200 mb-1">Ingredient Search</h3>
            <p className="text-xs text-stone-400">Find what you can make using spirits and mixers you already have.</p>
          </div>
          <div className="p-5 rounded-2xl bg-stone-900/40 border border-stone-800/60 backdrop-blur-sm">
            <User className="w-5 h-5 text-amber-500 mb-2" />
            <h3 className="text-sm font-semibold text-stone-200 mb-1">Custom Profile</h3>
            <p className="text-xs text-stone-400">Save your signature credentials and bar preferences seamlessly.</p>
          </div>
        </div>
      </main>
    </div>
  )
}