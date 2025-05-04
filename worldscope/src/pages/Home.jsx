import React from 'react'
import {Link} from 'react-router-dom'
import heroImage from '../assets/heroImage.png'
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
    <section className='container mx-auto flex flex-col md:flex-row justify-between items-center pt-10 md:pt-44 pb-6 px-4 sm:px-6 lg:px-8'>
        {/* left column */}
        <div className='w-full md:w-1/2 space-y-8 mt-16 md:mt-0 pl-0 md:pl-20'>
            {/* tagline */}
            <Link to='/countries'>
                <div className='flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group'>
                    <span className='group-hover:scale-110 transition-transform'>🌎</span>
                    <span className='text-sm font-medium'>The World, Organized for You</span>
                </div>
            </Link>

            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'><span className='text-blue-600 relative '>Every Country Has a Story</span> — Discover with <span className='font-extrabold'>WorldScope.</span><span className='inline-block ml-2 animate-pulse'>🔎</span></h1>

            <p className='text-gray-600 text-sm md:text-base max-w-xl'>WorldScope makes it easy to explore and learn about countries around the globe. From flags and capitals to populations and regions, get quick access to essential country information. Whether you’re curious, studying, or just browsing, everything you need is just a click away.</p>
        </div>

        {/* right column */}
        <div className='w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-25'>
        <div className='relative'>
          <img src={heroImage} alt='hero image' className='rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300 '/>
        </div>
        </div>
    </section>
    </Layout>
  )
}

export default Home;
