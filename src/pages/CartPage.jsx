import { useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import CheckoutForm from '../components/CheckoutForm.jsx'

function CartPage() {
  const {
    cart,
    total,
    changeQty,
    removeFromCart,
    placeOrder
  } = useCart()

  const navigate = useNavigate()

  function handlePlaceOrder(details) {
    placeOrder(details)
    navigate('/orders')
  }

  if (cart.length === 0) {
    return (
      <section>
        <h2 className="section-title">Your Cart</h2>
        <p className="muted">Your cart is empty.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your Cart</h2>

      {cart.map((line) => (
        <div className="card" key={line.item.id}>
          <h3>{line.item.name}</h3>
          <p>RM {line.item.price.toFixed(2)}</p>

          <button className="btn" onClick={() => changeQty(line.item.id, -1)}>
            -
          </button>

          <span> {line.qty} </span>

          <button className="btn" onClick={() => changeQty(line.item.id, 1)}>
            +
          </button>

          <button className="btn" onClick={() => removeFromCart(line.item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: RM {total.toFixed(2)}</h3>

      <CheckoutForm onPlaceOrder={handlePlaceOrder} />
    </section>
  )
}

export default CartPage
