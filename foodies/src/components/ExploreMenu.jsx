import React from 'react'
import { categories } from '../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  const handleClick = (next) => {
    setCategory((prev) => (prev === next ? 'All' : next))
  }

  return (
    <div className="explore-menu position-relative">
      <h1 className="d-flex justify-content-between align-items-center">
        Explore Menu
      </h1>
      <p>Explore the menu of your favorite restaurant</p>

      {/* Horizontal, scrollable category list */}
      <div className="d-flex gap-4 overflow-auto py-2">
        {categories.map((item, index) => {
          const isActive = item.category === category
          return (
            <button
              key={index}
              type="button"
              className={`border-0 bg-transparent text-center p-0"`}
              onClick={() => handleClick(item.category)}
              style={{ minWidth: 110 }}
            >
              <img
                src={item.icon}
                height={88}
                width={88}
                className={`rounded-circle ${isActive ? 'border border-3 border-primary shadow' : 'border'}`}
                alt={item.category}
                style={{ objectFit: 'cover' }}
              />
              <div className={`mt-2 fw-semibold ${isActive ? 'text-primary' : ''}`}>
                {item.category}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ExploreMenu
