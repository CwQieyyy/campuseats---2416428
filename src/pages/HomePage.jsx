
import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  return (
    <section>
      <h2 className="section-title">Choose a Vendor</h2>

      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <Link
            to={`/vendor/${vendor.id}`}
            key={vendor.id}
            className="vendor-link"
          >
            <div className="card">
              <h3>{vendor.name}</h3>
              <p>{vendor.location}</p>
              <p>{vendor.openHours}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HomePage
