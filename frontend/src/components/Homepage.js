import React, { Component } from "react";
import { Fragment } from "react";
import "./Homepage.css";
import store from "../store";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { getAllArticles } from "../actions/articleActions";
import $ from 'jquery';
import { createPin } from "../actions/pinActions";
import { deletePin } from "../actions/pinActions";
import { toast } from "material-react-toastify";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinDeleted: false,
      pinCreated: false,
      loading: true,
      extensions: [],
      selectedSite: '',
      selectedSiteFloor: [],
      userPins: []
    };
    this.onAddPinHandler = this.onAddPinHandler.bind(this);
    this.onRemovePinHandler = this.onRemovePinHandler.bind(this);
    this.checkPin = this.checkPin.bind(this);
  }
  componentDidMount() {
    setTimeout(async () => {
      this.setState((state, props) => {
        return {
          loading: false,
          extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbdf4c5b33217c021870e" && ext.floor === "68cbc5f0f812ad4960f48d6f"),
        selectedSite: "68cbbdf4c5b33217c021870e",
        selectedSiteFloor: store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdf4c5b33217c021870e"),
        userPins: store
        .getState()
        .pin.pins.filter(pin => store.getState().auth.user && pin.user === store.getState().auth.user._id)
        };
      });
      console.log(this.state.userPins)
      document.getElementById('capitalBtn').classList.toggle("active")
    }, 3000);
  }
  async onChangeHandler(e, site) {
    e.preventDefault();
    if(site === "gharb"){
      document.getElementById('capitalBtn').classList.remove("active")
      document.getElementById('sharkBtn').classList.remove("active")
      document.getElementById('gharbBtn').classList.add("active")
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbdffc5b33217c0218711"),
        selectedSite: "68cbbdffc5b33217c0218711",
        selectedSiteFloor: store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdffc5b33217c0218711")
      })
    }else if (site === "capital"){
      document.getElementById('gharbBtn').classList.remove("active")
      document.getElementById('sharkBtn').classList.remove("active")
      document.getElementById('capitalBtn').classList.add("active")
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbdf4c5b33217c021870e"),
        selectedSite: "68cbbdf4c5b33217c021870e",
        selectedSiteFloor: store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdf4c5b33217c021870e")

      })
    }else if (site === "shark"){
      document.getElementById('gharbBtn').classList.remove("active")
      document.getElementById('capitalBtn').classList.remove("active")
      document.getElementById('sharkBtn').classList.add("active")
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbe05c5b33217c0218714"),
        selectedSite: "68cbbe05c5b33217c0218714",
        selectedSiteFloor: store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbe05c5b33217c0218714")
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
  async onAddPinHandler(e, ext) {
    e.preventDefault();
    const formData = new FormData();
    // document.getElementById("loader").style.display = "block";
    formData.set("user", store.getState().auth.user._id);
    formData.set("extension", ext);
    store
        .dispatch(createPin(formData))
        .then((data) => {
        if (data.success === true) {
            // document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
            return { pinCreated: true };
            });
        } else {
            // document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
  }
    async onRemovePinHandler(e, pin) {
    e.preventDefault();
    store
        .dispatch(deletePin(pin))
        .then((data) => {
        if (data.success === true) {
            // document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
            return { pinDeleted: true };
            });
        } else {
            // document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
  }
  checkPin(pin, ext) {
    return pin.user === store.getState().auth.user._id && pin.extension === ext._id
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
            <div className="container-fluid" style={{backgroundColor: '#3357A0'}}>
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
                  <ul class="nav nav-tabs" id="myTab" role="tablist"  dir="rtl">
                    <li class="nav-item" role="presentation">
    <button class="nav-link" id="pin-tab" data-bs-toggle="tab" data-bs-target="#pin" type="button" role="tab" aria-controls="pin" aria-selected="true" onClick={(e) => {
      this.setState({
        extensions: this.state.userPins.map((pin) => {
          return store
        .getState()
        .extension.extensions.filter(ext => ext._id === pin.extension)[0]
        })
      })
    }}><i class="bi bi-pin-angle-fill"></i></button>
                        </li>
                    {this.state.selectedSiteFloor.map((floor,index) => {
                      if(index === 0){
                      return <li class="nav-item" role="presentation">
    <button class="nav-link active" id={floor.nameEnglish + "-tab"} data-bs-toggle="tab" data-bs-target={`#${floor.nameEnglish}`} type="button" role="tab" aria-controls={`${floor.nameEnglish}`} aria-selected="true" onClick={(e) => {
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.floor === floor._id)
      })
    }}>{`${floor.nameArabic}`}</button>
                        </li>
                      }else {
                      return <li class="nav-item" role="presentation">
    <button class="nav-link" id={floor.nameEnglish + "-tab"} data-bs-toggle="tab" data-bs-target={`#${floor.nameEnglish}`} type="button" role="tab" aria-controls={`${floor.nameEnglish}`} aria-selected="true" onClick={(e) => {
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.floor === floor._id)
      })
    }}>{`${floor.nameArabic}`}</button>
                        </li>
                      }
                    })}
</ul>
<div class="tab-content" id="myTabContent" dir="rtl">
  {this.state.selectedSiteFloor.map((floor,index) => {
    if(index === 0){
      return <div class="tab-pane fade show active row d-flex justify-content-start" id={`${floor.nameEnglish}`} role="tabpanel" aria-labelledby={floor.nameEnglish + "-tab"}>
        {this.state.extensions.map((ext, index) => {
          return <div class="card col-12 col-md-3" style={{margin: '20px'}}>
  <div class="card-body">
    <i id={`pin_${ext.extension}`} className={`bi ${store.getState().auth.user && this.state.userPins.find((pin) => this.checkPin(pin, ext)) ? 'bi-pin-angle-fill' : 'bi-pin-angle'}`} style={{fontSize: '28px'}} onClick={(e) => {
      if(document.getElementById(`pin_${ext.extension}`).classList[1] === "bi-pin-angle"){
        document.getElementById(`pin_${ext.extension}`).classList.remove("bi-pin-angle")
        document.getElementById(`pin_${ext.extension}`).classList.add("bi-pin-angle-fill")

        this.onAddPinHandler(e, ext._id);
      }else {
        document.getElementById(`pin_${ext.extension}`).classList.remove("bi-pin-angle-fill")
        document.getElementById(`pin_${ext.extension}`).classList.add("bi-pin-angle")
        let pin = this.state.userPins.find((pin) => this.checkPin(pin, ext))
        if(pin){
          console.log(this.state.userPins.find((pin) => this.checkPin(pin, ext)))
          this.onRemovePinHandler(e, pin._id);
        }
      }
    }}></i>
    <hr></hr>
    <h5 class="card-title badge bg-primary text-center mx-auto d-block" style={{fontSize: '56px'}}>{ext.extension}</h5>
    <h6 class="card-subtitle mb-2 text-muted  text-center mx-auto d-block">{ext.name}</h6>
  </div>
</div>
        })}
        
      </div>
  }              
  })}
</div>
              </dir>
              </dir>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Homepage;
