'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Drink from '@/components/Drink'
import Search from '@/components/Search'
import { useUser } from '@/context/UserContext'
import Loader from '@/components/Loader'
import { drinkType, ingredientType } from '@/lib/types'
import { Plus, X, Upload, Check, GlassWater } from 'lucide-react'

const Page = () => {
  const [ingredients, setIngredients] = useState<ingredientType[] | null>(null)
  const [allDrinks, setAllDrinks] = useState<drinkType[] | null>(null)

  const [drinks, setDrinks] = useState<drinkType[] | null>(null)
  const [drink, setDrink] = useState<Partial<drinkType> | null>(null)
  const [selectedIngredient, setSelectedIngredient] = useState<string>('')

  const [message, setMessage] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { user } = useUser()

  const fetchDrinks = async () => {
    try {
      const response = await axios.get('/api/drinks/all', {
        withCredentials: true,
      })
      setDrinks(response.data.drinks)
      setAllDrinks(response.data.drinks)
    } catch (err) {
      console.error('Error fetching drinks', err)
    }
  }

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('/api/ingredients', {
        withCredentials: true,
      })
      setIngredients(response.data.ingredients)
    } catch (error) {
      console.error('Error fetching ingredients:', error)
    }
  }

  const createDrink = async () => {
    if (!drink?.name) return

    try {
      const response = await axios.post('/api/drinks', {
        name: drink.name,
        ingredients: drink.ingredients || [],
        creator: user?._id,
        image: drink.image,
      })

      setMessage(response.data.message)
      fetchDrinks()
    } catch (err) {
      console.error('Error creating drink:', err)
    }
  }

  const handleOpenModal = () => {
    setDrink({ name: '', ingredients: [] })
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setDrink(null)
  }

  const handleConfirmCreate = async () => {
    await createDrink()
    handleCloseModal()
  }

  const addIngredient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedIngredient) return

    const ingredientToAdd = ingredients?.find(
      (ing) => ing?.strIngredient1 === selectedIngredient
    )

    // Explicitly type currentIngredients as an array of ingredient objects
    const currentIngredients = (drink?.ingredients || []) as (ingredientType & { image?: string })[]

    if (ingredientToAdd && !currentIngredients.some((ing) => ing?.strIngredient1 === selectedIngredient)) {
      const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${selectedIngredient.toLowerCase().replace(' ', '_')}-Small.png`

      setDrink((prev) => ({
        ...prev,
        ingredients: [...currentIngredients, { ...ingredientToAdd, image: imageUrl }],
      }))
      setSelectedIngredient('')
    }
  }

  const loadPage = async () => {
    await fetchDrinks()
    await fetchIngredients()
    setIsMounted(true)
  }

  useEffect(() => {
    loadPage()
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchIngredients()
    }
  }, [isOpen])

  if (!isMounted) return <Loader />

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center px-4 pt-16 pb-24 relative overflow-hidden selection:bg-amber-500 selection:text-stone-950">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-200 h-80 bg-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Toolbar & Controls */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-stone-900/60 border border-stone-800/80 p-4 sm:p-6 rounded-3xl backdrop-blur-2xl shadow-2xl shadow-black/80">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {drinks && (
            <Search mode="drinks" data={drinks} setData={setDrinks} originalData={allDrinks} />
          )}
          {ingredients && (
            <Search mode="ingredients" data={ingredients} setData={setIngredients} />
          )}
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 active:scale-[0.98] text-stone-950 font-bold text-sm rounded-2xl shadow-lg shadow-amber-500/10 transition-all duration-200 cursor-pointer w-full md:w-auto shrink-0"
          onClick={handleOpenModal}
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create a Drink</span>
        </button>
      </div>

      {/* Modal - Create Custom Drink */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-stone-900/90 border border-stone-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/90 w-full max-w-xl text-stone-100 max-h-[90vh] overflow-y-auto relative backdrop-blur-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <GlassWater className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-serif font-bold tracking-tight text-stone-100">
                  Craft Your Recipe
                </h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-stone-400 hover:text-stone-100 rounded-xl hover:bg-stone-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addIngredient} className="space-y-4">
              <input
                type="text"
                placeholder="Drink Name"
                value={drink?.name || ''}
                onChange={(e) =>
                  setDrink((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-3 bg-stone-950/80 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all"
              />

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-stone-800 hover:border-amber-500/30 rounded-2xl p-5 text-center transition-colors bg-stone-950/40">
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () =>
                        setDrink((prev) => ({
                          ...prev,
                          image: reader.result as string,
                        }))
                      reader.readAsDataURL(file)
                    }
                  }}
                />
                <div className="flex flex-col items-center justify-center gap-2 text-stone-400">
                  <Upload className="w-6 h-6 text-stone-500" />
                  <span className="text-xs font-medium">Click or drag image to upload preview</span>
                </div>
              </div>

              {drink?.image && (
                <div className="flex justify-center my-2">
                  <img
                    src={drink.image as string}
                    alt={drink.name || 'Drink preview'}
                    className="h-24 w-24 object-cover rounded-2xl border border-amber-500/20 shadow-lg shadow-black/50"
                  />
                </div>
              )}

              {/* Ingredient Selection Dropdown */}
              <div className="flex gap-2">
                <select
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                  className="flex-1 bg-stone-950/80 border border-stone-800 px-4 py-3 rounded-xl text-stone-200 text-sm focus:outline-none focus:border-amber-500/60 transition-all"
                >
                  <option value="" className="bg-stone-900 text-stone-500">
                    Choose an ingredient
                  </option>
                  {ingredients?.map((ing, idx) => (
                    <option key={idx} value={ing.strIngredient1} className="bg-stone-900 text-stone-200">
                      {ing.strIngredient1}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="px-5 py-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-amber-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>

            {/* Added Ingredients Badge Grid */}
            <div className="mt-6 pt-6 border-t border-stone-800/80">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 block text-[10px]">
                Selected Ingredients
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-36 overflow-y-auto pr-1">
                {drink?.ingredients?.map((ing, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 bg-stone-950/80 border border-stone-800 rounded-xl"
                  >
                    <img
                      src={ing.image}
                      alt={ing?.strIngredient1}
                      className="h-8 w-8 rounded-lg object-cover bg-stone-900 border border-stone-800"
                    />
                    <p className="text-xs text-stone-300 font-medium truncate">{ing?.strIngredient1}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-stone-800/80">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Exit
              </button>
              <button
                onClick={handleConfirmCreate}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/10 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-3" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Banner */}
      {message && (
        <div className="fixed bottom-6 right-6 z-40 bg-stone-900/90 border border-amber-500/30 text-amber-400 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-2.5 text-sm font-medium">
          <Check className="w-4 h-4 text-amber-500" />
          <span>{message}</span>
        </div>
      )}

      {/* Drinks Cards Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-8 relative z-10">
        {Array.isArray(drinks) &&
          drinks.map((drinkItem, idx) => <Drink key={idx} drink={drinkItem} />)}
      </div>
    </div>
  )
}

export default Page