import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './components/About/about';
import Testimonial from './components/Testimonials/Testimonial'
import Adminlogin from './components/admin/admin';
import Services from './components/Services/service';
import NavBar from './components/Navbar/nav';
import HotelBookingPage from './components/Bookingpage';
import Header from './components/Header/header';
import Room from './components/Rooms/room';





const App = () => {
  return (
    <div>
       <BrowserRouter>
       <NavBar/>
       <Routes>
         <Route path='/' Component={Header} />
         <Route path='about' Component={About} />
         <Route path='rooms' Component={Room} />
         <Route path='testimonial' Component={Testimonial} />
         <Route path='services' Component={Services} />
         <Route path='booking' Component={HotelBookingPage}/>
         <Route path='login' Component={Adminlogin} />
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App