import React, { Component } from 'react';
import { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import store from '../store';
import { logoutAdmin } from '../actions/adminActions';
import {getUserDetails } from '../actions/adminActions';
import mabaraLogo from '../assets/images/mabara-logo.png';
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      redirect: false
    }
    
  }
  componentDidMount(){
    let id = setInterval(()=>{
      this.setState({ user: store.getState().auth.user })
      // this.forceUpdate()
    },1000)
  }
  checkUser(){
      let user = store.getState().auth.user
  }
  async logOutHandler(){
    await logoutAdmin(store.dispatch)
    this.setState({redirect : true})
    window.location.reload();
  }
  changeNav(e){
    Array.from(document.getElementsByClassName("nav-link")).forEach(link => link.style.fontWeight = 400)
    e.target.style.fontWeight = 900
  }
  resetNav(e){
    Array.from(document.getElementsByClassName("nav-link")).forEach(link => link.style.fontWeight = 400)
  }
    render(){
        return(
            <Fragment>
              {this.state.redirect ? <Redirect to="/"></Redirect>: ""}
<nav dir="rtl" className="navbar navbar-expand-lg w-100 nav-style animate__animated animate__slideInDown animate__slower" style={{position: 'fixed',top: 0,zIndex: 5,backgroundColor: '#ECEFF5',height: '90px'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" onClick={this.resetNav} to="/"><img src={mabaraLogo} style={{width: "120px", height: "90px"}}></img></Link>
    <button style={{color:"white"}} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active ibm-plex-sans-arabic-bold" onClick={this.changeNav} aria-current="page" to="/" style={{color: 'black',textAlign: 'center',fontWeight: 900}}>الرئيسية</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link ibm-plex-sans-arabic-bold" to="/articles/all"  onClick={this.changeNav} style={{color: 'black',textAlign: 'center'}}>مقالات</Link>
        </li> */}
      </ul>
        <div className="btn-group me-auto" style={{float: 'left'}}>
  <a type="button" style={{padding: '20px',color: 'white'}}  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  {'_id' in store.getState().auth.user ? (
    <Fragment>
      {store.getState().auth.user.avatar ? (
        <Fragment>
          <img src={store.getState().auth.user.avatar.url} alt="user avatar" style={{width: '40px',height: '40px',borderRadius: '50%'}}/>
        </Fragment>
      ): (
        <Fragment>
        <i className="fas fa-user-circle" style={{fontSize: '28px',color: '#e60006'}}></i>
    </Fragment>
      )}
      
    </Fragment>
    
  ):(
    <Fragment>
        <i className="fas fa-user-circle" style={{fontSize: '26px',color: '#e60006'}}></i>
    </Fragment>
    
  )}
  </a>
 <div className="dropdown-menu" style={{position: 'absolute',right: '-120px',top: '40px'}} aria-labelledby="navbarDropdown">
   {'_id' in store.getState().auth.user ? (
     <Fragment>
       {store.getState().auth.user.role === 'admin' && (
         <Fragment>
          <Link className="dropdown-item text-center ibm-plex-sans-arabic-semibold" to="/admin/extension/create">إضافة إمتداد جديد</Link>
          <div className="dropdown-divider"></div>
            <Link className="dropdown-item text-center ibm-plex-sans-arabic-semibold" to="/admin/floor/create">إضافة طابق جديد</Link>
          <div className="dropdown-divider"></div>
<Link className="dropdown-item text-center ibm-plex-sans-arabic-semibold" to="/admin/dashboard">لوحه التحكم</Link>
<div className="dropdown-divider"></div>
{/* <Link className="dropdown-item text-center ibm-plex-sans-arabic-semibold" to="/admin/article/create">إنشاء مقاله جديده</Link> */}
{/* <div className="dropdown-divider"></div> */}
         </Fragment>
       )}
<Link className="dropdown-item text-center ibm-plex-sans-arabic-semibold" to="/me">حسابي الشخصي</Link>
       <div className="dropdown-divider"></div>
       <button className="dropdown-item text-danger text-center ibm-plex-sans-arabic-semibold" onClick={this.logOutHandler.bind(this)}>تسجيل الخروج</button>
</Fragment>
   ) : (
     <Fragment>
       <Link className="dropdown-item text-center ibm-plex-sans-arabic-semibold" to="/login">تسجيل الدخول</Link>
              <div className="dropdown-divider"></div>
             <Link className="dropdown-item text-center ibm-plex-sans-arabic-semibold" to="/register">إنشاء حساب</Link>
     </Fragment>

   )}
          
        </div>
</div>
    </div>
  </div>
</nav>
            </Fragment>
        )
    }
}



export default Navbar;
