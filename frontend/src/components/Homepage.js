import React, { Component } from "react";
import { Fragment } from "react";
import "./Homepage.css";
import store from "../store";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { getAllArticles } from "../actions/articleActions";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    setTimeout(async () => {
      this.setState((state, props) => {
        return {
          loading: false
        };
      });
    }, 1000);
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
                  <button type="button" class="btn btn-outline-light" onClick={(e) => { e.target.classList.add("active")}}><i
                            className="bi bi-house"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <h1>غرب</h1>
                          </button>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center">
<button type="button" class="btn btn-outline-light"><i
                            className="bi bi-house"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <h1>وسط</h1>
                          </button>
                </div>
                <div className="col-12 col-md-4 d-flex justify-content-center">
<button type="button" class="btn btn-outline-light"><i
                            className="bi bi-house"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <h1>شرق</h1>
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
                  
                  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="..." alt="First slide" />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Second slide" />
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="..." alt="Third slide" />
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
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
