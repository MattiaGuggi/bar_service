'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

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
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const rawUserCookie = Cookies.get('user')

    if (rawUserCookie) {
      try {
        // Decode URI before parsing
        const decoded = decodeURIComponent(rawUserCookie)
        const parsed = JSON.parse(decoded)

        setUser(parsed)
        setIsAuthenticated(true)
      } catch (e) {
        logout()
      }
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }

    setIsLoading(false)
  }, [])

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser)
    if (newUser) {
      Cookies.set('user', JSON.stringify(newUser), { expires: 7, path: '/' })
    } else {
      Cookies.remove('user', { path: '/' })
    }
  }

  const logout = () => {
    // Explicitly target root path when removing cookies
    Cookies.remove('token', { path: '/' })
    Cookies.remove('user', { path: '/' })

    setUser(null)
    setIsAuthenticated(false)

    router.push('/login')
    router.refresh()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: handleSetUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
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