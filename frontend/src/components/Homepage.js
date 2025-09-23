import React, { Component } from "react";
import { Fragment } from "react";
import "./Homepage.css";
import store from "../store";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { getAllArticles } from "../actions/articleActions";
import $ from 'jquery';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      extensions: []
    };
  }
  componentDidMount() {
    setTimeout(async () => {
      this.setState((state, props) => {
        return {
          loading: false,
          extensions: store
        .getState()
        .extension.extensions
        };
      });
    }, 1000);
  }
  async onChangeHandler(e, site) {
    e.preventDefault();
    if(site === "gharb"){
      document.getElementById('gharbBtn').classList.toggle("active")
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbdffc5b33217c0218711")
      })
    }else if (site === "capital"){
      document.getElementById('capitalBtn').classList.toggle("active")
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbdf4c5b33217c021870e")
      })
    }else if (site === "shark"){
      document.getElementById('sharkBtn').classList.toggle("active")
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbe05c5b33217c0218714")
      })
    }else {
      this.setState({
        extensions: store
        .getState()
        .extension.extensions
      })
    }
    console.log(this.state.extensions)

    // const formData = new FormData();
    // document.getElementById("loader").style.display = "block";
    // formData.set("name", e.target.name.value);
    // formData.set("location", e.target.location.value);
    // store
    //     .dispatch(editSite(this.props.match.params.id, formData))
    //     .then((data) => {
    //     if (data.success === true) {
    //         document.getElementById("loader").style.display = "none";
    //         toast.success(data.message);
    //         this.setState((state, props) => {
    //         return { siteEditied: true };
    //         });
    //     } else {
    //         document.getElementById("loader").style.display = "none";
    //         toast.error(data.message);
    //     }
    //     });
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`Mabara Alasafra Support Portal`}
          description="Mabara Alasafra Support Portal"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
            <div className="container-fluid" style={{backgroundColor: '#3357A0',height: '1500px'}}>
              <div className="row">
                <div className="col-12 col-md-4 d-flex justify-content-center">
                  <button id="gharbBtn" type="button" class="btn btn-outline-light">
                    <div style={{width: '100%',height:'100%'}}  onClick={(e) => { 
                      this.onChangeHandler(e, "gharb");
                      // console.log(e.target.)
                      }}>
                          <i
                            className="bi bi-house"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <h1>غرب</h1>
                    </div>
                          </button>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center">
<button id="capitalBtn" type="button" class="btn btn-outline-light">                    
  <div style={{width: '100%',height:'100%'}}  onClick={(e) => { 
                      this.onChangeHandler(e, "capital");
                      // console.log(e.target.)
                      }}>
                          <i
                            className="bi bi-house"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <h1>وسط</h1>
                    </div>
                          </button>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center">
<button id="sharkBtn" type="button" class="btn btn-outline-light">                    
  <div style={{width: '100%',height:'100%'}}  onClick={(e) => { 
                      this.onChangeHandler(e, "shark");
                      // console.log(e.target.)
                      }}>
                          <i
                            className="bi bi-house"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <h1>شرق</h1>
                    </div>
                          </button>
                </div>
              </div>
              <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <hr></hr>
              <dir className="row">
                <dir className="col-12">
                  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="card" style={{width: '200px'}}>
    <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/" className="d-block w-100" alt="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/" />
    <div className="card-body">
        <h5 className="card-title">Card title 2</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
            card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
</div>
    </div>
    <div className="carousel-item">
      <div className="card" style={{width: '200px'}}>
    <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/" className="d-block w-100" alt="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/" />
    <div className="card-body">
        <h5 className="card-title">Card title 2</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
            card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
</div>
    </div>
    <div className="carousel-item">
      <div className="card" style={{width: '200px'}}>
    <img src="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/" className="d-block w-100" alt="https://ucarecdn.com/05f649bf-b70b-4cf8-90f7-2588ce404a08/" />
    <div className="card-body">
        <h5 className="card-title">Card title 2</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
            card's content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
    </div>
</div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
                  {/* <div id="carouselExampleControls" class="carousel slide carousel-fade" data-ride="carousel">
  <div class="carousel-inner">
    {this.state.extensions.map((ext, index) => {
      console.log(ext , index)
      if(index == 0){
        return <Fragment>
          <div class="carousel-item active">
<div class="card">
  <div class="card-body">
    <h5 class="card-title badge bg-primary text-dark text-center mx-auto" style={{fontSize: '56px', display: "block"}}>{ext.extension}</h5>
<hr></hr>
    <h6 class="card-subtitle mb-2 text-muted text-center mx-auto" style={{fontSize: '42px'}}>{ext.name}</h6>
  </div>
</div>         
          </div>
          </ Fragment> 
      }else {
                return <Fragment>
          <div class="carousel-item">
<div class="card">
  <div class="card-body">
<h5 class="card-title badge bg-primary text-dark text-center mx-auto"  style={{fontSize: '56px', display: "block"}}>{ext.extension}</h5>
<hr></hr>
    <h6 class="card-subtitle mb-2 text-muted text-center mx-auto" style={{fontSize: '42px'}}>{ext.name}</h6>
  </div>
</div>           
          </div>
          </ Fragment>
      }
return 
    })}
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div> */}
              </dir>
              </dir>
              <h1>Test</h1>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Homepage;
