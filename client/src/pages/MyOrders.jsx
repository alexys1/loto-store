import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiCalendar, FiMapPin, FiPackage } from 'react-icons/fi';

// 1. CONFIGURACIÓN DINÁMICA DE LA URL (Para Local y Nube)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.id) {
            // 2. USAMOS LA URL DINÁMICA AQUÍ
            fetch(`${API_URL}/api/orders/user/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error cargando pedidos:", err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    // Estado: No logueado
    if (!user) {
        return (
            <div style={{ padding: '80px 20px', textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>
                <FiUserX size={50} color="#ccc" />
                <h2 style={{ margin: '20px 0' }}>Inicia sesión para ver tus pedidos</h2>
                <Link to="/login" style={{ color: 'white', backgroundColor: '#111', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Ir al Login
                </Link>
            </div>
        );
    }

    // Estado: Cargando
    if (loading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando historial...</div>;
    }

    return (
        <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: "'Poppins', sans-serif", minHeight: '60vh' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <FiBox size={28} />
                <h1 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Mis Pedidos</h1>
            </div>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                    <h3>Aún no has realizado compras 🛍️</h3>
                    <p style={{ color: '#666', marginBottom: '20px' }}>Tus pedidos recientes aparecerán aquí.</p>
                    <Link to="/" style={{ color: '#111', fontWeight: 'bold', textDecoration: 'underline' }}>
                        Ir a comprar productos
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                        }}>

                            {/* CABECERA DEL PEDIDO */}
                            <div style={{ backgroundColor: '#f8f8f8', padding: '15px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
                                <div style={{ display: 'flex', gap: '30px', fontSize: '13px', color: '#555' }}>
                                    <div>
                                        <span style={{ display: 'block', fontWeight: 'bold', color: '#111' }}>FECHA</span>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontWeight: 'bold', color: '#111' }}>TOTAL</span>
                                        S/ {order.total.toFixed(2)}
                                    </div>
                                    <div>
                                        <span style={{ display: 'block', fontWeight: 'bold', color: '#111' }}>ID PEDIDO</span>
                                        #{order._id.slice(-6).toUpperCase()}
                                    </div>
                                </div>

                                {/* Badge de Estado */}
                                <div style={{
                                    backgroundColor: order.paymentResult.status === 'Enviado' ? '#e8f5e9' : '#fff3e0',
                                    color: order.paymentResult.status === 'Enviado' ? '#2e7d32' : '#ef6c00',
                                    padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
                                    display: 'flex', alignItems: 'center', gap: '5px'
                                }}>
                                    <FiPackage /> {order.paymentResult.status}
                                </div>
                            </div>

                            {/* CUERPO DEL PEDIDO */}
                            <div style={{ padding: '20px' }}>

                                {/* Items */}
                                {order.items.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                                        <div style={{ width: '60px', height: '60px', backgroundColor: '#f4f4f4', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                                            <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>{item.name}</h4>
                                            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Cantidad: {item.quantity} | Precio: S/ {item.price}</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Detalles de Envío */}
                                <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px dashed #eee', fontSize: '13px', color: '#666' }}>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '5px 0' }}>
                                        <FiMapPin /> Envío a coordenadas: {order.shippingAddress.lat.toFixed(4)}, {order.shippingAddress.lng.toFixed(4)}
                                    </p>
                                    <p style={{ margin: '5px 0' }}>
                                        💳 Método: <strong>{order.paymentMethod === 'yape' ? 'Yape / Plin' : 'Tarjeta'}</strong>
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Icono auxiliar por si acaso no importas FiUserX arriba
const FiUserX = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="18" y1="8" x2="23" y2="13"></line><line x1="23" y1="8" x2="18" y2="13"></line></svg>
);

export default MyOrders;