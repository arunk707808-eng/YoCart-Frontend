import React from 'react'
import { Button } from './ui/button'

const Hero = ({navigate}) => {
  return (
    <div
  className="relative h-[calc(100vh-100px)] bg-cover bg-center"
  style={{
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url('/hero page.png')
    `,
  }}
>
  <div className="flex h-full items-center px-16 text-white">
    <div className="max-w-xl text-center md:text-left">
      <h1 className="text-4xl sm:text-6xl font-serif font-semibold leading-tight mb-6">
        Make a <br /> Improveries.
      </h1>

      <p className="text-lg sm:text-xl mb-8 text-white/90">
        Discover amazing products and deals just for you.
      </p>

      <Button
        onClick={() => navigate("/product")}
        size="lg"
        className="bg-white text-emerald-600 hover:bg-white/90 rounded-full px-8"
      >
        Shop Now
      </Button>

    </div>
  </div>
</div>

  )
}

export default Hero
