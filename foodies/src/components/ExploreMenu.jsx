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
        {/* All Categories Button */}
        <button
          type="button"
          className={`border-0 bg-transparent text-center p-0`}
          onClick={() => handleClick('All')}
          style={{ minWidth: 110 }}
        >
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle ${category === 'All' ? 'border border-3 border-primary shadow-lg' : 'border border-2'}`}
            style={{
              height: '88px',
              width: '88px',
              backgroundColor: category === 'All' ? '#4A90E2' : '#f8f9fa',
              fontSize: '1.5rem',
              color: category === 'All' ? '#FFFFFF' : '#6c757d',
              transition: 'all 0.3s ease',
              borderColor: category === 'All' ? '#4A90E2' : '#dee2e6'
            }}
          >
            All
          </div>
          <div className={`mt-2 fw-semibold ${category === 'All' ? 'text-primary' : ''}`}>
            All
          </div>
        </button>
        {categories.map((item, index) => {
          const isActive = item.category === category
          return (
            <button
              key={index}
              type="button"
              className={`border-0 bg-transparent text-center p-0`}
              onClick={() => handleClick(item.category)}
              style={{ minWidth: 110 }}
            >
              {item.iconType === 'image' ? (
                <img
                  src={item.icon}
                  height={88}
                  width={88}
                  className={`rounded-circle ${isActive ? 'border border-3 border-primary shadow' : 'border'}`}
                  alt={item.category}
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle ${isActive ? 'border border-3 border-primary shadow-lg' : 'border border-2'}`}
                  style={{
                    height: '88px',
                    width: '88px',
                    backgroundColor: isActive ? (item.bgColorActive || item.bgColor) : item.bgColor,
                    fontSize: '2.5rem',
                    color: isActive ? (item.iconColorActive || item.iconColor) : item.iconColor,
                    transition: 'all 0.3s ease',
                    borderColor: isActive ? item.bgColor : '#dee2e6'
                  }}
                >
                  <i className={`bi ${item.icon}`}></i>
                </div>
              )}
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
