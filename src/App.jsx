import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
const [verifiedFilter, setVerifiedFilter] = useState("all");
const [sortOption, setSortOption] = useState("default");
const [maxPrice, setMaxPrice] = useState("");
const [maxDistance, setMaxDistance] = useState("");
  

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
 

  const [showLogin, setShowLogin] = useState(false);
  const [showAddHostelForm, setShowAddHostelForm] = useState(false);
  const [showStudentDashboard, setShowStudentDashboard] = useState(false);
  const [showLandlordDashboard, setShowLandlordDashboard] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [selectedHostel, setSelectedHostel] = useState(null);

  const [bookingMessage, setBookingMessage] = useState("");
  const [bookings, setBookings] = useState(() => {
  const savedBookings = localStorage.getItem("bookings");
  return savedBookings ? JSON.parse(savedBookings) : [];
});
  const [dashboardPage, setDashboardPage] = useState("home");
  const [portalHostelDetails, setPortalHostelDetails] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingFromPortal, setBookingFromPortal] = useState(false);
  const [bookingHostel, setBookingHostel] = useState(null);

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [newHostelName, setNewHostelName] = useState("");
const [newHostelLocation, setNewHostelLocation] = useState("");
const [newHostelPrice, setNewHostelPrice] = useState("");
const [newHostelAvailable, setNewHostelAvailable] = useState(true);
const [newHostelImage, setNewHostelImage] = useState("");
const [editingHostel, setEditingHostel] = useState(null);
const [editHostelName, setEditHostelName] = useState("");
const [editHostelLocation, setEditHostelLocation] = useState("");
const [editHostelPrice, setEditHostelPrice] = useState("");
const [editHostelAvailable, setEditHostelAvailable] = useState(true);
const [statsStarted, setStatsStarted] = useState(false);

const [verifiedCount, setVerifiedCount] = useState(0);
const [studentCount, setStudentCount] = useState(0);
const [bookingCount, setBookingCount] = useState(0);
const [landlordCount, setLandlordCount] = useState(0);
const featuredHostelsRef = useRef(null);
const heroImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118",
];

const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const initialHostels = [
    {
      name: "Green View Hostel",
      image: "https://picsum.photos/400/250?random=1",
      distance: "300m from Campus",
      price: "KSh 5,500/month",
      rating: "⭐⭐⭐⭐⭐",
      verified: true,
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
      verified: true,
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
      verified: false,
      available: false,
      favorite: false,
      map: "https://www.google.com/maps/search/?api=1&query=Elite+Student+Homes",
    },
  
{
  name: "Campus Heights",
  image: "https://picsum.photos/400/250?random=4",
  distance: "150m from Campus",
  price: "KSh 6,200/month",
  rating: "⭐⭐⭐⭐⭐",
  verified: true,
  available: true,
  favorite: false,
  map: "https://www.google.com/maps/search/?api=1&query=Campus+Heights",
},

{
  name: "Royal Student Homes",
  image: "https://picsum.photos/400/250?random=5",
  distance: "500m from Campus",
  price: "KSh 5,800/month",
  rating: "⭐⭐⭐⭐",
  verified: true,
  available: true,
  favorite: false,
  map: "https://www.google.com/maps/search/?api=1&query=Royal+Student+Homes",
},

{
  name: "Victory Residence",
  image: "https://picsum.photos/400/250?random=6",
  distance: "250m from Campus",
  price: "KSh 6,500/month",
  rating: "⭐⭐⭐⭐⭐",
  verified: true,
  available: true,
  favorite: false,
  map: "https://www.google.com/maps/search/?api=1&query=Victory+Residence",
},

{
  name: "Prestige Hostel",
  image: "https://picsum.photos/400/250?random=7",
  distance: "350m from Campus",
  price: "KSh 7,200/month",
  rating: "⭐⭐⭐⭐⭐",
  verified: true,
  available: true,
  favorite: false,
  map: "https://www.google.com/maps/search/?api=1&query=Prestige+Hostel",
},

{
  name: "Smart Living Hostel",
  image: "https://picsum.photos/400/250?random=8",
  distance: "180m from Campus",
  price: "KSh 5,900/month",
  rating: "⭐⭐⭐⭐",
  verified: true,
  available: true,
  favorite: false,
  map: "https://www.google.com/maps/search/?api=1&query=Smart+Living+Hostel",
}
  ];

const [hostels, setHostels] = useState( () => {
  const savedHostels = localStorage.getItem("hostels");
  return savedHostels ? JSON.parse(savedHostels) : initialHostels;
});
const filteredHostels = hostels
  .filter((hostel) => hostel)

  // SEARCH
  .filter((hostel) => {
    const hostelName = hostel.name
      ? hostel.name.toLowerCase()
      : "";

    return hostelName.includes(search.toLowerCase().trim());
  })

  // AVAILABILITY
  .filter((hostel) => {
    if (availabilityFilter === "available") {
      return hostel.available === true;
    }

    if (availabilityFilter === "occupied") {
      return hostel.available === false;
    }

    return true;
  })

  // VERIFIED
  .filter((hostel) => {
    if (verifiedFilter === "verified") {
      return hostel.verified === true;
    }

    if (verifiedFilter === "unverified") {
      return hostel.verified !== true;
    }

    return true;
  })

  // MAXIMUM PRICE
  .filter((hostel) => {
    if (maxPrice === "") {
      return true;
    }

    const priceNumber = Number(
      String(hostel.price || "").replace(/[^0-9.]/g, "")
    );

    return priceNumber <= Number(maxPrice);
  })

  // MAXIMUM DISTANCE
  .filter((hostel) => {
    if (maxDistance === "") {
      return true;
    }

    const distanceNumber = Number(
      String(hostel.distance || "").replace(/[^0-9.]/g, "")
    );

    return distanceNumber <= Number(maxDistance);
  })

  // SORT
  .sort((a, b) => {
    const priceA = Number(
      String(a.price || "").replace(/[^0-9.]/g, "")
    );

    const priceB = Number(
      String(b.price || "").replace(/[^0-9.]/g, "")
    );

    const distanceA = Number(
      String(a.distance || "").replace(/[^0-9.]/g, "")
    );

    const distanceB = Number(
      String(b.distance || "").replace(/[^0-9.]/g, "")
    );

    if (sortOption === "price-low") {
      return priceA - priceB;
    }

    if (sortOption === "price-high") {
      return priceB - priceA;
    }

    if (sortOption === "distance-near") {
      return distanceA - distanceB;
    }

    if (sortOption === "rating-high") {
      const ratingA = String(a.rating || "").length;
      const ratingB = String(b.rating || "").length;

      return ratingB - ratingA;
    }

    return 0;
  });
const [landlordHostels, setLandlordHostels] = useState(() => {
  const savedLandlordHostels = localStorage.getItem("landlordHostels");

  return savedLandlordHostels
    ? JSON.parse(savedLandlordHostels)
    : initialHostels;
});

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
  localStorage.setItem("hostels", JSON.stringify(hostels));
}, [hostels]);
useEffect(() => {
  localStorage.setItem(
    "landlordHostels",
    JSON.stringify(landlordHostels)
  );
}, [landlordHostels]);
  useEffect(() => {
  localStorage.setItem("bookings", JSON.stringify(bookings));
}, [bookings]);
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentHeroImage((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  }, 4000);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  if (statsStarted) return;

  setStatsStarted(true);

  let verified = 0;
  let students = 0;
  let bookingsNum = 0;
  let landlords = 0;

  const interval = setInterval(() => {
    if (verified < 150) {
      verified += 3;
      setVerifiedCount(Math.min(verified, 150));
    }

    if (students < 1200) {
      students += 24;
      setStudentCount(Math.min(students, 1200));
    }

    if (bookingsNum < 560) {
      bookingsNum += 12;
      setBookingCount(Math.min(bookingsNum, 560));
    }

    if (landlords < 85) {
      landlords += 2;
      setLandlordCount(Math.min(landlords, 85));
    }

    if (
      verified >= 150 &&
      students >= 1200 &&
      bookingsNum >= 560 &&
      landlords >= 85
    ) {
      clearInterval(interval);
    }
  }, 30);

  return () => clearInterval(interval);
}, []);

  const toggleFavorite = (name) => {
    if (favorites.includes(name)) {
      setFavorites(favorites.filter((item) => item !== name));
    } else {
      setFavorites([...favorites, name]);
    }
  };

  const handleLogin = () => {
    if (
      loginEmail.trim() === "" ||
      loginPassword.trim() === ""
    ) {
      alert("Please enter both email and password.");
      return;
    }

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
  };
  const updateBookingStatus = (index, status) => {
  const updatedBookings = [...bookings];

  updatedBookings[index].status = status;

  setBookings(updatedBookings);
};
const scrollLeft = () => {
  featuredHostelsRef.current?.scrollBy({
    left: -350,
    behavior: "smooth",
  });
};

const scrollRight = () => {
  featuredHostelsRef.current?.scrollBy({
    left: 350,
    behavior: "smooth",
  });
};
  return (
    <div className="app">
{showAdminDashboard ? (
  <section className="admin-dashboard">
    <div className="landlord-header">
      <h1>🛡️ Admin Dashboard</h1>

      <div className="landlord-header-actions">
        <button
          className="back-home-btn"
          onClick={() => setShowAdminDashboard(false)}
        >
          🏠 Back to Hostels
        </button>
      </div>
    </div>

    <h2>🏠 Hostel Submissions</h2>

    <p>Review hostels submitted by landlords.</p>
    {landlordHostels
  .filter((hostel) => hostel.status === "Pending Approval")
  .map((hostel) => (
    <div key={hostel.name} className="admin-hostel-card">
      <h3>🏠 {hostel.name}</h3>

      <p>📍 {hostel.distance}</p>

      <p>💰 {hostel.price}</p>

      <p>🟡 Pending Approval</p>

      <button
       onClick={() => {
  const approvedHostel = {
    ...hostel,
    status: "Approved",
  };

  setLandlordHostels(
    landlordHostels.map((item) =>
      item.name === hostel.name
        ? approvedHostel
        : item
    )
  );

  setHostels((currentHostels) => {
    const alreadyExists = currentHostels.some(
      (item) => item.name === hostel.name
    );

    if (alreadyExists) {
      return currentHostels.map((item) =>
        item.name === hostel.name
          ? approvedHostel
          : item
      );
    }

    return [...currentHostels, approvedHostel];
  });
}}
      >
        ✅ Approve
      </button>

      <button
        onClick={() => {
          setLandlordHostels(
            landlordHostels.map((item) =>
              item.name === hostel.name
                ? { ...item, status: "Rejected" }
                : item
            )
          );
        }}
      >
        ❌ Reject
      </button>
    </div>
  ))}

  </section>
) : showLandlordDashboard ? (
<section className="landlord-dashboard">

<div className="landlord-header">

  <h1>🏠 Landlord Dashboard</h1>

  <div className="landlord-header-actions">

   <button
  className="top-add-hostel-btn"
  onClick={() => setShowAddHostelForm(!showAddHostelForm)}
>
  {showAddHostelForm
    ? "✖ Close Add Hostel"
    : "➕ Add New Hostel"}
</button>

    <button
      className="back-home-btn"
      onClick={() => setShowLandlordDashboard(false)}
    >
      🏠 Back to Hostels
    </button>

  </div>

</div>
    <div className="landlord-stats">

  <div className="landlord-stat-box">
    <h2>{landlordHostels.length}</h2>
    <p>🏠 My Hostels</p>
  </div>

  <div className="landlord-stat-box">
  <h2>
    {landlordHostels.filter(
      (hostel) => hostel && hostel.available
    ).length}
  </h2>
  <p>🟢 Available</p>
</div>

  <div className="landlord-stat-box">
    <h2>
      {
        bookings.filter(
          (booking) => booking.status === "Pending Approval"
        ).length
      }
    </h2>
    <p>📩 Pending Requests</p>
  </div>

</div>
<div className="landlord-summary">

  <div className="summary-card approved">
    <h3>
      {
        bookings.filter(
          (booking) => booking.status === "Approved"
        ).length
      }
    </h3>
    <p>✅ Approved</p>
  </div>

  <div className="summary-card rejected">
    <h3>
      {
        bookings.filter(
          (booking) => booking.status === "Rejected"
        ).length
      }
    </h3>
    <p>❌ Rejected</p>
  </div>

  <div className="summary-card pending">
    <h3>
      {
        bookings.filter(
          (booking) => booking.status === "Pending Approval"
        ).length
      }
    </h3>
    <p>🟡 Pending</p>
  </div>

</div>



  {editingHostel && (
  <div className="edit-hostel-section">

    <h2>✏️ Edit Hostel</h2>

    <input
      type="text"
      placeholder="🏠 Hostel Name"
      value={editHostelName}
      onChange={(e) => setEditHostelName(e.target.value)}
    />

    <input
      type="text"
      placeholder="📍 Location / Distance"
      value={editHostelLocation}
      onChange={(e) => setEditHostelLocation(e.target.value)}
    />

    <input
      type="text"
      placeholder="💰 Price"
      value={editHostelPrice}
      onChange={(e) => setEditHostelPrice(e.target.value)}
    />

    <select
      value={editHostelAvailable}
      onChange={(e) =>
        setEditHostelAvailable(e.target.value === "true")
      }
    >
      <option value="true">🟢 Available</option>
      <option value="false">🔴 Fully Occupied</option>
    </select>

    <div className="edit-hostel-buttons">

      <button
        className="save-edit-btn"
        onClick={() => {

          setLandlordHostels(
  landlordHostels.map((item) =>
    item.name === editingHostel.name
      ? {
          ...item,
          name: editHostelName,
          distance: editHostelLocation,
          price: editHostelPrice,
          available: editHostelAvailable,
        }
      : item
  )
);

          setEditingHostel(null);
        }}
      >
        💾 Save Changes
      </button>

      <button
        className="cancel-edit-btn"
        onClick={() => setEditingHostel(null)}
      >
        ✖ Cancel
      </button>

    </div>

  </div>
)}
{showAddHostelForm && (
  <div className="add-hostel-section">

    <h2>➕ Add New Hostel</h2>

    <input
      type="text"
      placeholder="🏠 Hostel Name"
      value={newHostelName}
      onChange={(e) => setNewHostelName(e.target.value)}
    />

    <input
      type="text"
      placeholder="📍 Location / Distance"
      value={newHostelLocation}
      onChange={(e) => setNewHostelLocation(e.target.value)}
    />

    <input
      type="text"
      placeholder="💰 Price"
      value={newHostelPrice}
      onChange={(e) => setNewHostelPrice(e.target.value)}
    />
    <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewHostelImage(reader.result);
    };

    reader.readAsDataURL(file);
  }}
/>


    <input
      type="text"
      placeholder="🖼️ Image URL"
      value={newHostelImage}
      onChange={(e) => setNewHostelImage(e.target.value)}
    />

    <select
      value={newHostelAvailable}
      onChange={(e) => setNewHostelAvailable(e.target.value === "true")}
    >
      <option value="true">🟢 Available</option>
      <option value="false">🔴 Fully Occupied</option>
    </select>

    <button
      className="add-hostel-btn"
      onClick={() => {
        if (
          newHostelName.trim() === "" ||
          newHostelLocation.trim() === "" ||
          newHostelPrice.trim() === ""
        ) {
          alert("Please fill in all hostel details.");
          return;
        }

      setLandlordHostels([
  ...landlordHostels,
  {
    name: newHostelName,
    image: newHostelImage,
    distance: newHostelLocation,
    price: newHostelPrice,
    rating: "⭐⭐⭐⭐⭐",
available: newHostelAvailable,
status: "Pending Approval",
favorite: false,
    map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(newHostelName)}`,
  },
]);

        setNewHostelName("");
        setNewHostelLocation("");
        setNewHostelPrice("");
        setNewHostelAvailable(true);
        setShowAddHostelForm(false);

        alert("🏠 Hostel added successfully!");
      }}
    >
      ➕ Add Hostel
    </button>

  </div>
)}
  <h2>🏠 My Hostels</h2>

{landlordHostels.length === 0 ? (
  <p>No hostels added yet.</p>
) : (
  <div className="landlord-hostel-list">

    {landlordHostels
  .filter((hostel) => hostel)
  .map((hostel) => (
      <div className="dashboard-card" key={hostel.name}>

        <img
          src={hostel.image}
          alt={hostel.name}
          className="hostel-image"
        />

        <h3>🏡 {hostel.name}</h3>

        <p>
          📍 {hostel.distance}
        </p>

        <p>
          💰 {hostel.price}
        </p>

     <p>
  {hostel.status === "Pending Approval"
    ? "🟡 Pending Approval"
    : hostel.status === "Approved"
    ? "🟢 Approved"
    : hostel.status === "Rejected"
    ? "🔴 Rejected"
    : ""}
</p>
        
        <button
  className="edit-hostel-btn"
  onClick={() => {
    setEditingHostel(hostel);
    setEditHostelName(hostel.name);
    setEditHostelLocation(hostel.distance);
    setEditHostelPrice(hostel.price);
    setEditHostelAvailable(hostel.available);
  }}
>
  ✏️ Edit Hostel
</button>
<button
  className="toggle-status-btn"
  onClick={() => {
    setLandlordHostels(
  landlordHostels.map((item) =>
    item.name === hostel.name
      ? {
          ...item,
          available: !item.available,
        }
      : item
  )
);
  }}
>
  {hostel.available
    ? "🔒 Mark Occupied"
    : "🔓 Mark Available"}
</button>
        <button
  className="remove-hostel-btn"
  onClick={() => {
    const confirmRemove = window.confirm(
      `Are you sure you want to remove ${hostel.name}?`
    );

    if (confirmRemove) {
  setLandlordHostels(
    landlordHostels.filter(
      (item) => item.name !== hostel.name
    )
  );
}
  }}
>
  🗑️ Remove Hostel
</button>

      </div>
    ))}

  </div>
)}

  <h2 className="booking-requests-heading">
  📩 Booking Requests
</h2>
{bookings.length === 0 ? (
  <p>No booking requests yet.</p>
) : (
  bookings.map((booking, index) => (
    <div className="booking-request-card" key={index}>

      <h3>🏠 {booking.name}</h3>

      <p>👤 Student: {booking.fullName}</p>

      <p>📞 {booking.phoneNumber}</p>

      <p>📅 Move-in Date: {booking.moveInDate}</p>

      <p>
        Status:
        <span
          className={
            booking.status === "Approved"
              ? "approved"
              : booking.status === "Rejected"
              ? "rejected"
              : "pending"
          }
        >
          {" "}
          {booking.status}
        </span>
      </p>

      {booking.status === "Pending Approval" && (
        <div className="booking-action-buttons">

          <button
            className="approve-booking-btn"
            onClick={() => {
              setBookings(
                bookings.map((item, i) =>
                  i === index
                    ? { ...item, status: "Approved" }
                    : item
                )
              );
            }}
          >
            ✅ Approve
          </button>

          <button
            className="reject-booking-btn"
            onClick={() => {
              setBookings(
                bookings.map((item, i) =>
                  i === index
                    ? { ...item, status: "Rejected" }
                    : item
                )
              );
            }}
          >
            ❌ Reject
          </button>
        
        <button
  className="delete-booking-btn"
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (confirmDelete) {
      setBookings(
        bookings.filter((_, i) => i !== index)
      );
    }
  }}
>
  🗑️ Delete Booking
</button>

        </div>
      )}

    </div>
  ))
)}

</section>

) : showStudentDashboard ? (

<section className="student-dashboard">

    <div className="dashboard-header">
      <div>
  <h1>
  👋 Welcome Back{fullName ? `, ${fullName}` : ""}!
</h1>

  <p>
  {fullName
    ? `Great to see you again, ${fullName}. Ready to find your next home?`
    : "Manage your favourite hostels, bookings, and student profile from one place."}
</p>
</div>

      <button
        className="back-home-btn"
        onClick={() => setShowStudentDashboard(false)}
      >
        🏠 Back to Hostels
      </button>
    </div>
    {portalHostelDetails ? (
  <div className="portal-hostel-details">

    <button
      className="back-home-btn"
      onClick={() => setPortalHostelDetails(null)}
    >
      ← Back to Favorite Hostels
    </button>

    <div className="portal-details-card">

      <img
        src={portalHostelDetails.image}
        alt={portalHostelDetails.name}
        className="hostel-image"
      />

      <h2>🏠 {portalHostelDetails.name}</h2>

      {portalHostelDetails.verified && (
        <p className="verified-badge">
          ✅ Verified Hostel
        </p>
      )}

      <p>📍 {portalHostelDetails.distance}</p>
      <p>💰 {portalHostelDetails.price}</p>
      <p>⭐ {portalHostelDetails.rating}</p>

      <p>📶 Free Wi-Fi</p>
      <p>💧 Water Included</p>
      <p>🔐 24-Hour Security</p>

      <div className="portal-details-buttons">

     <button
onClick={() => {
  if (!isLoggedIn) {
    setShowLogin(true);
    return;
  }

  setBookingHostel(portalHostelDetails);
  setBookingFromPortal(true);
  setShowBookingForm(true);
}}
>
  
  {isLoggedIn
    ? "📅 Book Now"
    : "🔐 Login to Book"}
</button>
        <button
          onClick={() =>
            window.open(
              portalHostelDetails.map,
              "_blank"
            )
          }
        >
          📍 Open in Google Maps
        </button>

      </div>

               </div>

        {/* PORTAL BOOKING FORM */}
        {showBookingForm && bookingHostel && (
          <div className="portal-booking-overlay">

            <div className="portal-booking-modal">

              <div className="modal-header">
                <h2>
                  📋 Book {bookingHostel.name}
                </h2>

                <button
                  className="close-icon"
                  onClick={() => {
                    setShowBookingForm(false);
                    setBookingHostel(null);
                    setBookingFromPortal(false);
                  }}
                >
                  ✕
                </button>
              </div>

              <p>📍 {bookingHostel.distance}</p>
              <p>💰 {bookingHostel.price}</p>

              <div className="booking-details">

                <input
                  type="text"
                  placeholder="👤 Full Name"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value)
                  }
                />

                <input
                  type="tel"
                  placeholder="📱 Phone Number"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                />

                <input
                  type="date"
                  value={moveInDate}
                  onChange={(e) =>
                    setMoveInDate(e.target.value)
                  }
                />

              </div>

              <button
                onClick={() => {

                  if (
                    fullName.trim() === "" ||
                    phoneNumber.trim() === "" ||
                    moveInDate === ""
                  ) {
                    alert(
                      "Please fill in all booking details."
                    );
                    return;
                  }

                  setBookingMessage(
                    `✅ Booking request for ${bookingHostel.name} submitted successfully!`
                  );

                  setBookings([
                    ...bookings,
                    {
                      name: bookingHostel.name,
                      location: bookingHostel.distance,
                      price: bookingHostel.price,
                      phoneNumber: phoneNumber,
                      fullName: fullName,
                      moveInDate: moveInDate,
                      status: "Pending Approval",
                      date: new Date().toLocaleDateString(),
                    },
                  ]);

                  setFullName("");
                  setPhoneNumber("");
                  setMoveInDate("");

                  setShowBookingForm(false);
                  setBookingHostel(null);
                  setBookingFromPortal(false);

                  setTimeout(() => {
                    setBookingMessage("");
                  }, 5000);

                }}
              >
                ✅ Submit Booking
              </button>

            </div>

          </div>
        )}

      </div>

  
) : dashboardPage === "home" ? (


  <>
    <div className="dashboard-stats">

  <div className="stat-box">
    <h2>{favorites.length}</h2>
    <p>❤️ Favorites</p>
  </div>

  <div className="stat-box">
    <h2>{bookings.length}</h2>
    <p>📋 Bookings</p>
  </div>

  <div className="stat-box">
    <h2>{hostels.filter(h => h && h.available).length}</h2>
    <p>🏠 Available</p>
  </div>

</div>

 <div className="dashboard-cards"> 

    <div
      className="dashboard-card"
      onClick={() => setDashboardPage("favorites")}
    >
      <h2>❤️ Favorite Hostels</h2>
      <h3>{favorites.length}</h3>
      <p>Hostels saved for later.</p>
    </div>

    <div
  className="dashboard-card"
  onClick={() => setDashboardPage("bookings")}
>
    <div className="bookings-page">

  <h2>📋 My Bookings</h2>

  {bookings.length === 0 ? (
    <div className="empty-bookings">
      <h3>No bookings yet 🏠</h3>
      <p>
        You have not submitted any hostel booking requests.
      </p>
    </div>
  ) : (
    <div className="booking-list">

      {bookings.map((booking, index) => (
        <div className="booking-card" key={index}>

          <h3>{booking.name}</h3>

          <p>📍 Location: {booking.location}</p>

          <p>💰 Price: {booking.price}</p>

          <p>
📅 Booking Date: {booking.date}
</p>

<p>
📅 Move In Date: {booking.moveInDate}
</p>

<p>
Status:
<span className="pending">
 {booking.status}
</span>
</p>

        </div>
      ))}

    </div>
  )}

</div>
    </div>

    <div
      className="dashboard-card"
      onClick={() => alert("Student Profile coming soon!")}
    >
      <h2>👤 Student Profile</h2>
      <h3>{fullName || "Student"}</h3>
      <p>Manage your account information.</p>
    </div>

   </div>

<section className="student-hostels-preview">

  <h2>🏠 Browse Available Hostels</h2>

  <div className="student-hostel-grid">
{filteredHostels.filter(
  (hostel) =>
    hostel.available &&
    (hostel.status === "Approved" || !hostel.status)
).length === 0 ? (
  <div className="no-hostels-found">
    <h3>🔎 No hostels found</h3>

    <p>
      Try changing your search or adjusting your filters.
    </p>

    <button
      className="clear-search-btn"
      onClick={() => {
        setSearch("");
        setAvailabilityFilter("all");
        setVerifiedFilter("all");
        setSortOption("default");
        setMaxPrice("");
        setMaxDistance("");
      }}
    >
      🔄 Clear Search & Filters
    </button>
  </div>
) : (
  filteredHostels
    .filter(
      (hostel) =>
        hostel.available &&
        (hostel.status === "Approved" || !hostel.status)
    )
    .map((hostel) => (
      <div
        className="student-hostel-card"
        key={hostel.name}
      >

        <img
  src={
    hostel.image ||
    "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=800&q=80"
  }
  alt={hostel.name}
  className="hostel-image"
/>
        <h3>{hostel.name}</h3>

        {hostel.verified && (
          <p className="verified-badge">
            ✅ Verified Hostel
          </p>
        )}

        <p>📍 {hostel.distance}</p>

        <p>💰 {hostel.price}</p>

        <button
          className="view-hostel-btn"
          onClick={() => setSelectedHostel(hostel)}
        >
          👀 View Hostel
        </button>

      </div>
    ))
)}

  </div>

</section>
  </>

) : dashboardPage === "favorites" ? (

  <div>

    <h2>❤️ Favorite Hostels</h2>

    <button
      className="back-home-btn"
      onClick={() => setDashboardPage("home")}
    >
      ← Back to Dashboard
    </button>

    {favorites.length === 0 ? (
      <p>You haven't saved any hostels yet.</p>
   ) : (
      hostels
        .filter(
          (hostel) =>
            hostel &&
            favorites.includes(hostel.name) &&
            hostel.available &&
            (hostel.status === "Approved" || !hostel.status)
        )
        .map((hostel) => (
          <div className="dashboard-card" key={hostel.name}>

  <img
    src={hostel.image}
    alt={hostel.name}
    className="hostel-image"
  />

  <h3>🏠 {hostel.name}</h3>

  <p>{hostel.rating}</p>

  <p>
    📍 {hostel.distance}
  </p>

  <p>
    💰 {hostel.price}
  </p>

  <button
    className="details-btn"
  onClick={() => setPortalHostelDetails(hostel)}
  >
    👁 View Details
  </button>
  <button
  className="remove-favorite-btn"
  onClick={() =>
    setFavorites(
      favorites.filter((name) => name !== hostel.name)
    )
  }
>
  💔 Remove
</button>

</div>
        ))
    )}

  </div>

) : dashboardPage === "bookings" ? (

  <div>
<h2>📋 My Bookings</h2>

    <button
      className="back-home-btn"
      onClick={() => setDashboardPage("home")}
    >
      ← Back to Dashboard
    </button>

    {bookings.length === 0 ? (

      <p>You have not made any bookings yet.</p>

    ) : (

      bookings.map((booking, index) => (

        <div className="dashboard-card" key={index}>

          <h3>🏠 {booking.name}</h3>

          <p>👤 {booking.fullName}</p>

          <p>📞 {booking.phoneNumber}</p>

          <p>📅 Move-in Date: {booking.moveInDate}</p>

        </div>

      ))

    )}

  </div>

) : null}

  </section>
) : (
  <>
  

      {/* NAVBAR */}
    <nav className="navbar">
 <div className="brand">
  <h2>🏠 CampusNest</h2>
  <p>Where Campus Life Finds a Home</p>
</div>

  <div className="navbar-links">

    {isLoggedIn && (
      <p className="welcome-student">
        👋 Welcome, Student!
      </p>
    )}

    <button
      className="student-portal-btn"
      onClick={() => setShowStudentDashboard(true)}
    >
      🎓 Student Portal
    </button>

   <button
  className="landlord-portal-btn"
  onClick={() => setShowLandlordDashboard(true)}
>
  🏠 Landlord Portal
</button>
<button
  className="admin-portal-btn"
  onClick={() => setShowAdminDashboard(true)}
>
  🛡️ Admin Portal
</button>

    {isLoggedIn ? (
      <button
        className="logout-btn"
        onClick={() => {
          setIsLoggedIn(false);
          localStorage.removeItem("isLoggedIn");
        }}
      >
        🚪 Logout
      </button>
    ) : (
      <button
        className="login-btn"
        onClick={() => setShowLogin(true)}
      >
        🔐 Login
      </button>
    )}

  </div>
</nav>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal">

            <div className="modal-header">
              <h2>🔐 Login to CampusNest</h2>

              <button
                className="close-icon"
                onClick={() => setShowLogin(false)}
              >
                ✕
              </button>
            </div>

            <input
              type="email"
              placeholder="📧 Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="🔑 Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
              🔐 Login
            </button>

          </div>
        </div>
      )}

      {/* HERO */}
      <section
  className="hero"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${heroImages[currentHeroImage]})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    transition: "background-image 1s ease-in-out",
  }}
>
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
      <section className="hostel-filters">

  <div className="filter-header">
    <div>
      <h2>🔎 Find Your Perfect Hostel</h2>
      <p>Filter and sort hostels to find what suits you.</p>
    </div>

    <button
      className="reset-filters-btn"
      onClick={() => {
        setSearch("");
        setAvailabilityFilter("all");
        setVerifiedFilter("all");
        setSortOption("default");
        setMaxPrice("");
        setMaxDistance("");
      }}
    >
      🔄 Reset Filters
    </button>
  </div>

  <div className="filter-grid">

    <div className="filter-group">
      <label>Availability</label>

      <select
        value={availabilityFilter}
        onChange={(e) => setAvailabilityFilter(e.target.value)}
      >
        <option value="all">All Hostels</option>
        <option value="available">🟢 Available</option>
        <option value="occupied">🔴 Fully Occupied</option>
      </select>
    </div>

    <div className="filter-group">
      <label>Verification</label>

      <select
        value={verifiedFilter}
        onChange={(e) => setVerifiedFilter(e.target.value)}
      >
        <option value="all">All Hostels</option>
        <option value="verified">✅ Verified Only</option>
        <option value="unverified">Unverified</option>
      </select>
    </div>

    <div className="filter-group">
      <label>Maximum Price</label>

      <input
        type="number"
        placeholder="e.g. 6000"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>

    <div className="filter-group">
      <label>Maximum Distance</label>

      <input
        type="number"
        placeholder="e.g. 500"
        value={maxDistance}
        onChange={(e) => setMaxDistance(e.target.value)}
      />

      <small>Distance in metres</small>
    </div>

    <div className="filter-group">
      <label>Sort By</label>

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="default">Default Order</option>
        <option value="price-low">💰 Price: Low to High</option>
        <option value="price-high">💰 Price: High to Low</option>
        <option value="distance-near">📍 Nearest First</option>
        <option value="rating-high">⭐ Highest Rated</option>
      </select>
    </div>

  </div>

  <div className="filter-results">
    <strong>
      {filteredHostels.length}
    </strong>{" "}
    hostel{filteredHostels.length !== 1 ? "s" : ""} found
  </div>

</section>
{/*
FEATURED HOSTELS
<section className="featured">
        <h2>⭐ Featured Hostels</h2>

        <div className="cards">
          {hostels
            .filter((hostel) =>
              hostel.name
                .toLowerCase()
                .includes(search.toLowerCase())
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

                <p className={hostel.available ? "available-status" : "occupied-status"}>
  {hostel.available
    ? "🟢 Available"
    : "🔴 Fully Occupied"}
</p>

<p className="hostel-distance">
  📍 {hostel.distance}
</p>

<p className="hostel-price">
  💰 {hostel.price}
</p>

                <div className="card-buttons">

                  <button
                    onClick={() => setSelectedHostel(hostel)}
                  >
                    View Details
                  </button>

                  <button
                    className="favorite-btn"
                    onClick={() =>
                      toggleFavorite(hostel.name)
                    }
                  >
                    {favorites.includes(hostel.name)
                      ? "❤️ Saved"
                      : "🤍 Favorite"}
                  </button>

                </div>

              </div>
            ))}
        </div>
      </section>
      */}
     

  

    


  {/* WHY CHOOSE CAMPUSNEST */}
  <section className="featured-hostels fade-up">

  <div className="section-heading">

    <span className="section-tag">
      Featured Hostels
    </span>

    <h2>🏠 Find Your Perfect Hostel</h2>

    <p>
      Explore some of our most popular and verified hostels trusted by students.
    </p>

  </div>

<div
  className="featured-hostel-row"
  ref={featuredHostelsRef}
>

  <button
    className="scroll-btn left"
    onClick={scrollLeft}
  >
    ❮
  </button>

  
{filteredHostels
  .filter(
    (hostel) =>
      hostel.available &&
      (hostel.status === "Approved" || !hostel.status)
  )
  .map((hostel) => (
      <div
        className="student-hostel-card"
        key={hostel.name}
      >

       <img
  src={
    hostel.image ||
    "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=800&q=80"
  }
  alt={hostel.name}
  className="hostel-image"
/>

        <h3>{hostel.name}</h3>

        {hostel.verified && (
          <p className="verified-badge">
            ✅ Verified Hostel
          </p>
        )}

        <p>📍 {hostel.distance}</p>

        <p>💰 {hostel.price}</p>

        <button
          className="view-hostel-btn"
          onClick={() => setSelectedHostel(hostel)}
        >
          👀 View Hostel
        </button>

      </div>

    ))}

  <button
    className="scroll-btn right"
    onClick={scrollRight}
  >
    ❯
  </button>

</div>
</section>
<section className="why-campusnest fade-up">

  <div className="section-heading">

    <span className="section-tag">
      Trusted Student Housing
    </span>

    <h2>🏠 Why Choose CampusNest?</h2>

    <p>
      CampusNest helps students discover trusted hostels while giving
      landlords a professional platform to showcase their properties.
      Safe, fast and designed for campus living.
    </p>

  </div>

  <div className="why-grid">

   <div className="why-card">

  <div className="why-icon">
    🏠
  </div>

  <h3>Verified Hostels</h3>

  <p>
    Browse trusted hostels listed directly by landlords near your
    campus for a safe accommodation experience.
  </p>

  <button className="why-btn">
    Learn More →
  </button>

</div>

    <div className="why-card">

  <div className="why-icon">
    🔒
  </div>

  <h3>Safe & Secure</h3>

  <p>
    Your bookings and personal information remain private,
    encrypted and protected at all times.
  </p>

  <button className="why-btn">
    Learn More →
  </button>

</div>

   <div className="why-card">

  <div className="why-icon">
    📍
  </div>

  <h3>Easy Location</h3>

  <p>
    Instantly locate hostels using Google Maps and choose the one
    that best suits your daily commute.
  </p>

  <button className="why-btn">
    Learn More →
  </button>

</div>

  <div className="why-card">

  <div className="why-icon">
    ⚡
  </div>

  <h3>Fast Booking</h3>

  <p>
    Reserve your preferred hostel within minutes without lengthy
    paperwork or complicated procedures.
  </p>

  <button className="why-btn">
    Learn More →
  </button>

</div>

  </div>

</section>


<section className="campus-updates">

  <h2>📢 Latest Campus Updates</h2>

  <div className="updates-grid">

    <div className="update-card">
      <h3>🏠 New Hostels Added</h3>
      <p>
        More verified hostels are joining CampusNest every month, giving
        students more accommodation choices near campus.
      </p>
    </div>

    <div className="update-card">
      <h3>🎓 Student Tips</h3>
      <p>
        Always compare prices, check hostel facilities, and view the location
        before making your booking decision.
      </p>
    </div>

    <div className="update-card">
      <h3>🚀 Platform Updates</h3>
      <p>
        Landlords can now upload hostel images, while students enjoy a faster
        and more secure booking experience.
      </p>
    </div>

  </div>


</section>
<section className="campus-stats fade-up">

  <h2>📊 CampusNest in Numbers</h2>

  <div className="stats-grid">

    <div className="stat-card">
     <h3>{verifiedCount}+</h3>
      <p>🏠 Verified Hostels</p>
    </div>

    <div className="stat-card">
   <h3>{studentCount}+</h3> 
      <p>🎓 Registered Students</p>
    </div>

    <div className="stat-card">
      <h3>{bookingCount}+</h3>
      <p>📋 Successful Bookings</p>
    </div>

    <div className="stat-card">
    <h3>{landlordCount}+</h3>
      <p>🤝 Trusted Landlords</p>
    </div>

  </div>

</section>
      {/* HOSTEL DETAILS MODAL */}
      {selectedHostel && (
        <div className="modal-overlay">
         <div className="modal details-modal">

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
              onClick={() => {
               if (!isLoggedIn) {
  alert("CAMPUSNEST THINKS I AM NOT LOGGED IN");
  setShowLogin(true);
  return;
}

                setBookingHostel(selectedHostel);
                setShowBookingForm(true);
                setSelectedHostel(null);
              }}
            >
              {isLoggedIn
                ? "📅 Book Now"
                : "🔐 Login to Book"}
            </button>

            <button
              onClick={() =>
                window.open(
                  selectedHostel.map,
                  "_blank"
                )
              }
            >
              📍 Open in Google Maps
            </button>

            <button
              onClick={() => setSelectedHostel(null)}
            >
              Close
            </button>

          </div>
        </div>
      )}
      {/* STUDENT DASHBOARD */}
{showDashboard && (
  <div className="modal-overlay">
    <div className="modal dashboard-modal">

      <div className="modal-header">
        <h2>📊 Student Dashboard</h2>

        <button
          className="close-icon"
          onClick={() => setShowDashboard(false)}
        >
          ✕
        </button>
      </div>

      <div className="dashboard-welcome">
        <h3>👋 Welcome to CampusNest!</h3>
        <p>Manage your saved hostels and bookings in one place.</p>
      </div>

      <div className="dashboard-stats">

        <div className="dashboard-card">
          <h3>❤️</h3>
          <p>Saved Hostels</p>
          <strong>{favorites.length}</strong>
        </div>

        <div className="dashboard-card">
          <h3>📋</h3>
          <p>Bookings</p>
          <strong>{bookings.length}</strong>
        </div>
        <div className="booking-history">
  <h3>📋 My Booking History</h3>

  {bookings.length === 0 ? (
    <p>No bookings yet.</p>
  ) : (
    bookings.map((booking, index) => (
      <div className="booking-history-card" key={index}>
        <h4>🏠 {booking.hostel}</h4>
        <p>👤 {booking.fullName}</p>
        <p>📱 {booking.phoneNumber}</p>
        <p>📅 Move-in Date: {booking.moveInDate}</p>
        <p className="booking-status">
          🟡 Booking Submitted
        </p>
      </div>
    ))
  )}
</div>

      </div>

      <button
        onClick={() => setShowDashboard(false)}
      >
        Close Dashboard
      </button>

    </div>
  </div>
)}
{showBookingForm && (
  <div
    style={{
      position: "fixed",
      top: "20px",
      left: "20px",
      zIndex: 999999,
      background: "red",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      fontSize: "18px",
    }}
  >
    🔥 BOOKING FORM STATE = TRUE
    <br />
    Hostel: {bookingHostel?.name || "NONE"}
  </div>
)}
      {/* BOOKING MODAL */}
      {showBookingForm && bookingHostel && (
       <div className="modal-overlay">
        <div
className="modal booking-modal">

            <div className="modal-header">
              <h2>
                📋 Book {bookingHostel.name}
              </h2>

              <button
                className="close-icon"
                onClick={() => {
  setShowBookingForm(false);
  setBookingHostel(null);
  setBookingFromPortal(false);
}}
              >
                ✕
              </button>
            </div>

            <p>📍 {bookingHostel.distance}</p>
            <p>💰 {bookingHostel.price}</p>

            <div className="booking-details">

              <input
                type="text"
                placeholder="👤 Full Name"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />

              <input
                type="tel"
                placeholder="📱 Phone Number"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
              />

              <input
                type="date"
                value={moveInDate}
                onChange={(e) =>
                  setMoveInDate(e.target.value)
                }
              />

            </div>

            <button
              onClick={() => {
                if (
                  fullName.trim() === "" ||
                  phoneNumber.trim() === "" ||
                  moveInDate === ""
                ) {
                  alert(
                    "Please fill in all booking details."
                  );
                  return;
                }

               setBookingMessage(
  `✅ Booking request for ${bookingHostel.name} submitted successfully!`
);
setBookings([
  ...bookings,
  {
    name: bookingHostel.name,
    location: bookingHostel.distance,
    price: bookingHostel.price,
    phoneNumber: phoneNumber,
fullName: fullName,
moveInDate: moveInDate,
    status: "Pending Approval",
    date: new Date().toLocaleDateString(),
  },
]);
setTimeout(() => {
  setBookingMessage("");
}, 5000);

// Clear the booking form
setFullName("");
setPhoneNumber("");
setMoveInDate("");

setShowBookingForm(false);
setBookingHostel(null);
setBookingFromPortal(false);
              }}
            >
              ✅ Submit Booking
            </button>

          </div>
        </div>
      )}

      {/* BOOKING MESSAGE */}
      {bookingMessage && (
  <div className="booking-success">
    {bookingMessage}
  </div>
)}
</>
)}


  
    </div>
  );
}

export default App;