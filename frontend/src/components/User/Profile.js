import React, { Component } from "react";
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { MDBDataTable } from "mdbreact";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: store.getState().user,
      redirect: "_id" in store.getState().auth.user ? false : true,
      message: "",
      loading: true,
    };
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  async change() {
    await this.setState({ message: "store.getState().auth.user.message" });
  }
  hoverHandler(e) {
    e.target.style.border = "3px solid rgba(0,0,0,0.5)";
    e.target.style.opacity = "0.4";
    e.target.style.transition = "opacity 2s, border 2s";
  }
  hoverAwayHandler(e) {
    e.target.style.border = "4px solid rgba(0,0,0,0.3)";
    e.target.style.opacity = "1";
    e.target.style.transition = "opacity 2s, border 2s";
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`حسابي الشخصي`}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {!this.state.redirect ? (
          <Fragment>
            {this.state.loading === true ? (
              <Loader />
            ) : (
              <Fragment>
                <br></br>
                <br></br>
                <br></br>
                <div
                  className="row mt-5 user-info  animate__animated animate__fadeIn"
                  style={{ padding: "20px 50px" }} dir="rtl"
                >
                  <div className="row">
                    <div className="col-12 col-md-12">
                      <br></br>
                      <Link
                        to="/me/update"
                        id="edit_profile"
                        className="btn btn-primary d-block mx-auto"
                        style={{ width: "150px" }}
                      >
                        تعديل الحساب
                      </Link>
                      <br></br>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-8 mx-auto">
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            تفاصيل الحساب
                          </button>
                          {/* <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button> */}
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent" style={{color: 'white'}}>
                        <div
                          className="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <br></br>
                          <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-center">الأسم</label>
                        <div className="col-sm-10">
                          <input type="text" readOnly className="form-control" id="staticEmail" value={store.getState().auth.user.name} style={{color:'black'}} />
                        </div>
                      </div>
                          <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-center">إسم المستخدم</label>
                        <div className="col-sm-10">
                          <input type="text" readOnly className="form-control" id="staticEmail" value={store.getState().auth.user.username} style={{color:'black'}} />
                        </div>
                      </div>
                                                <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-center">البريد الإلكتروني</label>
                        <div className="col-sm-10">
                          <input type="text" readOnly className="form-control" id="staticEmail" value={store.getState().auth.user.email} style={{color:'black'}} />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-center">تاريخ التسجيل</label>
                        <div className="col-sm-10">
                          <input type="text" readOnly className="form-control" id="staticEmail" value={String(
                                store.getState().auth.user.createdAt
                              ).substring(0, 10)} style={{color:'black'}} />
                        </div>
                      </div>
                      <div className="mb-3 row">
                        <label htmlFor="staticEmail" className="col-sm-2 col-form-label text-center">نوع الحساب</label>
                        <div className="col-sm-10">
                          <input type="text" readOnly className="form-control" id="staticEmail" value={store
                                .getState()
                                .auth.user.role.charAt(0)
                                .toUpperCase() +
                                store.getState().auth.user.role.substring(1)} style={{color:'black'}} />
                        </div>
                      </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav-reservation"
                          role="tabpanel"
                          aria-labelledby="nav-reservation-tab"
                        >
                          <br></br>
                          {/* <MDBDataTable
                            data={this.setReservations()}
                            className="px-3"
                            bordered
                            striped
                            hover
                            responsive
                            dir="rtl"
                          /> */}
                        </div>
                        {/* <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Redirect to="/"></Redirect>
        )}
      </Fragment>
    );
  }
}
export default Profile;
