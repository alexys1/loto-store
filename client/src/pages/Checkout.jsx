import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

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
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                alert("¡PEDIDO REALIZADO! 🎉\nNos pondremos en contacto para el envío.");
                // Limpiamos carrito (opcional: deberías crear una función clearCart en tu context, pero por ahora recargamos)
                window.location.href = "/";
            } else {
                alert("Hubo un error al procesar el pedido.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>

            {/* MAPA */}
            <div style={{ flex: 1, minWidth: '300px' }}>
                <h2>1. ¿Dónde te lo llevamos? 🛵</h2>
                <p style={{ fontSize: '0.9em', color: '#666' }}>Marca tu ubicación exacta en Lima.</p>
                <div style={{ height: '400px', width: '100%', border: '2px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                    <MapContainer center={[-12.0464, -77.0428]} zoom={12} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker setPosition={setPosition} />
                        {position && <Marker position={position} />}
                    </MapContainer>
                </div>
                {position && <p style={{ color: 'green', fontWeight: 'bold' }}>📍 Ubicación guardada</p>}
            </div>

            {/* PAGO */}
            <div style={{ flex: 1, minWidth: '300px', backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <h2>2. Realiza el Pago 💸</h2>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <label style={{ cursor: 'pointer', border: paymentMethod === 'yape' ? '2px solid #742284' : '1px solid #ccc', padding: '10px', borderRadius: '5px', flex: 1 }}>
                        <input type="radio" name="payment" value="yape" checked={paymentMethod === 'yape'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        📱 Yape / Plin
                    </label>
                    <label style={{ cursor: 'pointer', border: paymentMethod === 'card' ? '2px solid #333' : '1px solid #ccc', padding: '10px', borderRadius: '5px', flex: 1 }}>
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                        💳 Tarjeta
                    </label>
                </div>

                {/* LOGICA DE YAPE */}
                {paymentMethod === 'yape' && (
                    <div style={{ backgroundColor: '#f3e5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 10px 0', color: '#742284', fontWeight: 'bold' }}>Escanea para pagar S/ {total.toFixed(2)}</p>
                        {/* AQUÍ PONES TU QR REAL LUEGO. Por ahora es uno de ejemplo */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="QR Yape" style={{ width: '150px' }} />
                        <p style={{ fontSize: '0.8em' }}>A nombre de: Loto Store SAC</p>

                        <input
                            type="text"
                            placeholder="Ingresa el N° de Operación aquí"
                            value={operationCode}
                            onChange={(e) => setOperationCode(e.target.value)}
                            style={{ width: '90%', padding: '10px', marginTop: '10px', border: '1px solid #742284', borderRadius: '4px' }}
                        />
                    </div>
                )}

                {/* LOGICA DE TARJETA (Simulada para MVP) */}
                {paymentMethod === 'card' && (
                    <div style={{ backgroundColor: '#eee', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                        <p>💳 Pasarela de Pagos (Visa/Mastercard)</p>
                        <p style={{ fontSize: '0.8em' }}>Por seguridad, en este modo de prueba el pago se registrará al confirmar.</p>
                    </div>
                )}

                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2em', fontWeight: 'bold', margin: '20px 0' }}>
                    <span>Total a Pagar:</span>
                    <span>S/ {total.toFixed(2)}</span>
                </div>

                <button
                    onClick={handleOrder}
                    style={{ width: '100%', padding: '15px', backgroundColor: '#333', color: 'white', border: 'none', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px' }}>
                    CONFIRMAR PAGO ✅
                </button>
            </div>
        </div>
    );
}

export default Checkout;