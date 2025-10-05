import React, { Component } from "react";
import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { adduser, loginAdmin } from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
import myVideo from '../../assets/videos/mabara.mp4'; // Adjust path as needed
class AddUser extends Component {
  regex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{6,})");
  phoneInput;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phoneNo: "",
      site: "",
      department: "",
      password: "xyz123",
      departments: [],
      sites: [],
      addusered: false,
      loading: true,
    };
    this.checkPassword = this.checkPassword.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ 
        loading: false,
        sites: store.getState().site.sites
       });
      console.log(store.getState().site.sites)
    },4000)
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    let regexName = new RegExp("^([^0-9]*)[a-zA-Zء-ي]$");
    if (regexName.test(e.target.name.value)) {
      document.getElementById("loader").style.display = "block";
      const formData = new FormData();
      formData.set("name", e.target.name.value);
      formData.set("phoneNo", e.target.phoneNo.value);
      formData.set("password", e.target.password.value);
      formData.set("department", e.target.department.value);
      formData.set("site", e.target.site.value);
      store.dispatch(adduser(formData)).then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          document.getElementById("loader").style.display = "none";
          this.setState((state, props) => {
            return { addusered: true };
          });
          window.location.reload();
        } else {
          document.getElementById("loader").style.display = "none";
          toast.error(data.message);
        }
      });
      await store.dispatch(loginAdmin(formData));
    } else {
      toast.error("الأسم لا يمكن أن يحتوي علي أرقام");
    }
  }
  checkPassword(e) {
    if (this.regex.test(e.target.value)) {
      document.getElementById("passwordWarning").style.display = "none";
      this.setState((state, props) => {
        return { password: e.target.value };
      });
    } else {
      document.getElementById("passwordWarning").style.display = "block";
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`تسجيل كمستخدم جديد`}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
          }
          url={window.location.href}
        />
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
            {"_id" in store.getState().auth.user ? (
              <Redirect to="/"></Redirect>
            ) : (
              <Fragment>
                  <div className="home animate__animated animate__fadeIn animate__slower animate__delay-1s">
                      <video muted loop autoPlay className="animate__animated animate__fadeIn animate__slower animate__delay-2s">
                        <source src={myVideo} type="video/mp4"/>
                      </video>
                      <div className="home-content">
                <div className="container" dir="rtl">
                  <div className="row animate__animated animate__fadeIn animate__slower">
                    {/* <img
                      id="loginImg"
                      className="img-fluid mx-auto login-img animate__animated animate__pulse animate__infinite animate__slower  d-flex align-self-center"
                      src={"../images/heart_login.png"}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "700px",
                        zIndex: -1,
                      }}
                    ></img> */}
                    {this.state.addusered ? <Redirect to="/" /> : ""}
                    <div className="col-12 col-lg-6 d-block mx-auto">
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <div className="login-container">
                      <br></br>
                        <h1 className="text-center text-white">إضافة مستخدم جديد</h1>
                      <br></br>
                        <hr></hr>
                        <br></br>
                        <form onSubmit={(e) => this.onSubmitHandler(e)}>
                          <div className="form-group">
                            <div className="mb-3 row">
                              <label htmlFor="exampleInputExtensionPhoneNo1" className="col-sm-2 col-form-label text-center text-white">الإسم</label>
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
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
                          </div>
                          </div>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <div className="mb-3 row">
                              <label htmlFor="exampleInputExtensionPhoneNo1" className="col-sm-2 col-form-label text-center text-white">رقم التليفون</label>
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                            <div className="col-sm-10">
                            <input
                              type="phoneNo"
                              id="phoneNo"
                              className="form-control"
                              placeholder="رقم التليفون"
                              name="phoneNo"
                              style={{ borderRadius: "25px" }}
                              defaultValue={this.state.phoneNo}
                              required
                            />
                            <p
                              id="numberWarning"
                              style={{ textAlign: "right", display: "none" }}
                            >
                              رقم التليفون لابد ان يكون مكون من 11 رقم
                            </p>
                          </div>
                          </div>
                          </div>
                                                                <br></br>
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputExtensionDepartment1" className="col-sm-2 col-form-label text-center text-white">القسم</label>
                                        <div className="col-sm-10">
                            <select
                              defaultValue={this.state.department}
                              onChange={(e) =>
                                this.setState({
                                  department: e.target.value
                                })
                              }
                              id="exampleInputExtensionDepartment1"
                              className="form-select"
                              aria-label="Default select example"
                              name="department"
                              required
                            >
                                {this.state.departments.map((department) => {
                                    return <option value={department._id}>{department.nameArabic} - {department.nameEnglish}</option>
                                })}
                            </select>
                                        </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      <br></br>
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputExtensionSite1" className="col-sm-2 col-form-label text-center text-white">المكان</label>
                                        <div className="col-sm-10">
                            <select
                              defaultValue={this.state.site}
                              onChange={(e) => {
                                this.setState({
                                  site: e.target.value,
                                  departments: store.getState().department.departments.filter((department) => department.site === e.target.value)
                                })
                                }
                              }
                              id="exampleInputExtensionSite1"
                              className="form-select"
                              aria-label="Default select example"
                              name="site"
                              required
                            >
                                {this.state.sites.map((site) => {
                                    return <option value={site._id}>{site.name}</option>
                                })}
                            </select>
                                        </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      <br></br>
                          <div className="form-group">
                            <div className="mb-3 row">
                              <label htmlFor="exampleInputExtensionPhoneNo1" className="col-sm-2 col-form-label text-center text-white">كلمة السر</label>
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                            <div className="col-sm-10">
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="كلمة السر"
                              style={{ borderRadius: "25px" }}
                              name="password"
                              defaultValue={this.state.password}
                              onChange={(e) => this.checkPassword(e)}
                              required
                            />
                            <br></br>
                            <p
                              id="passwordWarning"
                              style={{ textAlign: "right", display: "none" }}
                            >
                              كلمه السر يجب الا تقل عن 6 أحرف/أرقام , و يجب ان
                              تحتوي علي حرف واحد و رقم واحد علي ألاقل
                            </p>
                          </div>
                          </div>
                          </div>
                          <br></br>
                          <button
                            type="submit"
                            className="btn btn-outline-light d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                          >
                            تأكيد
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
                        <br></br>
                        {/* <p className="text-center text-white">
                          سجلت مسبقاً
                          <Link to="/login" style={{marginRight: '10px',color: '#e60006'}}>تسجيل الدخول</Link>
                        </p> */}
                        {/* <p className="text-center">
                          سجلت مسبقا؟ <Link to="/login">تسجيل الدخول</Link>
                        </p> */}
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}
export default AddUser;
