import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Importamos Navigation para las flechas
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// CONFIGURACIÓN DE BANNERS (Esto luego vendrá de la Base de Datos)
const banners = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?q=80&w=1200&auto=format&fit=crop",
        category: "Lego", // Al hacer clic filtrará por esto
        title: "Mundo Lego"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1603313011101-320f26a4f95e?q=80&w=1200&auto=format&fit=crop",
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

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error:", err));
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBannerClick = (term) => {
        setSearchTerm(term);
        window.scrollTo({ top: 600, behavior: 'smooth' });
    };

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

            {/* 1. CARRUSEL INTELIGENTE */}
            {searchTerm === '' && (
                <div style={{ marginBottom: '40px', padding: '20px' }}>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        // Configuración de Tiempo y Pausa
                        autoplay={{
                            delay: 5000, // 5 Segundos
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true // Se detiene si pones el mouse encima
                        }}
                        pagination={{ clickable: true }}
                        navigation={true} // Flechas activadas
                        modules={[Autoplay, Pagination, Navigation]}
                        style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                    >
                        {banners.map((banner) => (
                            <SwiperSlide key={banner.id} onClick={() => handleBannerClick(banner.category)} style={{ cursor: 'pointer' }}>
                                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                                    <img src={banner.image} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    {/* Sombra degradada para que se vea pro */}
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* 2. PRODUCTOS */}
            <div style={{ padding: '0 20px 40px 20px' }}>
                {searchTerm !== '' && <h2 style={{ marginBottom: '20px' }}>Resultados para: "{searchTerm}"</h2>}
                {searchTerm === '' && <h2 style={{ marginBottom: '20px', fontSize: '1.5em' }}>Nuevos Ingresos 🔥</h2>}

                {filteredProducts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <h3>No encontramos productos... 😢</h3>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                        {filteredProducts.map(product => (
                            <div key={product._id} style={{ border: 'none', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', backgroundColor: 'white', transition: 'transform 0.2s' }}>
                                <div style={{ height: '250px', position: 'relative', backgroundColor: '#f4f4f4' }}>
                                    <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
                                </div>
                                <div style={{ padding: '15px' }}>
                                    <span style={{ fontSize: '0.7em', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>{product.category}</span>
                                    <h3 style={{ margin: '5px 0 10px 0', fontSize: '1em', fontWeight: '600', height: '40px', overflow: 'hidden' }}>{product.name}</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.1em', fontWeight: '800' }}>S/ {product.price.toFixed(2)}</span>
                                        <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} style={{ backgroundColor: '#111', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '20px', fontSize: '0.8em', cursor: 'pointer', fontWeight: 'bold' }}>Añadir</button>
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