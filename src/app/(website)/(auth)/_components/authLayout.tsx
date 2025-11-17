interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen mx-auto bg-[#DEEEFF] grid grid-cols-1 md:grid-cols-1">

      <div className="flex items-center justify-center px-5 w-full h-full">
        <div className="w-full max-w-xl flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
