import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.id) {
            fetch(`http://localhost:5000/api/orders/user/${user.id}`)
                .then(res => res.json())
                .then(data => setOrders(data))
                .catch(err => console.error("Error cargando pedidos:", err));
        }
    }, []);

    if (!user) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Debes iniciar sesión para ver tus pedidos 🔒</h2>
                <Link to="/login" style={{ color: 'blue' }}>Ir al Login</Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Hola, {user.name} 👋</h2>
            <h3>Historial de Pedidos</h3>

            {orders.length === 0 ? (
                <p>Aún no has realizado compras.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                        <div key={order._id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                <div>
                                    <strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}
                                    <br />
                                    <span style={{ fontSize: '0.9em', color: '#666' }}>ID: {order._id}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{
                                        backgroundColor: order.paymentResult.status === 'Enviado' ? 'green' : '#ff9800',
                                        color: 'white',
                                        padding: '5px 10px',
                                        borderRadius: '15px',
                                        fontSize: '0.8em'
                                    }}>
                                        {order.paymentResult.status}
                                    </span>
                                    <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>Total: S/ {order.total.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Lista de productos de esa orden */}
                            <div>
                                {order.items.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                        <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                        <p style={{ margin: 0 }}>{item.quantity}x {item.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;