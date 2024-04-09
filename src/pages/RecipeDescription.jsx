import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa';
import { MdOutlineTurnSharpRight } from 'react-icons/md'
import Description from '../components/Description/Description';
import SimilarRecipes from '../components/Description/SimilarRecipes';
import { GoDotFill } from 'react-icons/go';

const RecipeDescription = () => {
    const [loader, setLoader] = useState(false);
    const [recipe, setRecipe] = useState(null);
    const [nutrition, setNutrition] = useState(null);

    function extractIdFromPageUrl(pageUrl) {
        const parts = pageUrl.split('/');
        return parts[parts.length - 1];
    }

    useEffect(() => {
        const currentPageUrl = window.location.href;
        const recipeId = extractIdFromPageUrl(currentPageUrl);
        // Check local storage for existing recipe data
        const storedRecipe = localStorage.getItem(`recipe_${recipeId}`);
        if (storedRecipe) {
            setRecipe(JSON.parse(storedRecipe));
        } else {
            setLoader(true);
            axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=84a634f7e198482e9c4ee29a5d3d00c6`)
                .then(response => {
                    setRecipe(response.data);
                    console.log(response.data);
                    localStorage.setItem(`recipe_${recipeId}`, JSON.stringify(response.data));
                    setLoader(false);
                })
                .catch(error => console.error('Error fetching recipe:', error.message));
        }

        // Check local storage for existing nutrition data
        const storedNutrition = localStorage.getItem(`nutrition_${recipeId}`);
        if (storedNutrition) {
            setNutrition(JSON.parse(storedNutrition));
        } else {
            setLoader(true);
            axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=84a634f7e198482e9c4ee29a5d3d00c6`)
                .then(response => {
                    setNutrition(response.data);
                    localStorage.setItem(`nutrition_${recipeId}`, JSON.stringify(response.data));
                    setLoader(false);
                })
                .catch(error => console.error('Error fetching nutrition:', error.message));
        }
    }, []);

    const [dotCount, setDotCount] = useState(1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDotCount(count => (count === 3 ? 1 : count + 1));
        }, 300); // Change the interval as needed

        return () => clearInterval(intervalId);
    }, []);

    const renderDots = () => {
        switch (dotCount) {
            case 1:
                return <GoDotFill size={24} color='white' />;
            case 2:
                return (
                    <>
                        <GoDotFill size={24} color='white' />
                        <GoDotFill size={24} color='white' />
                    </>
                );
            case 3:
                return (
                    <>
                        <GoDotFill size={24} color='white' />
                        <GoDotFill size={24} color='white' />
                        <GoDotFill size={24} color='white' />
                    </>
                );
            default:
                return null;
        }
    };

    return (

        <>
            {loader && (
                <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50">
                    <div className='flex gap-2 px-3 h-fit py-1 bg-[#ff642b] rounded-b-lg z-[70]'>
                        {renderDots()}
                    </div>
                </div>
            )}
            {recipe && nutrition && (
                <div className="flex justify-center p-6">
                    <div className="w-[95%] lg:w-3/4">
                        <div className='flex gap-1'>
                            <span><MdOutlineTurnSharpRight color='#ff642b' size={28} /></span>
                            <h1 className='text-sm font-semibold'>85% would make this again</h1>
                        </div>
                        <h1 className='font-[Playfair-Display,serif] font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-6'>{recipe.title}</h1>
                        <div className='flex gap-6 py-8 border-b border-[#E0E0E0]'>
                            <div className='flex gap-2 items-center'>
                                <span><FaHeart size={16} color='#ff642b' /></span>
                                <h1 className='text-sm font-semibold'>{recipe.aggregateLikes} likes</h1>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span><FaHeart size={16} color='#ff642b' /></span>
                                <h1 className='text-sm font-semibold'>{recipe.aggregateLikes} likes</h1>
                            </div>
                        </div>
                        <div className='py-8'>
                            <h1 className='text-sm md:text-base lg:text-lg xl:text-xl' dangerouslySetInnerHTML={{ __html: recipe.summary }}></h1>
                        </div>
                        <img src={recipe.image} alt='hero' className='w-full rounded-xl' />
                        <div className='py-10 flex'>
                            <div className='flex flex-col gap-1 pr-4 border-r border-r-[#E0E0E0]'>
                                <h1 className='text-xs text-[#7f7f7f]'>PREP TIME</h1>
                                <h1>{recipe.readyInMinutes} Mins</h1>
                            </div>
                            <div className='flex flex-col gap-1 px-4 border-r border-r-[#E0E0E0]'>
                                <h1 className='text-xs text-[#7f7f7f]'>Servings</h1>
                                <h1>{recipe.servings} People</h1>
                            </div>
                        </div>
                        <Description recipe={recipe} nutrition={nutrition} />
                        <div className='block mt-12'>
                            <h1 className='font-[Playfair-Display,serif] font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl '>Already made this?</h1>
                            <div className='py-6'>
                                <button className='px-6 py-2 hover:text-white hover:bg-black rounded border border-black hover:transition-all duration-500 ease-in-out'>
                                    Share your feedback
                                </button>
                            </div>
                            <div className='bg-[#ff642b] p-[6px] rounded-xl w-full mt-4'></div>
                        </div>
                        <SimilarRecipes recipe={recipe} />
                    </div>
                </div>
            )}
        </>
    )
}

export default RecipeDescription