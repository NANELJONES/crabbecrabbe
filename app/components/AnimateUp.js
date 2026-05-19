"use client"
import { motion } from 'framer-motion'
import React, { Children } from 'react'


const AnimateUp = ({children}) => {
  return (
<>
<motion.div 
initial ={{opacity:0, y:-20}}
whileInView={{opacity:1, y:0}}
transition={{duration:1}}

className='relative w-full'
 
 >
    {children}
</motion.div>
</>
  
)
}

export default AnimateUp