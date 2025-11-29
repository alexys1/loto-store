import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
// Importaciones de Swiper (Carrusel)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 1. CONFIGURACIÓN DINÁMICA DE LA URL (Para Local y Nube)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// CONFIGURACIÓN DE BANNERS (Simulados por ahora)
const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=1200&auto=format&fit=crop",
        category: "Lego",
        title: "Mundo Lego"
    },
    {
        id: 2,
        image: "https://pe.tiendasishop.com/cdn/shop/files/iPhone_16e_M-1251x1042_BH_1.webp?q=80&w=1200&auto=format&fit=crop",
        category: "Case",
        title: "Protege tu iPhone"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=1200&auto=format&fit=crop",
        category: "Tecnología",
        title: "Novedades Tech"
    }
];

function Home() {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const { searchTerm, setSearchTerm } = useSearch();

    // 2. CARGAR PRODUCTOS DESDE EL BACKEND
    useEffect(() => {
        fetch(`${API_URL}/api/products`) // <--- Usamos la URL dinámica aquí
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error cargando productos:", err));
    }, []);

    // Lógica de filtrado (Buscador)
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Al hacer clic en un Banner, filtramos por esa categoría
    const handleBannerClick = (term) => {
        setSearchTerm(term);
        window.scrollTo({ top: 600, behavior: 'smooth' });
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}>

            {/* 1. CARRUSEL DE OFERTAS (Solo visible si no están buscando nada) */}
            {searchTerm === '' && (
                <div style={{ marginBottom: '40px', padding: '20px' }}>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true // Se pausa si el usuario mira la oferta
                        }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner.id} onClick={() => handleBannerClick(banner.category)} style={{ cursor: 'pointer' }}>
                                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                                    <img src={banner.image} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    {/* Sombra degradada para texto legible (opcional) */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* 2. RESULTADOS / GRID DE PRODUCTOS */}
            <div style={{ padding: '0 20px 40px 20px' }}>

                {/* Títulos dinámicos */}
                {searchTerm !== '' ? (
                    <h2 style={{ marginBottom: '20px' }}>Resultados para: "{searchTerm}"</h2>
                ) : (
                    <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: '700' }}>Nuevos Ingresos 🔥</h2>
                )}

                {/* Estado Vacío */}
                {filteredProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
                        <h3 style={{ color: '#666' }}>No encontramos productos con ese nombre 😢</h3>
                        <button
                            onClick={() => setSearchTerm('')}
                            style={{ marginTop: '10px', padding: '10px 20px', border: '1px solid #333', background: 'transparent', cursor: 'pointer', borderRadius: '5px' }}
                        >
                            Ver todo el catálogo
                        </button>
                    </div>
                ) : (
                    /* Grid de Productos */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                        {filteredProducts.map(product => (
                            <div key={product._id} style={{
                                border: 'none',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                                backgroundColor: 'white',
                                transition: 'transform 0.2s',
                                display: 'flex', flexDirection: 'column'
                            }}>
                                {/* Imagen */}
                                <div style={{ height: '250px', position: 'relative', backgroundColor: '#f4f4f4', padding: '10px' }}>
                                    <img
                                        src={product.image || 'https://via.placeholder.com/300'}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                                    />
                                </div>

                                {/* Información */}
                                <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <span style={{ fontSize: '0.7em', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                                            {product.category}
                                        </span>
                                        <h3 style={{ margin: '5px 0 10px 0', fontSize: '1em', fontWeight: '600', height: '40px', overflow: 'hidden', lineHeight: '1.3' }}>
                                            {product.name}
                                        </h3>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                                        <span style={{ fontSize: '1.2em', fontWeight: '800', color: '#111' }}>
                                            S/ {product.price.toFixed(2)}
                                        </span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                                            style={{
                                                backgroundColor: '#111', color: 'white',
                                                padding: '8px 15px', border: 'none',
                                                borderRadius: '20px', fontSize: '0.8em',
                                                cursor: 'pointer', fontWeight: 'bold',
                                                transition: 'transform 0.1s'
                                            }}
                                            onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                                            onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                                        >
                                            Añadir +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;