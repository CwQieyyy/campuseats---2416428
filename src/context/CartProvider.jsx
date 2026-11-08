
import { useMemo } from 'react'
import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  // Calculate total quantity
  const count = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  // Calculate total price
  const total = cart.reduce(
    (sum, line) => sum + line.item.price * line.qty,
    0
  )

  // Add item to cart
  function addToCart(item) {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (line) => line.item.id === item.id
      )

      if (existingItem) {
        return prevCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prevCart, { item, qty: 1 }]
    })
  }

  // Change item quantity
  function changeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  // Remove item from cart
  function removeFromCart(itemId) {
    setCart((prevCart) =>
      prevCart.filter((line) => line.item.id !== itemId)
    )
  }

  // Place an order
  function placeOrder(details) {
    const newOrder = {
      id: Date.now(),
      details,
      items: cart,
      total,
      createdAt: new Date().toISOString()
    }

    setOrders((prevOrders) => [...prevOrders, newOrder])
    setCart([])
  }

  const value = useMemo(() => ({
    cart,
    orders,
    count,
    total,
    addToCart,
    changeQty,
    removeFromCart,
    placeOrder
  }), [cart, orders, count, total])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
