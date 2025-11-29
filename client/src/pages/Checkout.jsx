import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// 1. CONFIGURACIÓN DE LA URL DEL SERVIDOR (Dinámica)
// Si existe una variable de entorno (Netlify), usa esa. Si no, usa localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Configuración de iconos del mapa
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

// Componente para capturar el clic en el mapa
function LocationMarker({ setPosition }) {
    useMapEvents({
        click(e) { setPosition(e.latlng); },
    });
    return null;
}

function Checkout() {
    const { cart, total, removeFromCart } = useCart(); // Necesitamos limpiar el carrito al final
    const [position, setPosition] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('yape');
    const [operationCode, setOperationCode] = useState(''); // Para guardar el código de Yape
    const navigate = useNavigate();

    // Obtenemos datos del usuario logueado (si existe)
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Invitado', email: 'invitado@lotostore.com' };

    const handleOrder = async () => {
        // Validaciones
        if (!position) return alert("⚠️ Por favor, selecciona tu ubicación exacta en el mapa.");
        if (paymentMethod === 'yape' && operationCode.length < 4) return alert("⚠️ Por favor ingresa el número de operación del Yape.");

        const orderData = {
            buyer: {
                name: user.name,
                email: user.email,
                id: user.id
            },
            items: cart,
            total: total,
            shippingAddress: position,
            paymentMethod: paymentMethod,
            paymentResult: {
                status: 'Pendiente de Verificación',
                operationCode: paymentMethod === 'yape' ? operationCode : 'Pago con Tarjeta'
            }
        };

        try {
            // 2. USAMOS LA URL DINÁMICA AQUÍ
            const res = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                alert("¡PEDIDO REALIZADO! 🎉\nNos pondremos en contacto para el envío.");

                // Opcional: Limpiar carrito o recargar para vaciar
                // Lo ideal sería tener una función clearCart() en el contexto, 
                // pero recargar la página funciona para este caso rápido.
                window.location.href = "/";
            } else {
                const errorData = await res.json();
                alert("Hubo un error al procesar el pedido: " + (errorData.message || "Error desconocido"));
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor. Inténtalo más tarde.");
        }
    };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '30px', flexWrap: 'wrap', fontFamily: "'Poppins', sans-serif" }}>

            {/* SECCIÓN 1: MAPA */}
            <div style={{ flex: 1, minWidth: '300px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>1. ¿Dónde te lo llevamos? 🛵</h2>
                <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '15px' }}>Haz clic en el mapa para marcar tu ubicación exacta en Lima.</p>

                <div style={{ height: '400px', width: '100%', border: '2px solid #333', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <MapContainer center={[-12.0464, -77.0428]} zoom={12} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker setPosition={setPosition} />
                        {position && <Marker position={position} />}
                    </MapContainer>
                </div>
                {position ? (
                    <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        📍 Ubicación guardada
                    </p>
                ) : (
                    <p style={{ color: 'red', fontSize: '0.9em', marginTop: '10px' }}>* Marca tu ubicación para continuar</p>
                )}
            </div>

            {/* SECCIÓN 2: PAGO */}
            <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', height: 'fit-content' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>2. Realiza el Pago 💸</h2>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                    <label style={{
                        cursor: 'pointer',
                        border: paymentMethod === 'yape' ? '2px solid #742284' : '1px solid #ddd',
                        padding: '15px', borderRadius: '8px', flex: 1,
                        backgroundColor: paymentMethod === 'yape' ? '#fcf4fd' : 'white',
                        transition: 'all 0.3s'
                    }}>
                        <input type="radio" name="payment" value="yape" checked={paymentMethod === 'yape'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ marginRight: '8px' }} />
                        <strong>📱 Yape / Plin</strong>
                    </label>

                    <label style={{
                        cursor: 'pointer',
                        border: paymentMethod === 'card' ? '2px solid #333' : '1px solid #ddd',
                        padding: '15px', borderRadius: '8px', flex: 1,
                        backgroundColor: paymentMethod === 'card' ? '#f4f4f4' : 'white',
                        transition: 'all 0.3s'
                    }}>
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ marginRight: '8px' }} />
                        <strong>💳 Tarjeta</strong>
                    </label>
                </div>

                {/* LOGICA DE YAPE */}
                {paymentMethod === 'yape' && (
                    <div style={{ backgroundColor: '#f3e5f5', padding: '20px', borderRadius: '8px', marginBottom: '25px', textAlign: 'center', border: '1px dashed #742284' }}>
                        <p style={{ margin: '0 0 15px 0', color: '#742284', fontWeight: 'bold', fontSize: '1.1em' }}>Escanea para pagar S/ {total.toFixed(2)}</p>

                        {/* AQUÍ IRÍA TU QR REAL */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Yape" style={{ width: '140px', marginBottom: '10px' }} />

                        <p style={{ fontSize: '0.85em', color: '#666' }}>A nombre de: <strong>Loto Store SAC</strong></p>

                        <input
                            type="text"
                            placeholder="Ingresa el N° de Operación aquí"
                            value={operationCode}
                            onChange={(e) => setOperationCode(e.target.value)}
                            style={{ width: '100%', padding: '12px', marginTop: '15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }}
                        />
                    </div>
                )}

                {/* LOGICA DE TARJETA */}
                {paymentMethod === 'card' && (
                    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '25px', border: '1px solid #eee' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>💳 Pasarela de Pagos (Visa/Mastercard)</p>
                        <p style={{ fontSize: '0.85em', color: '#666' }}>
                            Tu pago será procesado de forma segura. En este modo de demostración, el pago se registrará automáticamente al confirmar.
                        </p>
                    </div>
                )}

                <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4em', fontWeight: 'bold', marginBottom: '20px' }}>
                        <span>Total:</span>
                        <span>S/ {total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleOrder}
                        style={{
                            width: '100%', padding: '16px',
                            backgroundColor: '#111', color: 'white',
                            border: 'none', fontSize: '16px', fontWeight: '600', letterSpacing: '0.5px',
                            cursor: 'pointer', borderRadius: '8px',
                            transition: 'background 0.3s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#111'}
                    >
                        CONFIRMAR PEDIDO ✅
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;