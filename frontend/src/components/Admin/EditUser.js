import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import {
  editUserDetailsAdmin,
  deleteUserAdmin,
} from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import { withRouter } from "react-router-dom";
import MetaData from "../MetaData";
import Loader from "../Loader";
class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: store
        .getState()
        .auth.users.filter((user) => user._id === this.props.match.params.id)[0]
        .name,
      role: store
        .getState()
        .auth.users.filter((user) => user._id === this.props.match.params.id)[0]
        .role,
      phoneNo: store
        .getState()
        .auth.users.filter((user) => user._id === this.props.match.params.id)[0]
        .phoneNo,
      department: "",
      site: "",
      edited: false,
      loading: true,
      disableBtn: false,
    };
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.checkPhoneNo = this.checkPhoneNo.bind(this);
  }
  componentDidMount() {
    this.setState({ loading: false });
    setTimeout(() => {
      let input = document.querySelector("#phone");
      this.phoneInput = "";
    }, 1000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    let regexName = new RegExp("^([^0-9]*)[a-zA-Zء-ي]$");
    if (!regexName.test(this.state.name)) {
      toast.error("الأسم لا يمكن أن يحتوي علي أرقام");
    } else {
      document.getElementById("loader").style.display = "block";
      const formData = new FormData();
      formData.set("name", this.state.name);
      formData.set("phoneNo", this.phoneInput.getNumber());
      formData.set("department", this.state.department);
      formData.set("site", this.state.site);
      formData.set("role", this.state.role);
      store
        .dispatch(editUserDetailsAdmin(this.props.match.params.id, formData))
        .then((data) => {
          if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
              return { edited: true };
            });
          } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
          }
        });
      // await store.dispatch(loginAdmin(formData))
    }
  }
  async handleDeleteUser(e) {
    store.dispatch(deleteUserAdmin(this.props.match.params.id)).then((data) => {
      if (data.success === true) {
        toast.success(data.message);
        this.setState((state, props) => {
          return { edited: true };
        });
      } else {
        toast.error(data.message);
      }
    });
  }
  checkPhoneNo(e) {
    if (typeof this.phoneInput == "object") {
      if (e.target.value.length === 11) {
        document.getElementById("numberWarning").style.display = "none";
        this.setState((state, props) => {
          return { phoneNo: this.phoneInput.getNumber(), disableBtn: false };
        });
      } else {
        this.setState((state, props) => {
          return { disableBtn: true };
        });
        document.getElementById("numberWarning").style.display = "block";
      }
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"تعديل بيانات مستخدم"}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {"_id" in store.getState().auth.user ? (
          <Fragment>
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
                <div className="container" style={{ height: "100vh" }}>
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    {this.state.edited ? (
                      <Redirect to="/admin/dashboard" />
                    ) : (
                      ""
                    )}
                    <div className="col-12 col-lg-6 d-block mx-auto" dir="rtl">
                      <div className="login-container">
                        <h1 className="text-center">تعديل بيانات الحساب</h1>
                        <br></br>
                        <form onSubmit={(e) => this.onSubmitHandler(e)}>
                          <div className="form-group">
                            <div className="mb-3 row">
                        <label htmlhtmlFor="staticSite" className="col-sm-2 col-form-label text-center">الإسم</label>
                        <div className="col-sm-10">
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                            <input
                              type="text"
                              className="form-control"
                              id="exampleInputName1"
                              placeholder="الأسم"
                              style={{ borderRadius: "25px" }}
                              name="name"
                              value={this.state.name}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { name: e.target.value };
                                })
                              }
                              required
                            />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          </div>
                          </div>
                          <br></br>
<div className="mb-3 row">
                        <label htmlhtmlFor="staticDepartment" className="col-sm-2 col-form-label text-center">القسم</label>
                        <div className="col-sm-10">
                          <input type="text" readOnly className="form-control" id="staticDepartment" value={store.getState().auth.user.department.nameArabic + ' - ' + store.getState().auth.user.department.nameEnglish} style={{color:'black'}} />
                        </div>
                      </div>
                                                <br></br>
                      <div className="mb-3 row">
                        <label htmlhtmlFor="staticSite" className="col-sm-2 col-form-label text-center">المكان</label>
                        <div className="col-sm-10">
                          <input type="text" readOnly className="form-control" id="staticSite" value={store.getState().auth.user.site.name} style={{color:'black'}} />
                        </div>
                      </div>
                          <br></br>
                          <div className="form-group">
                             <div className="mb-3 row">
                        <label htmlhtmlFor="staticSite" className="col-sm-2 col-form-label text-center">رقم الموبايل</label>
                        <div className="col-sm-10">
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                            <input
                              id="phoneNo"
                              className="form-control"
                              placeholder="رقم الموبايل"
                              type="tel"
                              style={{ borderRadius: "25px" }}
                              name="phoneNo"
                              defaultValue={this.state.phoneNo}
                              onChange={(e) => this.checkPhoneNo(e)}
                              required
                            />
                            <p
                              id="numberWarning"
                              style={{ textAlign: "right", display: "none" }}
                            >
                              رقم التليفون لابد ان يكون مكون من 11 رقم
                            </p>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          </div>
                          </div>
                          <br></br>
                          <div className="form-group">
                        <div className="mb-3 row">
                        <label htmlhtmlFor="staticSite" className="col-sm-2 col-form-label text-center">الصلاحيات</label>
                        <div className="col-sm-10">
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                            <select
                              defaultValue={this.state.role}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { role: e.target.value };
                                })
                              }
                              id="placeSelect"
                              className="form-select"
                              aria-label="Default select example"
                              name="role"
                              required
                            >
                              <option value="user">user</option>
                              <option value="admin">admin</option>
                              <option value="moderator">operator</option>
                            </select>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          </div>
                          </div>
                          <br></br>
                          <button
                            type="submit"
                            className="btn btn-outline-primary d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            disabled={this.state.disableBtn}
                          >
                            تأكيد
                          </button>
                          <br></br>
                          <button
                            type="button"
                            className="btn btn-outline-danger d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            onClick={this.handleDeleteUser}
                          >
                            مسح
                          </button>
                          <br></br>
                          <div id="loader" style={{ display: "none" }}>
                            <div className="text-center">
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
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
export default withRouter(EditUser);
