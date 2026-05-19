import React from 'react'


const Layout1 = ( {children}) => {
  return (
    <div  className='md:relative lg:px-0 px-2 py-[3em] sm:py-10 md:py-[4em] w-full lg:px-[4em]  mx-auto max-w-[1500px]'>
        {children}
       
    </div>
  )
}

export default Layout1