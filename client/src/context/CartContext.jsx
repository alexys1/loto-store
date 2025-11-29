import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Creamos el proveedor (el componente que envolverá a toda la app)
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para agregar al carrito
    const addToCart = (product) => {
        setCart((prevCart) => {
            // Verificamos si ya existe para aumentar la cantidad
            const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            // Si es nuevo, lo agregamos con cantidad 1
            return [...prevCart, { ...product, quantity: 1 }];
        });
        alert("¡Producto agregado! 🛒"); // Feedback simple
    };

    // Función para remover del carrito
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item._id !== productId));
    };

    // Calculamos el total a pagar
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Un hook personalizado para usarlo fácil
export const useCart = () => useContext(CartContext);