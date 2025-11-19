import React, { useState } from 'react'
import { food_list } from '../../assets/frontend_assets/assets'
import { addFood } from '../../services/FoodService'
import { toast } from 'react-toastify'

export default function BulkImport() {
    const [isImporting, setIsImporting] = useState(false)
    const [importedCount, setImportedCount] = useState(0)
    const [failedCount, setFailedCount] = useState(0)
    const [currentItem, setCurrentItem] = useState(null)

    // Convert image import (Vite URL) to File object
    const convertImageToFile = async (imageSrc, name) => {
        try {
            // Handle different image source types
            let url = imageSrc
            
            // If it's an object with default property (ES6 import)
            if (imageSrc && typeof imageSrc === 'object' && imageSrc.default) {
                url = imageSrc.default
            }
            
            // If it's already a string URL
            if (typeof url !== 'string') {
                console.error('Invalid image source type:', typeof url)
                return null
            }
            
            // Fetch the image from the Vite dev server or production URL
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.statusText}`)
            }
            
            const blob = await response.blob()
            const fileName = `${name.replace(/\s+/g, '_')}.${blob.type.split('/')[1] || 'png'}`
            const file = new File([blob], fileName, { type: blob.type || 'image/png' })
            return file
        } catch (error) {
            console.error('Error converting image to file:', error, 'Image source:', imageSrc)
            return null
        }
    }

    const handleBulkImport = async () => {
        if (!food_list || food_list.length === 0) {
            toast.error('No food items found to import')
            return
        }

        setIsImporting(true)
        setImportedCount(0)
        setFailedCount(0)

        for (let i = 0; i < food_list.length; i++) {
            const foodItem = food_list[i]
            setCurrentItem(`${i + 1}/${food_list.length}: ${foodItem.name}`)

            try {
                // Convert image to File
                let imageFile
                
                // Try different methods to convert the image
                if (foodItem.image) {
                    // Method 1: If it's a string URL
                    if (typeof foodItem.image === 'string') {
                        imageFile = await convertImageToFile(foodItem.image, foodItem.name)
                    } 
                    // Method 2: If it's an imported module, get the default export
                    else if (foodItem.image.default) {
                        imageFile = await convertImageToFile(foodItem.image.default, foodItem.name)
                    }
                    // Method 3: Try the image directly
                    else {
                        imageFile = await convertImageToFile(foodItem.image, foodItem.name)
                    }
                }

                if (!imageFile) {
                    console.warn(`Could not convert image for ${foodItem.name}, skipping...`)
                    setFailedCount(prev => prev + 1)
                    continue
                }

                // Prepare food data
                const foodData = {
                    name: foodItem.name,
                    description: foodItem.description || 'Food provides essential nutrients for overall health and well-being',
                    price: foodItem.price,
                    category: foodItem.category
                }

                // Add food to backend
                await addFood(foodData, imageFile)
                setImportedCount(prev => prev + 1)
                
                // Small delay to avoid overwhelming the API
                await new Promise(resolve => setTimeout(resolve, 500))
            } catch (error) {
                console.error(`Error importing ${foodItem.name}:`, error)
                setFailedCount(prev => prev + 1)
                toast.error(`Failed to import: ${foodItem.name}`)
            }
        }

        setIsImporting(false)
        setCurrentItem(null)
        toast.success(`Import completed! ${importedCount} items imported, ${failedCount} failed.`)
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="mb-4" style={{fontWeight: 700, color: '#1e293b'}}>
                                Bulk Import Food Items
                            </h2>
                            
                            <div className="alert alert-info mb-4">
                                <h5 className="alert-heading">About Bulk Import</h5>
                                <p className="mb-0">
                                    This will import all {food_list?.length || 0} food items from the assets folder.
                                    Each item will be added to the database with its image uploaded to Cloudinary.
                                </p>
                            </div>

                            {isImporting && (
                                <div className="alert alert-warning mb-4">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <div>
                                            <strong>Importing...</strong>
                                            {currentItem && <div className="small">{currentItem}</div>}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="progress" style={{height: '25px'}}>
                                            <div 
                                                className="progress-bar progress-bar-striped progress-bar-animated" 
                                                role="progressbar" 
                                                style={{
                                                    width: `${((importedCount + failedCount) / food_list.length) * 100}%`
                                                }}
                                            >
                                                {importedCount + failedCount} / {food_list.length}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 small">
                                        <span className="text-success">✓ Imported: {importedCount}</span>
                                        {' '}
                                        <span className="text-danger">✗ Failed: {failedCount}</span>
                                    </div>
                                </div>
                            )}

                            {!isImporting && importedCount > 0 && (
                                <div className="alert alert-success mb-4">
                                    <h5 className="alert-heading">Import Summary</h5>
                                    <p className="mb-0">
                                        Successfully imported: <strong>{importedCount}</strong> items<br/>
                                        Failed: <strong>{failedCount}</strong> items
                                    </p>
                                </div>
                            )}

                            <div className="d-grid gap-2">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-lg"
                                    onClick={handleBulkImport}
                                    disabled={isImporting}
                                >
                                    {isImporting ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Importing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-upload me-2"></i>
                                            Import All Food Items ({food_list?.length || 0})
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="mt-4">
                                <h5>Food Items to Import:</h5>
                                <div className="table-responsive" style={{maxHeight: '400px', overflowY: 'auto'}}>
                                    <table className="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {food_list?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td><span className="badge bg-secondary">{item.category}</span></td>
                                                    <td>₹{item.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

