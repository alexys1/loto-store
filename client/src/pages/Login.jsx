import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- Importamos contexto

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth(); // <--- Extraemos la función login

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // USAMOS LA FUNCIÓN DEL CONTEXTO (Esto actualiza el Navbar al instante)
                login(data.user, data.token);

                alert("¡Bienvenido de nuevo!");
                navigate('/');
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ padding: '50px 20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="email" name="email" placeholder="Tu correo" required
                    onChange={handleChange} style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="password" name="password" placeholder="Tu contraseña" required
                    onChange={handleChange} style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '12px', backgroundColor: '#111', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                    INGRESAR
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                ¿Nuevo aquí? <Link to="/register" style={{ color: '#111', fontWeight: 'bold' }}>Crea tu cuenta</Link>
            </p>
        </div>
    );
}

export default Login;