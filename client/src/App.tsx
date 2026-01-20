import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Gallery } from './components/Gallery'
import { Upload } from './components/Upload'
import { Stories } from './components/Stories'
import { Admin } from './components/Admin'
import { CollectionCarousel } from './components/CollectionCarousel'
import { fetchCollections } from './services/api'
import type { Collection } from './types'
import './App.css'

// TODO: Implement Auth Context
// - Add authentication provider
// - Check if user is admin
// - Show/hide Upload nav item based on admin status
// - Protect upload route

function Sidebar({ collections, activeCollectionId }: { collections: Collection[], activeCollectionId?: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  // TODO: Replace with actual auth check
  const isAdmin = true; // Placeholder - will be replaced with auth context

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">All Collections</span>
        </button>

        <button
          className={`nav-item ${isActive('/stories') ? 'active' : ''}`}
          onClick={() => navigate('/stories')}
        >
          <span className="nav-icon">📖</span>
          <span className="nav-label">Stories</span>
        </button>

        {/* TODO: Only show Admin if user is admin */}
        {isAdmin && (
          <button
            className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => navigate('/admin')}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Admin</span>
          </button>
        )}

        {collections.length > 0 && (
          <>
            <div className="nav-divider"></div>
            <div className="nav-section-title">Collections</div>
            {collections.map((collection) => (
              <button
                key={collection.id}
                className={`nav-item nav-item-collection ${activeCollectionId === collection.id ? 'active' : ''}`}
                onClick={() => navigate(`/collection/${collection.id}`)}
              >
                {collection.coverPhoto ? (
                  <img 
                    src={collection.coverPhoto} 
                    alt={collection.name}
                    className="nav-cover-photo"
                  />
                ) : (
                  <span className="nav-icon">📁</span>
                )}
                <span className="nav-label">{collection.name}</span>
                <span className="nav-count">{collection.itemCount ?? collection.items.length}</span>
              </button>
            ))}
          </>
        )}
      </nav>
    </aside>
  )
}

function AppContent() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Extract collectionId from URL
  const collectionId = location.pathname.startsWith('/collection/') 
    ? location.pathname.split('/collection/')[1] 
    : undefined;

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchCollections()
      setCollections(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load collections')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadComplete = (newCollection: Collection) => {
    setCollections(prev => [newCollection, ...prev])
    setTimeout(() => navigate('/'), 1500)
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload error:', error)
  }

  return (
    <div className="App">
      <Sidebar collections={collections} activeCollectionId={collectionId} />
      
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {error && (
                  <div className="error-message">
                    <p>❌ {error}</p>
                    <button onClick={loadCollections} className="btn-retry">
                      Retry
                    </button>
                  </div>
                )}
                {loading ? (
                  <div className="gallery-loading">
                    <p>Loading collections...</p>
                  </div>
                ) : (
                  <CollectionCarousel collections={collections} />
                )}
              </>
            }
          />
          <Route
            path="/stories"
            element={<Stories />}
          />
          <Route
            path="/collection/:collectionId"
            element={
              <>
                {error && (
                  <div className="error-message">
                    <p>❌ {error}</p>
                    <button onClick={loadCollections} className="btn-retry">
                      Retry
                    </button>
                  </div>
                )}
                <Gallery collections={collections} loading={loading} singleCollection />
              </>
            }
          />
          <Route
            path="/admin"
            element={<Admin />}
          />
          <Route
            path="/upload"
            element={
              <div className="upload-page">
                <h2 className="page-title">Upload Images</h2>
                {/* TODO: Implement Upload Builder
                    - Step 1: Ask "Is this a new collection?" or "Add to existing?"
                    - Step 2: If new, prompt for collection name and cover photo
                    - Step 3: If existing, show dropdown to select collection
                    - Step 4: Add metadata fields (title, description, date acquired, story, etc.)
                    - Step 5: Upload image(s)
                    - Consider multi-step wizard or form with sections
                */}
                <Upload 
                  onUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
                <div className="upload-todo">
                  <p><strong>⚠️ TODO: Enhanced Upload Builder</strong></p>
                  <ul>
                    <li>Add "New Collection" vs "Existing Collection" selector</li>
                    <li>Collection name and cover photo selection for new collections</li>
                    <li>Metadata fields: title, description, acquisition date, story</li>
                    <li>Multi-step wizard interface</li>
                  </ul>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
