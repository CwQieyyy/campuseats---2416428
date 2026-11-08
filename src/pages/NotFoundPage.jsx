
import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="card">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, this page does not exist.</p>

      <Link to="/">Back to Vendors</Link>
    </div>
  )
}

export default NotFoundPage
