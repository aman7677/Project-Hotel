import React, { useState } from "react";
import "./Bookingpage.css";

const HotelBookingPage = () => {
  const [formData, setFormData] = useState({
    checkin: "",
    checkout: "",
    guests: 1,
    roomType: "single",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    alert("Booking Successful!");
  };

  return (
    <div>
        <main className="bg">
        <section id="booking">
          <h2>Book Your Stay</h2>
          <form id="booking-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname" placeholder="Full name"
              onChange={handleChange}
            />
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              id="Email"
              name="Email" placeholder="Email"
              onChange={handleChange}
            />
            <label htmlFor="Contact">Contact</label>
            <input
              type="text"
              id="Contact"
              name="Contact" placeholder="Contact"
              onChange={handleChange}
            />
            <label htmlFor="checkin">Check-in Date</label>
            <input
              type="date"
              id="checkin"
              name="checkin"
              value={formData.checkin}
              onChange={handleChange}
              required
            />

            <label htmlFor="checkout">Check-out Date</label>
            <input
              type="date"
              id="checkout"
              name="checkout"
              value={formData.checkout}
              onChange={handleChange}
              required
            />

            <label htmlFor="guests">Guests</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              required
            />

            <label htmlFor="Identity Proof">Identity Proof</label>
            <select
              id="identity"
              name="identity"
              value={formData.identity}
              onChange={handleChange}
            >
              <option value="Select your ID">Select Your ID</option>
              <option value="Aadhar">Aadhar No.</option>
              <option value="Driving">Driving Licence</option>
              <option value="Pan">Pan Card</option>
              <option value="Passport">Passport No.</option>
            </select><br></br><br></br>
            <input type="text" placeholder="Enter your Identity Proof"></input><br></br><br></br>

            <button type="submit"><b>Book Now</b></button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default HotelBookingPage;
