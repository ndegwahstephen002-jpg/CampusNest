import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [bookingMessage, setBookingMessage] = useState("");

  const initialHostels = [
  {
  name: "Green View Hostel",
  image: "https://picsum.photos/400/250?random=1",
  distance: "300m from Campus",
  price: "KSh 5,500/month",
  rating: "⭐⭐⭐⭐⭐",
  available: true,
  favorite: false,
map: "https://www.google.com/maps/search/?api=1&query=Green+View+Hostel",
},

    {
      name: "Sunrise Residence",
      image: "https://picsum.photos/400/250?random=2",
      distance: "450m from Campus",
      price: "KSh 6,000/month",
      rating: "⭐⭐⭐⭐",
      available: true,
      favorite: false,
      map: "https://www.google.com/maps/search/?api=1&query=Sunrise+Residence",
    },
    {
      name: "Elite Student Homes",
      image: "https://picsum.photos/400/250?random=3",
      distance: "200m from Campus",
      price: "KSh 7,000/month",
      rating: "⭐⭐⭐⭐⭐",
      available: false,
      favorite: false,
    map: "https://www.google.com/maps/search/?api=1&query=Elite+Student+Homes",
    },
  ];
  const [hostels, setHostels] = useState(initialHostels);
  const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});
  useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);
useEffect(() => {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}, [bookings]);
 const toggleFavorite = (name) => {
  if (favorites.includes(name)) {
    setFavorites(favorites.filter((item) => item !== name));
  } else {
    setFavorites([...favorites, name]);
  }
};


  return (
    <div className="app">
      <nav className="navbar">
        <h2>🏠 CampusNest</h2>

        {isLoggedIn && <p>👋 Welcome, Student!</p>}

        <button
          className="login-btn"
          onClick={() => setIsLoggedIn(!isLoggedIn)}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </nav>

      <section className="hero">
        <h1>Find Your Next Home Near Campus</h1>

        <p>
          Discover verified hostels, compare prices, and find the perfect place
          to stay.
        </p>

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search hostels..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="featured">
        <h2>⭐ Featured Hostels</h2>

        <div className="cards">
          {hostels
            .filter((hostel) =>
              hostel.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((hostel) => (
              <div className="card" key={hostel.name}>
                
<img
  src={hostel.image}
  alt={hostel.name}
  className="hostel-image"
/>
                <h3>🏡 {hostel.name}</h3>

                <p>{hostel.rating}</p>

                <p>
                  {hostel.available
                    ? "🟢 Available"
                    : "🔴 Fully Occupied"}
                </p>

                <p>📍 {hostel.distance}</p>
                <p>💰 {hostel.price}</p>

                <div className="card-buttons">
  <button onClick={() => setSelectedHostel(hostel)}>
    View Details
  </button>
<button
  className="favorite-btn"
  onClick={() => toggleFavorite(hostel.name)}
>
{favorites.includes(hostel.name) ? "❤️ Saved" : "🤍 Favorite"}
</button>
</div>
              </div>
            ))}
        </div>
      </section>

      {selectedHostel && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>🏠 {selectedHostel.name}</h2>

              <button
                className="close-icon"
                onClick={() => setSelectedHostel(null)}
              >
                ✕
              </button>
            </div>

            <p>📍 {selectedHostel.distance}</p>
            <p>💰 {selectedHostel.price}</p>
            <p>📶 Free Wi-Fi</p>
            <p>💧 Water Included</p>
            <p>🔐 24-Hour Security</p>

            <button
  onClick={() =>
    setBookingMessage(
      `✅ Booking request for ${selectedHostel.name} sent successfully!`
    )
  }
>
  Book Now
</button>

{bookingMessage && <p>{bookingMessage}</p>}

<button
  onClick={() => window.open(selectedHostel.map, "_blank")}
>
  📍 Open in Google Maps
</button>

<button onClick={() => setSelectedHostel(null)}>
  Close
</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;