
import { useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import MenuList from '../components/MenuList.jsx'

function VendorPage() {
  const { id } = useParams()

  const { vendors, loading, error, reload } = useVendors()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />
  }

  const vendor = vendors.find((v) => v.id === id)

  if (!vendor) {
    return <h2>Vendor not found</h2>
  }

  return (
    <section>
      <h2 className="section-title">
        Menu: {vendor.name}
      </h2>

      <p>{vendor.location}</p>

      <MenuList items={vendor.menu} />
    </section>
  )
}

export default VendorPage
