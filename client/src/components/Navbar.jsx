import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiShoppingBag, FiUser, FiMenu, FiBox, FiLogOut, FiMapPin } from 'react-icons/fi';

function Navbar() {
    const { cart } = useCart();
    const { searchTerm, setSearchTerm } = useSearch(); // Traemos la función para limpiar búsqueda
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Función para resetear la tienda al dar clic en el Logo
    const handleLogoClick = () => {
        setSearchTerm(''); // Borra lo que haya en el buscador
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al inicio suavemente
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar-container">

            {/* 1. IZQUIERDA: LOGO + MENÚ */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                {/* LOGO CON RESETEO DE BÚSQUEDA */}
                <Link
                    to="/"
                    className="logo-brand"
                    onClick={handleLogoClick} // <--- AQUÍ ESTÁ LA SOLUCIÓN
                    title="Volver al Inicio"
                >
                    LOTO STORE
                </Link>

                <button className="menu-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <FiMenu size={26} />
                    <span style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>MENÚ</span>
                </button>
            </div>

            {/* 2. CENTRO: BUSCADOR */}
            <div className="search-bar-container">
                <FiSearch className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Buscar (Legos, Cases...)"
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        navigate('/');
                    }}
                />
            </div>

            {/* 3. DERECHA: ICONOS */}
            <div className="nav-icons">
                <Link to="/my-orders" className="icon-item" title="Mis Pedidos">
                    <FiBox className="icon-size" />
                    <span style={{ fontSize: '10px', fontWeight: '500' }}>Pedidos</span>
                </Link>

                <Link to="/cart" className="icon-item" style={{ position: 'relative' }} title="Ver Carrito">
                    <FiShoppingBag className="icon-size" />
                    <span className="cart-badge">{totalItems}</span>
                    <span style={{ fontSize: '10px', fontWeight: '500' }}>Carrito</span>
                </Link>

                {user ? (
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                        <div
                            onClick={() => setShowDropdown(!showDropdown)}
                            style={{
                                width: '35px', height: '35px',
                                backgroundColor: '#111', color: 'white',
                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', userSelect: 'none', marginLeft: '10px'
                            }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        {showDropdown && (
                            <div style={{
                                position: 'absolute', top: '45px', right: '0', backgroundColor: 'white', width: '200px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.15)', borderRadius: '8px', zIndex: 1000, overflow: 'hidden', border: '1px solid #eee'
                            }}>
                                <div style={{ padding: '15px', borderBottom: '1px solid #eee', backgroundColor: '#f8f9fa' }}>
                                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px', color: '#111' }}>{user.name}</p>
                                </div>
                                <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)} style={dropdownLinkStyle}><FiUser /> Mi Perfil</Link>
                                <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)} style={dropdownLinkStyle}><FiMapPin /> Direcciones</Link>
                                <Link to="/my-orders" className="dropdown-item" onClick={() => setShowDropdown(false)} style={dropdownLinkStyle}><FiBox /> Historial</Link>
                                <div style={{ borderTop: '1px solid #eee', marginTop: '5px' }}>
                                    <button onClick={logout} style={{ ...dropdownLinkStyle, width: '100%', border: 'none', background: 'none', color: '#d32f2f', cursor: 'pointer' }}><FiLogOut /> Cerrar Sesión</button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="icon-item">
                        <FiUser className="icon-size" />
                        <span style={{ fontSize: '10px', fontWeight: '500' }}>Ingresar</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
const dropdownLinkStyle = { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', textDecoration: 'none', color: '#333', fontSize: '13px', transition: 'background 0.2s', textAlign: 'left' };
export default Navbar;