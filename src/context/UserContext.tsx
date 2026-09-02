'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'
import { userType } from '@/lib/types'

interface User {
  _id?: string
  username?: string
  email?: string
  password?: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  logout: () => void
  login: (loggedUser: userType) => void
  isLoading: boolean
}

const APP_PREFIX = 'bar_service_'
const AUTH_KEY = `${APP_PREFIX}isAuthenticated`
const USER_KEY = `${APP_PREFIX}user`

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  const clearAuth = () => {
    setUser(null)
    setIsAuthenticated(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }

  const logout = () => {
    clearAuth()
    router.push('/login')
  }

  const login = (loggedUser: userType) => {
    setUser(loggedUser)
    setIsAuthenticated(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, 'true')
      localStorage.setItem(USER_KEY, JSON.stringify(loggedUser))
    }
  }

  useEffect(() => {
    const verifyAndRestoreSession = async () => {
      if (typeof window === 'undefined') return

      const storedAuth = localStorage.getItem(AUTH_KEY)
      const storedUserRaw = localStorage.getItem(USER_KEY)

      if (storedAuth === 'true' && storedUserRaw) {
        try {
          const parsed: User = JSON.parse(storedUserRaw)

          if (parsed?._id) {
            // Optimistically set state from localStorage first
            setUser(parsed)
            setIsAuthenticated(true)

            // Validate against backend
            const response = await axios.get('/api/user', {
              params: { userId: parsed._id },
            })

            const fetchedUser = response.data?.user || response.data
            if (fetchedUser && fetchedUser._id) {
              setUser(fetchedUser)
              localStorage.setItem(USER_KEY, JSON.stringify(fetchedUser))
            }
          } else {
            clearAuth()
          }
        } catch (error: any) {
          console.error('Session verification error:', error)
          // Only clear auth if server explicitly says user is invalid (401 or 404)
          if (error.response?.status === 401 || error.response?.status === 404) {
            clearAuth()
          }
        }
      } else {
        clearAuth()
      }

      setIsLoading(false)
    }

    verifyAndRestoreSession()
  }, [])

  // Client-side route protection
  useEffect(() => {
    if (isLoading) return

    const isPublicRoute = pathname === '/login' || pathname === '/signup'

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login')
    } else if (isAuthenticated && isPublicRoute) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser))
      localStorage.setItem(AUTH_KEY, 'true')
    } else {
      clearAuth()
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: handleSetUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        login,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context
}