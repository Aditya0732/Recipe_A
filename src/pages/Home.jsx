import React from 'react'
import HeroImage from '../components/Home/HeroImage'
import PopularCategories from '../components/Home/PopularCategories'
import Categories from '../components/Categories/Categories'

const Home = () => {
    return (
        <div className="flex justify-center p-6">
            <div className="md:w-3/4 w-[95%] font-[Inter,sans-serif]">
                <HeroImage />
                <PopularCategories/>
                <Categories query={"Pizza"}/>
                <Categories query={"Pasta"}/>
                <Categories query={"Vegan"}/>
                <Categories query={"Dessert"}/>
                <Categories query={"Smoothie"}/>
                <Categories query={"Breakfast"}/>
            </div>
        </div>
    )
}

export default Home