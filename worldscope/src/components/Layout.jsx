
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <main className='relative min-h-screen overflow-hidden scroll-smooth'>
      {/* Gradient background */}
      <div className='fixed -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10'></div>
      <div className='fixed -bottom-0 -right-28 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/20 to-green-500/20 rounded-full blur-[80px] -z-10'></div>

      <div className='overflow-hidden'>
        <Navbar />
        {children}
      </div>
    </main>
  )
}

export default Layout
