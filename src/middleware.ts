import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const user = request.cookies.get('user')?.value
  const { pathname } = request.nextUrl

  const isPublicRoute = pathname === '/login' || pathname === '/signup'
  // Require BOTH token and user to consider the request authenticated
  const isAuthenticated = Boolean(token && user)

  // 1. If not authenticated and trying to access a protected route -> go to /login
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 2. If authenticated and trying to access /login or /signup -> go to /
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}