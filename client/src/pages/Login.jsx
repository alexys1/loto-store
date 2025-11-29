import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 1. CONFIGURACIÓN DINÁMICA DE LA URL (Para Local y Nube)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // Estado para manejar errores visuales
    const [isLoading, setIsLoading] = useState(false); // Estado para mostrar "Cargando..."

    const navigate = useNavigate();
    const { login } = useAuth(); // Usamos el contexto para actualizar el estado global

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Limpiamos el error cuando el usuario empieza a escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // 2. USAMOS LA URL DINÁMICA AQUÍ
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Actualizamos el contexto global (Navbar cambiará automáticamente)
                login(data.user, data.token);

                // Redirigimos al Home
                navigate('/');
            } else {
                setError(data.message || "Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error de conexión con el servidor");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '80px 20px', maxWidth: '450px', margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}>

            <div style={{ border: '1px solid #eee', borderRadius: '12px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', backgroundColor: 'white' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px', fontWeight: '600' }}>Bienvenido</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '14px' }}>Ingresa a tu cuenta de Loto Store</p>

                {/* Mensaje de Error */}
                {error && (
                    <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '13px', textAlign: 'center' }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="ejemplo@correo.com"
                            required
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', transition: 'border 0.2s' }}
                            onFocus={(e) => e.target.style.borderColor = '#111'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
                            onFocus={(e) => e.target.style.borderColor = '#111'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            padding: '14px',
                            backgroundColor: isLoading ? '#666' : '#111',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            fontWeight: '600',
                            fontSize: '15px',
                            marginTop: '10px',
                            transition: 'background 0.3s'
                        }}
                    >
                        {isLoading ? 'Verificando...' : 'INGRESAR'}
                    </button>
                </form>

                <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>
                    <p style={{ color: '#666' }}>¿Aún no tienes cuenta?</p>
                    <Link to="/register" style={{ color: '#111', fontWeight: 'bold', textDecoration: 'none' }}>
                        Crear cuenta gratis
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;