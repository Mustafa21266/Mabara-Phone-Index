import React, { Component } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import mabaraLogo from '../assets/images/mabara-logo.png';
class Footer extends Component {
    render(){
        return(
            <Fragment>
                <footer className="bg-dark text-center text-white footer w-100" style={{backgroundColor: "#ECEFF5"}}>
  <div className="container-fluid p-4 pb-0"   style={{backgroundColor: "#ECEFF5",color: 'black'}}>
    {/* <div className="text-center p-3"  style={{backgroundColor: "#ECEFF5",color: 'black'}}>
      Social Media Links
     </div> */}
     <div className='row'>
<div className='col-6 col-md-6 d-flex justify-content-end'>
<img src={mabaraLogo} style={{width: "120px", height: "90px"}}></img>
     </div>
     <div className='col-6 col-md-6'>
<h5 style={{textAlign: 'left'}}>Developed By : Mustafa Elgohary</h5>
<h6 style={{textAlign: 'left'}}>IT Support @ Capital</h6>
<h6 style={{textAlign: 'left'}}>Phone : 01553786175</h6>
     </div>
     </div>
    <section className="">
      {/* <a className="btn btn-outline-dark btn-floating m-1" href="https://www.facebook.com/DrSalahElgoharyOfficial" target="_blank" role="button"><i className="fab fa-facebook-f"></i></a> */}
      {/* <a className="btn btn-outline-dark btn-floating m-1" href="https://wa.me/+2001002229745?text=السلام عليكم%20" target="_blank" role="button"><i className="fab fa-whatsapp"></i></a> */}
      
      {/* <a className="btn btn-outline-light btn-floating m-1" href="https://twitter.com/MustafaSalah79" role="button"><i className="fab fa-twitter"></i></a>

      <a className="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/channel/UCIn4wNClF9gpRNF5BW9CceA" role="button"><i className="fab fa-youtube"></i></a>

      <a className="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/mustafa22101970/" role="button"><i className="fab fa-instagram"></i></a>

      <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/mustafa-elgohary-9b6081180/" role="button"><i className="fab fa-linkedin-in"></i></a>

      <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Mustafa21266" role="button"><i className="fab fa-github"></i></a> */}
    </section>
  </div>
  {/* <div className="text-center p-3" style={{backgroundColor: "#ECEFF5",color: 'black'}}>
    Developed By Mustafa Elgohary
    <Link className="text-black" style={{textDecoration: 'none',marginLeft: '5px'}} to="/"> - IT Support @ Capital</Link>
  </div> */}
</footer>
            </Fragment>
        )
    }
}

export default Footer;