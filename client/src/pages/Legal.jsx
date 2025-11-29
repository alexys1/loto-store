import { useParams } from 'react-router-dom';

function Legal() {
    const { type } = useParams(); // Detecta si es 'shipping', 'terms' o 'returns'

    const content = {
        shipping: {
            title: "Política de Envíos 🚚",
            text: "Realizamos envíos a todo Lima Metropolitana. El tiempo de entrega estimado es de 24 a 48 horas hábiles después de confirmado el pago. Para provincias, usamos Olva Courier (3-5 días hábiles)."
        },
        terms: {
            title: "Términos y Condiciones 📄",
            text: "Al comprar en Loto Store, aceptas que los productos son importados originales. Los precios están en Soles (PEN). Nos reservamos el derecho de cancelar órdenes sospechosas de fraude."
        },
        returns: {
            title: "Cambios y Devoluciones 🔄",
            text: "Tienes 7 días calendario para reportar fallas de fábrica. No aceptamos devoluciones por cambio de opinión si el empaque ha sido abierto. El producto debe estar sellado para cambios."
        }
    };

    const info = content[type] || { title: "Página no encontrada", text: "" };

    return (
        <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
            <h1 style={{ borderBottom: '4px solid #333', paddingBottom: '10px' }}>{info.title}</h1>
            <p style={{ fontSize: '1.1em', lineHeight: '1.6', marginTop: '20px' }}>
                {info.text}
            </p>
        </div>
    );
}

export default Legal;