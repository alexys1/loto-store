import { useAuth } from '../context/AuthContext';

function Profile() {
    const { user } = useAuth();

    if (!user) return <div style={{ padding: '50px' }}>Cargando...</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Mi Cuenta</h1>

            <div style={{ marginTop: '30px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                {/* Tarjeta de Datos Personales */}
                <div style={{ flex: 1, minWidth: '300px', padding: '20px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3>👤 Datos Personales</h3>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role === 'admin' ? 'Administrador' : 'Cliente'}</p>
                    <button style={{ marginTop: '10px', padding: '5px 15px', border: '1px solid #333', background: 'transparent', cursor: 'pointer' }}>
                        Editar Datos
                    </button>
                </div>

                {/* Tarjeta de Direcciones */}
                <div style={{ flex: 1, minWidth: '300px', padding: '20px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <h3>📍 Mis Direcciones</h3>
                    <p style={{ color: '#666' }}>Dirección predeterminada:</p>
                    <p>{user.address || "No tienes una dirección guardada aún."}</p>
                    <button style={{ marginTop: '10px', padding: '5px 15px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
                        Gestionar Direcciones
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;