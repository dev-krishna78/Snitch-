
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../hooks/useProduct';

const Productseller = () => {
    const navigate = useNavigate();
    const { handleGetSellerProducts } = useProduct();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProductId, setEditingProductId] = useState(null);

    // Dummy data for demonstration
    // const dummyProducts = [
    //     {
    //         _id: '1',
    //         title: 'Premium Cotton T-Shirt',
    //         description: 'High-quality 100% cotton comfortable t-shirt available in multiple sizes',
    //         seller: 'Fashion Store',
    //         priceAmount: 599,
    //         priceCurrency: 'INR',
    //         image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    //     },
    //     {
    //         _id: '2',
    //         title: 'Classic Denim Jacket',
    //         description: 'Timeless denim jacket perfect for any season. Durable and stylish.',
    //         seller: 'Fashion Store',
    //         priceAmount: 2499,
    //         priceCurrency: 'INR',
    //         image: 'https://images.unsplash.com/photo-1578260051241-9555d6030f84?w=500&h=500&fit=crop',
    //     },
    //     {
    //         _id: '3',
    //         title: 'Casual Summer Shorts',
    //         description: 'Breathable cotton shorts ideal for summer wear. Comfortable fit.',
    //         seller: 'Fashion Store',
    //         priceAmount: 799,
    //         priceCurrency: 'INR',
    //         image: 'https://images.unsplash.com/photo-1591288008499-7d6200f59c75?w=500&h=500&fit=crop',
    //     },
    //     {
    //         _id: '4',
    //         title: 'Elegant Evening Dress',
    //         description: 'Sophisticated evening dress with premium fabric. Perfect for special occasions.',
    //         seller: 'Fashion Store',
    //         priceAmount: 4999,
    //         priceCurrency: 'INR',
    //         image: 'https://images.unsplash.com/photo-1595777712802-91d778920883?w=500&h=500&fit=crop',
    //     },
    //     {
    //         _id: '5',
    //         title: 'Comfortable Sports Shoes',
    //         description: 'Lightweight and durable sports shoes with excellent grip and comfort.',
    //         seller: 'Fashion Store',
    //         priceAmount: 3499,
    //         priceCurrency: 'INR',
    //         image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    //     },
    //     {
    //         _id: '6',
    //         title: 'Premium Leather Belt',
    //         description: 'Genuine leather belt with stylish buckle. Fits various waist sizes.',
    //         seller: 'Fashion Store',
    //         priceAmount: 1299,
    //         priceCurrency: 'INR',
    //         image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    //     },
    // ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Uncomment this to fetch real data
                const data = await handleGetSellerProducts();
                setProducts(data || []);
                
                // Using dummy data for now
                // setProducts(dummyProducts);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEditProduct = (productId) => {
        navigate(`/edit-product/${productId}`);
    };

    const handleAddProduct = () => {
        navigate("/seller/create-product");
    };

    return (
        <div className="min-h-screen bg-[#131313] text-[#e5e2e1] font-sans selection:bg-[#FFD700] selection:text-[#131313]">
            {/* Page Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                {/* Navigation & Branding */}
                <div className="pt-8 pb-8 border-b border-[#2a2a2a] flex items-center justify-between flex-wrap gap-4">
                    <div className="space-y-1">
                        <span className="text-[#FFD700] text-xs font-bold tracking-[0.25em] uppercase font-[Manrope,sans-serif]">
                            Snitch.
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#e5e2e1]">My Products</h1>
                        <p className="text-sm text-[#999999] mt-1">Manage and showcase your products</p>
                    </div>
                    <button
                        onClick={handleAddProduct}
                        className="flex items-center gap-2 px-6 py-3 bg-[#FFD700] text-[#131313] rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105 shadow-lg whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">Add Product</span>
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="py-20 text-center">
                        <div className="flex justify-center items-center gap-2">
                            <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-3 h-3 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <p className="text-[#999999] mt-4">Loading your products...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="my-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="text-red-400 font-semibold">Error</p>
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="inline-block p-4 bg-[#FFD700]/10 rounded-full mb-4">
                            <svg className="w-8 h-8 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#e5e2e1] mb-2">No Products Yet</h3>
                        <p className="text-[#999999] mb-6">Start selling by creating your first product</p>
                        <button
                            onClick={handleAddProduct}
                            className="px-6 py-2 bg-[#FFD700] text-[#131313] rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200"
                        >
                            Create First Product
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && products.length > 0 && (
                    <div className="py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#FFD700]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FFD700]/10"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0f0f0f]">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Edit Button Overlay */}
                                        <button
                                            onClick={() => handleEditProduct(product._id)}
                                            className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 p-3 bg-[#FFD700] text-[#131313] rounded-lg hover:bg-yellow-500 transform hover:scale-110"
                                            title="Edit product"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 sm:p-6">
                                        {/* Title */}
                                        <h3 className="text-lg sm:text-xl font-bold text-[#e5e2e1] mb-2 line-clamp-2 group-hover:text-[#FFD700] transition-colors">
                                            {product.title}
                                        </h3>

                                        {/* Seller */}
                                        <p className="text-xs sm:text-sm text-[#FFD700] font-semibold uppercase tracking-wide mb-3">
                                            {product.seller}
                                        </p>

                                        {/* Description */}
                                        <p className="text-sm sm:text-base text-[#b0aca9] mb-4 line-clamp-2">
                                            {product.description}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-baseline justify-between mb-5 p-3 bg-[#0f0f0f] rounded-lg border border-[#2a2a2a]">
                                            <span className="text-[#999999] text-xs sm:text-sm">Price</span>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl sm:text-3xl font-bold text-[#FFD700]">
                                                    {product.priceAmount}
                                                </span>
                                                <span className="text-xs sm:text-sm font-semibold text-[#999999]">
                                                    {product.priceCurrency}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEditProduct(product._id)}
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FFD700] text-[#131313] rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span className="hidden sm:inline">Edit</span>
                                            </button>
                                            <button className="flex-1 px-4 py-2.5 bg-[#2a2a2a] text-[#e5e2e1] rounded-lg font-semibold hover:bg-[#3a3a3a] transition-all duration-200 border border-[#3a3a3a]">
                                                View
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Productseller;