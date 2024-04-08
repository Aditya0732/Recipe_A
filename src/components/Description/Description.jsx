import React from 'react'

const Description = ({ recipe, nutrition }) => {
    return (
        <div className='block lg:flex  gap-8'>
            <div className='block w-full lg:w-1/2'>
                <h1 className='font-[Playfair-Display,serif] font-bold text-4xl mt-4'>Ingredients</h1>
                <div className='flex flex-col gap-3 mt-4'>
                    {recipe.extendedIngredients.map((ingredient, index) => (
                        <div className='flex gap-4 items-center'>
                            <input
                                type='checkbox'
                                className='w-6 h-6 rounded-full'
                            />
                            <h1 className='text-sm lg:text-lg w-fit'>{ingredient.original}</h1>
                        </div>
                    ))}
                    <div className='mt-6 p-6 bg-[#f9f9f9] rounded-lg w-full lg:w-3/4'>
                        <h1 className='font-[Playfair-Display,serif] font-semibold text-3xl'>Nutrition Facts</h1>
                        <div className='block mt-4'>
                            {nutrition.nutrients.map((nutrient, index) => (
                                <div key={index} className='flex justify-between border-b border-b-[#E0E0E0] lg:text-base text-sm py-2'>
                                    <h1 className='text-[#7f7f7f]'>{nutrient.name}</h1>
                                    <div>
                                        <span>{nutrient.amount}</span>
                                        <span>{nutrient.unit}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
            <div className='block w-full lg:w-1/2'>
                <h1 className='font-[Playfair-Display,serif] font-bold text-4xl mt-4'>Instructions</h1>
                {recipe.analyzedInstructions.length === 0 ? (
                    <div className='p-6 border border-gray-200 rounded-xl mt-4'>
                        <h1 className='text-lg'>No instructions available</h1>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 mt-4'>
                        {recipe.analyzedInstructions.map((instruction, index) => (
                            <div key={index} className='flex flex-col gap-4'>
                                {instruction.steps.map((step, stepIndex) => (
                                    <div key={stepIndex} className='flex gap-4 items-start'>
                                        <span className='bg-[#ff642b] px-3 py-1 text-white rounded-full'>{step.number}</span>
                                        <h1 className='text-sm lg:text-lg w-fit'>{step.step}</h1>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>


        </div>
    )
}

export default Description