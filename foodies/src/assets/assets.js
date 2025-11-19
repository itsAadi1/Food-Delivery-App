// Import frontend-specific assets
import { assets as frontendAssets, menu_list, food_list } from './frontend_assets/assets'
// Import category images
import burger from './burger.png'
import biryani from './biryani.png'
import salad from './salad.png'

// Export frontend assets for use in foodies app
export const assets = {
    logo: frontendAssets.logo,
    parcel: frontendAssets.parcel_icon,
    upload: frontendAssets.parcel_icon, // fallback
    cart: frontendAssets.basket_icon,
    header_img: frontendAssets.header_img,
    search_icon: frontendAssets.search_icon,
    rating_starts: frontendAssets.rating_starts,
    add_icon_green: frontendAssets.add_icon_green,
    add_icon_white: frontendAssets.add_icon_white,
    remove_icon_red: frontendAssets.remove_icon_red,
    app_store: frontendAssets.app_store,
    play_store: frontendAssets.play_store,
    linkedin_icon: frontendAssets.linkedin_icon,
    facebook_icon: frontendAssets.facebook_icon,
    twitter_icon: frontendAssets.twitter_icon,
    cross_icon: frontendAssets.cross_icon,
    selector_icon: frontendAssets.selector_icon,
    profile_icon: frontendAssets.profile_icon,
    logout_icon: frontendAssets.logout_icon,
    bag_icon: frontendAssets.bag_icon,
    parcel_icon: frontendAssets.parcel_icon,
    basket_icon: frontendAssets.basket_icon
}
// Helper function to get menu image for a category
const getMenuImage = (categoryName) => {
    if (!menu_list || !Array.isArray(menu_list)) return null
    const menuItem = menu_list.find(item => {
        const menuName = item.menu_name?.toLowerCase() || ''
        const catName = categoryName?.toLowerCase() || ''
        return menuName === catName || 
               (catName === 'deserts' && menuName === 'deserts') ||
               (catName === 'dessert' && menuName === 'deserts')
    })
    return menuItem?.menu_image || null
}

// Helper function to get a representative food image for a category
const getFoodImage = (categoryName) => {
    if (!food_list || !Array.isArray(food_list)) return null
    const foodItem = food_list.find(item => {
        const foodCat = item.category?.toLowerCase() || ''
        const catName = categoryName?.toLowerCase() || ''
        return foodCat === catName || 
               (catName === 'deserts' && foodCat === 'deserts') ||
               (catName === 'dessert' && foodCat === 'deserts')
    })
    return foodItem?.image || null
}

export const categories=[
    {
        category: 'Salad',
        icon: getMenuImage('Salad') || getFoodImage('Salad') || salad,
        iconType: 'image'
    },
    {
        category: 'Rolls',
        icon: getMenuImage('Rolls') || getFoodImage('Rolls'),
        iconType: 'image'
    },
    {
        category: 'Deserts',
        icon: getMenuImage('Deserts') || getFoodImage('Deserts'),
        iconType: 'image'
    },
    {
        category: 'Sandwich',
        icon: getMenuImage('Sandwich') || getFoodImage('Sandwich'),
        iconType: 'image'
    },
    {
        category: 'Cake',
        icon: getMenuImage('Cake') || getFoodImage('Cake'),
        iconType: 'image'
    },
    {
        category: 'Pure Veg',
        icon: getMenuImage('Pure Veg') || getFoodImage('Pure Veg'),
        iconType: 'image'
    },
    {
        category: 'Pasta',
        icon: getMenuImage('Pasta') || getFoodImage('Pasta'),
        iconType: 'image'
    },
    {
        category: 'Noodles',
        icon: getMenuImage('Noodles') || getFoodImage('Noodles'),
        iconType: 'image'
    },
    {
        category: 'Burger',
        icon: burger,
        iconType: 'image'
    },
    {
        category: 'Biryani',
        icon: biryani,
        iconType: 'image'
    },
]