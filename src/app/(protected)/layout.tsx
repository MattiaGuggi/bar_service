import Navbar from '@/src/components/Navbar'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-20">
        {children}
      </div>
    </>
  )
}