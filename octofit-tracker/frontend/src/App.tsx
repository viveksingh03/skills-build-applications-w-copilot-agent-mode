import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Welcome to the OctoFit frontend.</p>
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h2>About</h2>
      <p>This modern React + Vite frontend is initialized for OctoFit Tracker.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            OctoFit Tracker
          </Link>
          <div>
            <Link className="nav-link d-inline-block me-3" to="/">
              Home
            </Link>
            <Link className="nav-link d-inline-block" to="/about">
              About
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
