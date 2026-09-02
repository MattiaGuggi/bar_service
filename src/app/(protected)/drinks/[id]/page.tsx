'use client'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Loader from '../../../../components/Loader'
import { ArrowLeft, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { drinkType } from '@/lib/types'

const Page = () => {
  const { id } = useParams()
  const router = useRouter()
  const drinkRef = useRef(null)
  const [drink, setDrink] = useState<drinkType | null>(null)
  const [image, setImage] = useState<string | Blob | undefined>(undefined)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:3000' : ''

  const fetchDrink = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/details`, { params: { id } })
      const data = response.data

      setDrink(data.drink[0])
    } catch (err) {
      console.error('Error getting drink', err)
    }
  }

  const searchPngImage = async () => {
    const searchParam = `${drink?.strDrink} cocktail png image`
    const response = await axios.get(`${API_URL}/search-image`, { params: { q: searchParam } })
    setImage(response.data)
  }

  const loadPage = async () => {
    await fetchDrink()
    await searchPngImage()
    setIsMounted(true)
  }

  const goBack = () => {
    router.push('/drinks')
  }

  useEffect(() => {
    loadPage()
  }, [])

  useGSAP(() => {
    if (drinkRef.current) {
      gsap.from(drinkRef.current, {
        opacity: 0,
        scale: 0.95,
        ease: 'power2.in',
        duration: 0.3,
        x: -500,
      })
    }
  }, [drink])

  if (!isMounted) return <Loader />

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-amber-500 selection:text-stone-950">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-140 h-140 bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Back Navigation Button */}
      <button
        onClick={goBack}
        className="absolute top-8 left-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-stone-100 backdrop-blur-xl transition-all duration-200 active:scale-95 shadow-xl group cursor-pointer z-20"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-amber-500" />
        <span className="text-xs font-semibold">Back to drinks</span>
      </button>

      {/* Main Details Presentation Card */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full bg-stone-900/60 border border-stone-800/80 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-black/80">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="uppercase tracking-widest text-[10px]">Recipe #{id}</span>
        </div>

        <h1 className="font-serif font-bold text-4xl sm:text-5xl tracking-tight text-stone-100 mb-10 text-center leading-tight">
          <span className="bg-linear-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
            {drink?.strDrink}
          </span>
        </h1>

        {/* Dynamic Image Container */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-amber-500 to-orange-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-45 transition duration-500" />
          <img
            ref={drinkRef}
            src={typeof image === 'string' ? image : undefined}
            alt={drink?.strDrink || 'Drink image'}
            className="relative rounded-3xl w-72 h-72 sm:w-80 sm:h-80 object-cover border border-stone-800/80 shadow-2xl bg-stone-950"
          />
        </div>
      </div>
    </div>
  )
}

export default Page