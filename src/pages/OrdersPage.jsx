
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <section>
        <h2 className="section-title">My Orders</h2>
        <p className="muted">You have no orders yet.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="section-title">My Orders</h2>

      {orders.map((order) => (
        <div className="card" key={order.id}>
          <h3>Order #{order.id}</h3>

          <p>Name: {order.details.name}</p>
          <p>Mahallah: {order.details.mahallah}</p>
          <p>Estimated ready at: {order.details.pickupTime}</p>

          <h4>Items:</h4>

          {order.items.map((line) => (
            <p key={line.item.id}>
              {line.item.name} x {line.qty}
            </p>
          ))}

          <h3>Total: RM {order.total.toFixed(2)}</h3>
        </div>
      ))}
    </section>
  )
}

export default OrdersPage
