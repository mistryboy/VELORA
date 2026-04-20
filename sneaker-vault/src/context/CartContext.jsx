import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    const initCart = async () => {
      setIsInitializing(true);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.id);
          const userDoc = await getDoc(userDocRef);
          let dbCart = [];
          
          if (userDoc.exists() && userDoc.data().cartItems) {
            dbCart = userDoc.data().cartItems;
          } else {
            await setDoc(userDocRef, { cartItems: [] }, { merge: true });
          }

          const localCartStr = localStorage.getItem('vault_cart');
          const localCart = localCartStr ? JSON.parse(localCartStr) : [];

          if (localCart.length > 0) {
            // Merge guest cart into db cart
            const merged = [...dbCart];
            localCart.forEach(localItem => {
              const existing = merged.find(i => i.id === localItem.id && i.selectedSize === localItem.selectedSize);
              if (existing) {
                existing.quantity += localItem.quantity;
              } else {
                merged.push(localItem);
              }
            });
            
            await updateDoc(userDocRef, { cartItems: merged });
            setCart(merged);
            localStorage.removeItem('vault_cart');
          } else {
            setCart(dbCart);
          }
        } catch (e) {
          console.error("Failed to fetch Firestore cart:", e);
        }
      } else {
        const local = localStorage.getItem('vault_cart');
        setCart(local ? JSON.parse(local) : []);
      }
      setIsInitializing(false);
    };

    initCart();
  }, [user, authLoading]);

  const syncCart = async (newCart) => {
    setCart(newCart);
    if (!isInitializing) {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.id);
          await updateDoc(userDocRef, { cartItems: newCart });
        } catch (e) {
          console.error("Failed to sync cart to Firestore:", e);
        }
      } else {
        localStorage.setItem('vault_cart', JSON.stringify(newCart));
      }
    }
  };

  const addToCart = (product) => {
    const size = product.selectedSize || product.sizes[0];
    const existing = cart.find((item) => item.id === product.id && item.selectedSize === size);
    
    let newCart;
    if (existing) {
      newCart = cart.map((item) =>
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + (product.quantity || 1) }
          : item
      );
    } else {
      newCart = [...cart, { ...product, selectedSize: size, quantity: product.quantity || 1 }];
    }
    
    syncCart(newCart);
    setCartOpen(true);
  };

  const updateCartQty = (item, delta) => {
    const newCart = cart
      .map((ci) =>
        ci.id === item.id && ci.selectedSize === item.selectedSize
          ? { ...ci, quantity: ci.quantity + delta }
          : ci
      )
      .filter((ci) => ci.quantity > 0);
    
    syncCart(newCart);
  };

  const removeFromCart = (item) => {
    const newCart = cart.filter((ci) => !(ci.id === item.id && ci.selectedSize === item.selectedSize));
    syncCart(newCart);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      totalItems,
      totalPrice,
      cartOpen,
      setCartOpen,
      isInitializing
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
