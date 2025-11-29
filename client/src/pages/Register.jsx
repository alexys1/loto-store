import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// 1. CONFIGURACIÓN DINÁMICA DE LA URL (Para Local y Nube)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Limpiamos errores al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Validación básica del frontend
        if (!formData.email.includes('@')) {
            setError("Por favor ingresa un correo electrónico válido.");
            setIsLoading(false);
            return;
        }

        try {
            // 2. USAMOS LA URL DINÁMICA AQUÍ
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Cuenta creada con éxito! 🎉\nAhora puedes iniciar sesión.");
                navigate('/login'); // Lo mandamos al login para que entre
            } else {
                setError(data.message || "Error al registrarse");
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
                <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '24px', fontWeight: '600' }}>Crear Cuenta</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px', fontSize: '14px' }}>Únete a Loto Store y gestiona tus pedidos</p>

                {/* Mensaje de Error */}
                {error && (
                    <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '13px', textAlign: 'center' }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ej: Alex Yaranga"
                            required
                            onChange={handleChange}
                            style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', transition: 'border 0.2s' }}
                            onFocus={(e) => e.target.style.borderColor = '#111'}
                            onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        />
                    </div>

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
                            placeholder="Crea una contraseña segura"
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
                        {isLoading ? 'Creando cuenta...' : 'REGISTRARME'}
                    </button>
                </form>

                <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '14px' }}>
                    <p style={{ color: '#666' }}>¿Ya tienes una cuenta?</p>
                    <Link to="/login" style={{ color: '#111', fontWeight: 'bold', textDecoration: 'none' }}>
                        Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;