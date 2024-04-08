import React from 'react'

const PopularCategories = () => {
    return (
        <div className='mt-10'>
            <h1 className='font-[Playfair-Display,serif] font-bold text-4xl'>Popular Categories</h1>
            <div className='flex flex-wrap justify-center gap-7 mt-8 '>
                <div className='flex flex-col gap-4 hover:text-[#ff642b] cursor-pointer'>
                    <img src='pasta.png' alt='hero' className='w-40 h-40 rounded-full' />
                    <div className='flex justify-center'>
                        <h1 className='text-xl font-semibold'>Pasta</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 hover:text-[#ff642b] cursor-pointer'>
                    <img src='pizza.png' alt='hero' className='w-40 h-40 rounded-full' />
                    <div className='flex justify-center'>
                        <h1 className='text-xl font-semibold'>Pizza</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 hover:text-[#ff642b] cursor-pointer'>
                    <img src='vegan.png' alt='hero' className='w-40 h-40 rounded-full' />
                    <div className='flex justify-center'>
                        <h1 className='text-xl font-semibold'>Vegan</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 hover:text-[#ff642b] cursor-pointer'>
                    <img src='deserts.png' alt='hero' className='w-40 h-40 rounded-full' />
                    <div className='flex justify-center'>
                        <h1 className='text-xl font-semibold'>Desserts</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 hover:text-[#ff642b] cursor-pointer'>
                    <img src='smoothies.png' alt='hero' className='w-40 h-40 rounded-full' />
                    <div className='flex justify-center'>
                        <h1 className='text-xl font-semibold'>Smoothies</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-4 hover:text-[#ff642b] cursor-pointer'>
                    <img src='breakfast.png' alt='hero' className='w-40 h-40 rounded-full' />
                    <div className='flex justify-center'>
                        <h1 className='text-xl font-semibold'>Breakfast</h1>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PopularCategories