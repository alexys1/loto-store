import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Al cargar la página, revisamos si ya había una sesión guardada
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Función para Iniciar Sesión (La usaremos en Login.jsx)
    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData); // Actualiza el estado al instante
    };

    // Función para Cerrar Sesión (La usaremos en el Navbar)
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null); // Borra el usuario al instante
        window.location.href = '/'; // Redirige al home
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);