import React, { Component } from "react";
import { Fragment } from "react";
import "./GharbHomepage.css";
import store from "../store";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { getAllArticles } from "../actions/articleActions";
import $ from 'jquery';
import { createPin } from "../actions/pinActions";
import { deletePin } from "../actions/pinActions";
import { toast } from "material-react-toastify";


class GharbHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinDeleted: false,
      pinCreated: false,
      loading: true,
      extensions: [],
      timetables: [],
      selectedSite: '',
      selectedSiteFloor: [],
      selectedSiteDepartment: [],
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
        .extension.extensions.filter(ext => ext.site === "68cbbdffc5b33217c0218711" && ext.floor === "68dd1909f56cc748a88c4bc7"),
        selectedSite: "68cbbdffc5b33217c0218711",
        selectedSiteFloor: store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdffc5b33217c0218711"),
        selectedSiteDepartment: store
        .getState()
        .department.departments.filter(department => department.site === "68cbbdffc5b33217c0218711"),
        userPins: store
        .getState()
        .pin.pins.filter(pin => store.getState().auth.user && pin.user === store.getState().auth.user._id),
        timetables: store
        .getState()
        .timetable.timetables.filter(timetable => timetable.department._id === store
        .getState()
        .department.departments.filter(department => department.site === "68cbbdffc5b33217c0218711")[0]._id)
        };
      });
      console.log(this.state.userPins)
      document.getElementById('gharbBtn').classList.add("active")
      document.getElementById('sharkBtn').classList.remove("active")
      document.getElementById('capitalBtn').classList.remove("active")
    }, 3000);
  }
  async onChangeHandler(e, site) {
    e.preventDefault();
    if(site === "gharb"){
      document.getElementById('capitalBtn').classList.remove("active")
      document.getElementById('sharkBtn').classList.remove("active")
      document.getElementById('gharbBtn').classList.add("active")
            let firstfloor = store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdffc5b33217c0218711")[0]
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbdffc5b33217c0218711" && ext.floor === firstfloor._id),
        selectedSite: "68cbbdffc5b33217c0218711",
        selectedSiteFloor: store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdffc5b33217c0218711")
      })
    }else if (site === "capital"){
      document.getElementById('gharbBtn').classList.remove("active")
      document.getElementById('sharkBtn').classList.remove("active")
      document.getElementById('capitalBtn').classList.add("active")
      let firstfloor = store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdf4c5b33217c021870e")[0]
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbdf4c5b33217c021870e" && ext.floor === firstfloor._id),
        selectedSite: "68cbbdf4c5b33217c021870e",
        selectedSiteFloor: store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbdf4c5b33217c021870e")

      })
    }else if (site === "shark"){
      document.getElementById('gharbBtn').classList.remove("active")
      document.getElementById('capitalBtn').classList.remove("active")
      document.getElementById('sharkBtn').classList.add("active")
      let firstfloor = store
        .getState()
        .floor.floors.filter(floor => floor.site === "68cbbe05c5b33217c0218714")[0]
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.site === "68cbbe05c5b33217c0218714" && ext.floor === firstfloor._id),
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
            return { 
              pinCreated: true,
              userPins: store
        .getState()
        .pin.pins.filter(pin => store.getState().auth.user && pin.user === store.getState().auth.user._id)
            };
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
            return { pinDeleted: true,
              userPins: store
        .getState()
        .pin.pins.filter(pin => store.getState().auth.user && pin.user === store.getState().auth.user._id) };
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
          title={`Mabara Alasafra PhoneBook - دليل تليفونات مبرة العصافرة`}
          description="Mabara Alasafra PhoneBook - دليل تليفونات مبرة العصافرة"
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
            <div
              className="row animate__animated animate__fadeIn animate__slower animate__delay-1s"
              style={{ padding: "30px" }}
              dir="rtl"
            >
              <div className="col-12 col-lg-2 animate__animated animate__fadeIn animate__slower animate__delay-2s" dir="ltr">
                <h1 style={{ textAlign: "center", color: 'white' }}>
                  <i className="bi bi-option"></i>
                </h1>
                <h1 style={{ textAlign: "center", color: 'white' }}>الخيارات</h1>
                <br></br>
                <ul className="nav flex-column nav-pills nav-fill">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="phoneExtenstions-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#phoneExtenstions"
                      type="button"
                      role="tab"
                      aria-controls="phoneExtenstions"
                      aria-selected="true"
                      style={{color: 'white'}}
                    >
                      دليل الأرقام الداخلية
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="onCallTables-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#onCallTables"
                      type="button"
                      role="tab"
                      aria-controls="onCallTables"
                      aria-selected="false"
                      style={{color: 'white'}}
                    >
                      جدول الاون كول
                    </a>
                  </li>
                </ul>
                <br></br>
                <hr></hr>
                <br></br>
              </div>
              <div className="col-12 col-lg-10">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="phoneExtenstions"
                    role="tabpanel"
                    aria-labelledby="phoneExtenstions-tab"
                  >
              <div className="row animate__animated animate__fadeIn animate__slower animate__delay-1s">
                <div className="col-12">
              <h1 className="d-block mx-auto text-center text-white">دليل تليفونات مبرة العصافرة</h1>
              <br></br>
              <br></br>
              <hr></hr>
              <br></br>
              <br></br>

                </ div>
                </ div>
              <div className="row animate__animated animate__fadeIn animate__slower animate__delay-2s">
                <div className="col-12 col-md-4 d-flex justify-content-center" style={{padding: "20px"}}>
                  <button id="gharbBtn" type="button" className="btn btn-outline-light">
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
                <div className="col-12 col-md-4 d-flex justify-content-center" style={{padding: "20px"}}>
<button id="capitalBtn" type="button" className="btn btn-outline-light">                    
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
                <div className="col-12 col-md-4 d-flex justify-content-center" style={{padding: "20px"}}>
<button id="sharkBtn" type="button" className="btn btn-outline-light">                    
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
              <hr></hr>
              <div className="row animate__animated animate__fadeIn animate__slower animate__delay-3s">
                <div className="col-12" style={{padding: "20px"}}>
                  <div className="mb-3 row" dir="rtl">
    <label htmlFor="staticsearchTerm" className="col-sm-1 col-form-label text-center text-white">أبحث عن</label>
    <div className="col-sm-11">
      <input type="text" className="form-control" id="staticsearchTerm" onChange={(e) => 
        this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => {
          if(ext.name.toLowerCase().includes(`${e.target.value.trim()}`)){
            return ext
          }
          if(ext.extension.includes(e.target.value.trim())){
            return ext
          }
        })
      })
      }/>
    </div>
  </div>
                </div>
                </div>

                  <hr></hr>
              <dir className="row animate__animated animate__fadeIn animate__slower animate__delay-4s">
                <dir className="col-12">
                  <ul className="nav nav-tabs" id="myTab" role="tablist"  dir="rtl">
                    {Object.keys(store.getState().auth.user).length !== 0 && 
                    <li key={store.getState().auth.user._id} className="nav-item" role="presentation">
    <button className="nav-link text-white text-white" id="pin-tab" data-bs-toggle="tab" data-bs-target="#pin" type="button" role="tab" aria-controls="pin" aria-selected="true" onClick={(e) => {
      this.setState({
        extensions: this.state.userPins.map((pin) => {
          return store
        .getState()
        .extension.extensions.filter(ext => ext._id === pin.extension)[0]
        })
      })
    }}><i className="bi bi-pin-angle-fill"></i></button>
                        </li>
                    }
                    {this.state.selectedSiteFloor.map((floor,index) => {
                      if(index === 0){
                      return <li key={floor._id} className="nav-item" role="presentation">
    <button className="nav-link text-white active" id={floor.nameEnglish + "-tab"} data-bs-toggle="tab" data-bs-target={`#${floor.nameEnglish}`} type="button" role="tab" aria-controls={`${floor.nameEnglish}`} aria-selected="true" onClick={(e) => {
      this.setState({
        extensions: store
        .getState()
        .extension.extensions.filter(ext => ext.floor === floor._id)
      })
    }}>{`${floor.nameArabic}`}</button>
                        </li>
                      }else {
                      return <li key={floor._id} className="nav-item" role="presentation">
    <button className="nav-link text-white" id={floor.nameEnglish + "-tab"} data-bs-toggle="tab" data-bs-target={`#${floor.nameEnglish}`} type="button" role="tab" aria-controls={`${floor.nameEnglish}`} aria-selected="true" onClick={(e) => {
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
<div className="tab-content" id="myTabContent" dir="rtl">
  {this.state.selectedSiteFloor.map((floor,index) => {
    if(index === 0){
      return <div key={floor._id} className="tab-pane fade show active row d-flex justify-content-start" id={`${floor.nameEnglish}`} role="tabpanel" aria-labelledby={floor.nameEnglish + "-tab"}>
        {this.state.extensions.map((ext, index) => {
          return <div id="extensionDiv" key={ext._id} className="card col-12 col-md-3" style={{margin: '20px', padding: "30px"}}>
  <div className="card-body">
    {Object.keys(store.getState().auth.user).length !== 0 && 
    <Fragment>
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
    </Fragment>
    }
    <h5 className="card-title badge bg-primary text-center mx-auto d-block" style={{fontSize: '56px'}}>{ext.extension}</h5>
    <h6 className="card-subtitle mb-2 text-muted  text-center mx-auto d-block">{ext.name}</h6>
  </div>
</div>
        })}
        
      </div>
  }              
  })}
</div>
              </dir>
              </dir>
                    <br></br>
                    <br></br>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="onCallTables"
                    role="tabpanel"
                    aria-labelledby="onCallTables-tab"
                  >
            <dir className="row animate__animated animate__fadeIn animate__slower animate__delay-4s">
                <dir className="col-12">
                  <ul className="nav nav-tabs" id="myTab1" role="tablist"  dir="rtl">
                    {this.state.selectedSiteDepartment.map((department,index) => {
                      if(index === 0){
                      return <li key={department._id} className="nav-item" role="presentation">
    <button className="nav-link text-white active" id={department.nameEnglish + "-tab"} data-bs-toggle="tab" data-bs-target={`#${department.nameEnglish}`} type="button" role="tab" aria-controls={`${department.nameEnglish}`} aria-selected="true" onClick={(e) => {
      this.setState({
        timetables: store
        .getState()
        .timetable.timetables.filter(timetable => timetable.department._id === department._id)
      })
    }}>{`${department.nameArabic}`}</button>
                        </li>
                      }else {
                      return <li key={department._id} className="nav-item" role="presentation">
    <button className="nav-link text-white" id={department.nameEnglish + "-tab"} data-bs-toggle="tab" data-bs-target={`#${department.nameEnglish}`} type="button" role="tab" aria-controls={`${department.nameEnglish}`} aria-selected="true" onClick={(e) => {
      this.setState({
        timetables: store
        .getState()
        .timetable.timetables.filter(timetable => timetable.department._id === department._id)
      })
    }}>{`${department.nameArabic}`}</button>
                        </li>
                      }
                    })}
</ul>
<div className="tab-content" id="myTabContent" dir="rtl">
  {this.state.selectedSiteDepartment.map((department,index) => {
    if(index === 0){
      return <div key={department._id} className="tab-pane fade show active row d-flex justify-content-start" id={`${department.nameEnglish}`} role="tabpanel" aria-labelledby={department.nameEnglish + "-tab"}>
        {this.state.timetables.map((timetable, inxx) => {
          if(timetable.department._id === department._id){
            return <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">اليوم</th>
      <th scope="col">من</th>
      <th scope="col">إلى</th>
      <th scope="col">الشخص</th>
    </tr>
  </thead>
  <tbody>
    {store
        .getState()
        .tableday.tabledays.filter(tableday => tableday.timetable._id === timetable._id).map((tableday, ix) => {
          return <tr>
      <th scope="row">{ix + 1}</th>
      <td>{new Date(tableday.startDate).toDateString()}</td>
      <td>{new Date(tableday.startTime).toTimeString().split(' ')[0]}</td>
      <td>{new Date(tableday.endTime).toTimeString().split(' ')[0]}</td>
      <td>
        <p>{tableday.user.name}</p>
        <hr></hr>
        <p>{tableday.user.phoneNo}</p>
        </td>
    </tr>
        })}
  </tbody>
</table>
          }
        })}
        
      </div>
  }              
  })}
</div>
              </dir>
              </dir>
                    <br></br>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
























            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default GharbHomepage;
