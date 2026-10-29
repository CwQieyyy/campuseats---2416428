
import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState('')
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')

  // B2: Fetch vendor data from the JSON file
  useEffect(() => {
    const controller = new AbortController()

    async function loadVendors() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch('/api/vendors.json', {
          signal: controller.signal
        })

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`)
        }

        const data = await res.json()

        setVendors(data)

        if (data.length > 0) {
          setSelectedVendorId(data[0].id)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadVendors()

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  )

  // B3: Add an item or increase its quantity
  function handleAddToCart(item) {
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

  // B3: Change item quantity
  function handleChangeQty(itemId, delta) {
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

  // B3: Remove an item completely
  function handleRemove(itemId) {
    setCart((prevCart) =>
      prevCart.filter((line) => line.item.id !== itemId)
    )
  }

  const cartCount = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  const cartTotal = cart.reduce(
    (total, line) => total + line.item.price * line.qty,
    0
  )

  const [lastOrder, setLastOrder] = useState(null)
function handlePlaceOrder(details) {
const total = 0 // TODO: same reduce as CartPage
setLastOrder({ ...details, total })
setCart([])
setView('done')
}

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />

      <main className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage
            message={error}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        ) : view === 'menu' ? (
          <>
            <section>
              <h2 className="section-title">Choose a vendor</h2>

              <div className="vendor-grid">
                {vendors.map((vendor) => (
                  <VendorCard
                    key={vendor.id}
                    vendor={vendor}
                    isSelected={vendor.id === selectedVendorId}
                    onSelect={setSelectedVendorId}
                  />
                ))}
              </div>
            </section>

            {selectedVendor && (
              <section>
                <h2 className="section-title">
                  Menu: {selectedVendor.name}
                </h2>

                <MenuList
                  items={selectedVendor.menu}
                  onAdd={handleAddToCart}
                />
              </section>
            )}
          </>
        ) : (
          <section>
            <h2 className="section-title">Your Cart</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cart.map((line) => (
                  <div className="card" key={line.item.id}>
                    <h3>{line.item.name}</h3>
                    <p>
                      RM {Number(line.item.price).toFixed(2)} each
                    </p>

                    <div className="cart-controls">
                      <button
                        className="btn"
                        onClick={() =>
                          handleChangeQty(line.item.id, -1)
                        }
                      >
                        -
                      </button>

                      <span>Qty: {line.qty}</span>

                      <button
                        className="btn"
                        onClick={() =>
                          handleChangeQty(line.item.id, 1)
                        }
                      >
                        +
                      </button>

                      <button
                        className="btn"
                        onClick={() => handleRemove(line.item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <p>
                      Subtotal: RM{' '}
                      {(line.item.price * line.qty).toFixed(2)}
                    </p>
                  </div>
                ))}

                <h3>
                  Total: RM {cartTotal.toFixed(2)}
                </h3>
              </>
            )}
          </section>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
