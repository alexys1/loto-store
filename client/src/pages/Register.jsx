import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación rápida de formato antes de enviar
        if (!formData.email.includes('@')) return alert("Por favor ingresa un correo real.");

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
                navigate('/login'); // Lo mandamos al login
            } else {
                alert("Error: " + data.message); // Aquí avisará si el correo ya existe
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Crear Cuenta Nueva</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text" name="name" placeholder="Nombre completo" required
                    onChange={handleChange} style={{ padding: '10px' }}
                />
                <input
                    type="email" name="email" placeholder="Correo electrónico" required
                    onChange={handleChange} style={{ padding: '10px' }}
                />
                <input
                    type="password" name="password" placeholder="Contraseña segura" required
                    onChange={handleChange} style={{ padding: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Registrarse
                </button>
            </form>
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
        </div>
    );
}

export default Register;