import { Link } from 'react-router-dom';
import { FiTruck, FiShield, FiCreditCard, FiClock, FiMapPin, FiMail } from 'react-icons/fi'; // Iconos de interfaz
import { FaFacebookF, FaInstagram, FaTiktok, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa'; // Iconos de marca

function Footer() {
    return (
        <div style={{ marginTop: '80px', fontFamily: "'Poppins', sans-serif" }}>

            {/* 1. BARRA DE CONFIANZA (Trust Bar) */}
            <div style={{ backgroundColor: '#f4f4f4', padding: '40px 20px', borderTop: '1px solid #e0e0e0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '30px', textAlign: 'center' }}>

                    <div style={trustItemStyle}>
                        <FiShield size={30} style={{ color: '#111', marginBottom: '10px' }} />
                        <h4 style={trustTitleStyle}>Compra 100% Segura</h4>
                        <p style={trustDescStyle}>Tus datos siempre protegidos</p>
                    </div>

                    <div style={trustItemStyle}>
                        <FiCreditCard size={30} style={{ color: '#111', marginBottom: '10px' }} />
                        <h4 style={trustTitleStyle}>Pago Fácil y Rápido</h4>
                        <p style={trustDescStyle}>Aceptamos Yape, Plin y Tarjetas</p>
                    </div>

                    <div style={trustItemStyle}>
                        <FiTruck size={30} style={{ color: '#111', marginBottom: '10px' }} />
                        <h4 style={trustTitleStyle}>Despachos a Lima</h4>
                        <p style={trustDescStyle}>Cobertura en toda la capital</p>
                    </div>

                    <div style={trustItemStyle}>
                        <FiClock size={30} style={{ color: '#111', marginBottom: '10px' }} />
                        <h4 style={trustTitleStyle}>Delivery Programado</h4>
                        <p style={trustDescStyle}>Recibe tu pedido a tiempo</p>
                    </div>

                </div>
            </div>

            {/* 2. FOOTER PRINCIPAL */}
            <footer style={{ backgroundColor: '#111', color: '#fff', paddingTop: '60px', paddingBottom: '30px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px' }}>

                    {/* Columna 1: SOBRE NOSOTROS */}
                    <div style={{ flex: '1 1 250px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '1px', marginBottom: '20px' }}>LOTO STORE</h2>
                        <p style={{ color: '#999', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                            Expertos en importación de productos exclusivos. Traemos lo mejor del mundo directamente a tus manos en Lima. Calidad garantizada en cada entrega.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <SocialIcon icon={<FaInstagram />} />
                            <SocialIcon icon={<FaTiktok />} />
                            <SocialIcon icon={<FaFacebookF />} />
                        </div>
                    </div>

                    {/* Columna 2: COMPRA */}
                    <div style={{ flex: '1 1 150px' }}>
                        <h3 style={columnTitleStyle}>Comprar</h3>
                        <ul style={listStyle}>
                            <li><Link to="/" style={linkStyle}>Inicio / Catálogo</Link></li>
                            <li><Link to="/cart" style={linkStyle}>Mi Carrito</Link></li>
                            <li><Link to="/search?q=lego" style={linkStyle}>Colección Lego</Link></li>
                            <li><Link to="/search?q=case" style={linkStyle}>Cases iPhone</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: AYUDA AL CLIENTE */}
                    <div style={{ flex: '1 1 150px' }}>
                        <h3 style={columnTitleStyle}>Atención al Cliente</h3>
                        <ul style={listStyle}>
                            <li><Link to="/my-orders" style={linkStyle}>Rastrear mi Pedido</Link></li>
                            <li><Link to="/profile" style={linkStyle}>Mi Cuenta</Link></li>
                            <li><Link to="/legal/shipping" style={linkStyle}>Política de Envíos</Link></li>
                            <li><Link to="/legal/returns" style={linkStyle}>Cambios y Devoluciones</Link></li>
                            <li><Link to="/legal/terms" style={linkStyle}>Términos del Servicio</Link></li>
                        </ul>
                    </div>

                    {/* Columna 4: CONTACTO Y PAGOS */}
                    <div style={{ flex: '1 1 250px' }}>
                        <h3 style={columnTitleStyle}>Contacto</h3>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#999', fontSize: '14px' }}>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FiMapPin /> Lima, Perú
                            </li>
                            <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <FiMail /> contacto@lotostore.com
                            </li>
                        </ul>

                        <h3 style={{ ...columnTitleStyle, marginTop: '20px' }}>Métodos de Pago</h3>
                        <div style={{ display: 'flex', gap: '10px', color: '#fff', fontSize: '24px' }}>
                            <FaCcVisa style={{ opacity: 0.8 }} />
                            <FaCcMastercard style={{ opacity: 0.8 }} />
                            <FaCcAmex style={{ opacity: 0.8 }} />
                            {/* Simulación visual de Yape/Plin con texto pequeño si no hay icono */}
                            <div style={{ border: '1px solid #555', borderRadius: '4px', padding: '2px 5px', fontSize: '10px', display: 'flex', alignItems: 'center' }}>YAPE</div>
                        </div>
                    </div>
                </div>

                {/* 3. COPYRIGHT */}
                <div style={{ borderTop: '1px solid #333', marginTop: '50px', paddingTop: '20px', textAlign: 'center' }}>
                    <p style={{ color: '#666', fontSize: '12px' }}>
                        &copy; {new Date().getFullYear()} Loto Store SAC. Todos los derechos reservados. Diseñado para la excelencia.
                    </p>
                </div>
            </footer>
        </div>
    );
}

// --- ESTILOS EN LÍNEA (CSS-in-JS) PARA MANTENER ORDEN ---

const trustItemStyle = {
    flex: '1 1 200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const trustTitleStyle = {
    margin: '0 0 5px 0',
    fontSize: '16px',
    fontWeight: '600'
};

const trustDescStyle = {
    margin: 0,
    fontSize: '13px',
    color: '#666'
};

const columnTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0
};

const linkStyle = {
    color: '#999',
    textDecoration: 'none',
    fontSize: '14px',
    marginBottom: '10px',
    display: 'block',
    transition: 'color 0.2s'
};

// Componente pequeño para los iconos sociales con efecto hover
const SocialIcon = ({ icon }) => (
    <div style={{
        width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#333',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        color: '#fff', transition: 'background 0.3s'
    }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'} // Dorado al pasar mouse
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#333'}
    >
        {icon}
    </div>
);

export default Footer;