import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom'; // <--- Agregamos useNavigate

function Cart() {
    const { cart, removeFromCart, total } = useCart();
    const navigate = useNavigate(); // <--- Hook para navegar

    if (cart.length === 0) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Tu Carrito de Compras 🛒</h2>
                <p>No tienes productos agregados aún.</p>
                <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
                    Ir a comprar productos
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Resumen de tu Pedido</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {cart.map((product) => (
                    <div key={product._id} style={{
                        border: '1px solid #ddd',
                        padding: '15px',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#fff'
                    }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <img
                                src={product.image || 'https://via.placeholder.com/80'}
                                alt={product.name}
                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                            />
                            <div>
                                <h3 style={{ margin: '0 0 5px 0' }}>{product.name}</h3>
                                <p style={{ margin: 0, color: '#666' }}>Precio unitario: S/ {product.price}</p>
                                <p style={{ margin: 0, fontWeight: 'bold' }}>Cantidad: {product.quantity}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => removeFromCart(product._id)}
                            style={{
                                backgroundColor: '#ff4444',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '30px',
                borderTop: '2px solid #333',
                paddingTop: '20px',
                textAlign: 'right'
            }}>
                <h3>Total a Pagar: S/ {total.toFixed(2)}</h3>

                {/* Botón actualizado con navegación al Checkout */}
                <button
                    onClick={() => navigate('/checkout')}
                    style={{
                        backgroundColor: '#333',
                        color: 'white',
                        padding: '15px 30px',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        marginTop: '10px'
                    }}>
                    Proceder al Pago 💳
                </button>
            </div>
        </div>
    );
}

export default Cart;