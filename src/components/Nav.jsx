import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Nav = ({ isSearchVisible, toggleSearch, handleSearch, searchTerm, handleChange }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-3/4 font-[Inter,sans-serif]">
        <div className="flex justify-between">
          <Link to="/">
            <h1 className="text-black text-lg font-[500] hover:text-[#ff642b] cursor-pointer">
              Home
            </h1>
          </Link>
          <div
            className={`flex justify-end gap-1 w-1/2 items-center ${isSearchVisible ? 'w-full' : ''
              }`}
            style={{
              transition: 'width 0.5s',
              overflow: 'hidden',
            }}
          >{!isSearchVisible && (
            <Link to="/search">
              <span
                onClick={toggleSearch}
                style={{ cursor: 'pointer' }}
                className='hover:text-[#ff642b] text-black'
              >
                <IoIosSearch size={28} />
              </span>
            </Link>)}
            {isSearchVisible && (
            <Link to="/">
              <span
                onClick={toggleSearch}
                style={{ cursor: 'pointer' }}
                className='hover:text-[#ff642b] text-black'
              >
                <IoIosSearch size={28} />
              </span>
            </Link>)}
            {isSearchVisible && (
              <>
                <input
                  type="text"
                  className="bg-[#E0E0E0] w-1/2 rounded-xl py-1 px-2 focus:outline-none"
                  placeholder="Type name of any dish and press search button..."
                  value={searchTerm}
                  onChange={(e) => handleChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  onClick={handleSearch}
                  className="bg-[#ff642b] text-white rounded-xl py-1 px-3 hover:bg-opacity-80 focus:outline-none"
                >
                  Search
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
