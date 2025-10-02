import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { editTimeTable, deleteTimeTable } from "../../actions/timetableActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { withRouter } from "react-router-dom";

class EditTimeTable extends Component {
  formData = new FormData();
  constructor(props) {
    super(props);
    this.state = {
      timetableEditied: false,
      nameArabic: store
        .getState()
        .timetable.timetables.filter((timetable) => timetable._id === this.props.match.params.id)[0]
        .nameArabic,
        nameEnglish: store
        .getState()
        .timetable.timetables.filter((timetable) => timetable._id === this.props.match.params.id)[0]
        .nameEnglish,
      site: store
        .getState()
        .timetable.timetables.filter((timetable) => timetable._id === this.props.match.params.id)[0]
        .site,
      loading: true,
    };
    this.handleDeleteTimeTable = this.handleDeleteTimeTable.bind(this);
    // this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  async onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    document.getElementById("loader").style.display = "block";
    formData.set("nameArabic", e.target.nameArabic.value);
    formData.set("nameEnglish", e.target.nameEnglish.value);
    formData.set("site", e.target.site.value);
    store
        .dispatch(editTimeTable(this.props.match.params.id, formData))
        .then((data) => {
        if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
            return { timetableEditied: true };
            });
        } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
  }
    async handleDeleteTimeTable(e) {
    store.dispatch(deleteTimeTable(this.props.match.params.id)).then((data) => {
      if (data.success === true) {
        toast.success(data.message);
        this.setState((state, props) => {
          return { timetableEditied: true };
        });
      } else {
        toast.error(data.message);
      }
    });
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"تعديل قسم"}
          description="دليل تليفونات مبرة العصافرة"
          image={
            ""
          }
          url={window.location.href}
        />
        {"_id" in store.getState().auth.user ? (
          store.getState().auth.user.role !== "admin" ? (
            <Redirect to="/"></Redirect>
          ) : (
            ""
          )
        ) : (
          <Redirect to="/"></Redirect>
        )}
        {this.state.timetableEditied ? (
          <Redirect to={`/`}></Redirect>
        ) : (
          ""
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
                            <div className="container">
                              <div className="row animate__animated animate__fadeIn animate__slower">
                                {this.state.timetableEditied ? <Redirect to="/" /> : ""}
                                <div className="col-12 col-lg-6 d-block mx-auto">
                                  <div className="login-container">
                                    <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                                    <h1 className="text-center text-white">إضافة قسم جديد</h1>
                                    <br></br>
                                    <form onSubmit={(e) => this.onSubmitHandler(e)} dir="rtl">
<div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputTimeTableNameArabic1" className="col-sm-2 col-form-label text-center text-white">إسم القسم بالعربية</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputTimeTableNameArabic1"
                                          placeholder="إسم القسم بالعربية"
                                          style={{ borderRadius: "25px" }}
                                          name="nameArabic"
                                          value={this.state.nameArabic}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { nameArabic: e.target.value };
                                            })
                                          }
                                          required
                                        />
                                                                    {/* <select
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
                              <option value="moderator">moderator</option>
                            </select> */}
                                        </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      <br></br>
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputTimeTableNameEnglish1" className="col-sm-2 col-form-label text-center text-white">إسم القسم بالأنجليزية</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputTimeTableNameEnglish1"
                                          placeholder="إسم القسم بالأنجليزية"
                                          style={{ borderRadius: "25px" }}
                                          name="nameEnglish"
                                          value={this.state.nameEnglish}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { nameEnglish: e.target.value };
                                            })
                                          }
                                          required
                                        />
                                                                    {/* <select
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
                              <option value="moderator">moderator</option>
                            </select> */}
                                        </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      <br></br>
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputExtensionSite1" className="col-sm-2 col-form-label text-center text-white">مكان الإمتداد</label>
                                        <div className="col-sm-10">
                            <select
                              defaultValue={this.state.site}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { site: e.target.value };
                                })
                              }
                              id="exampleInputExtensionSite1"
                              className="form-select"
                              aria-label="Default select example"
                              name="site"
                              required
                            >
                                {store.getState().site.sites.map((site) => {
                                    return <option value={site._id}>{site.name}</option>
                                })}
                            </select>
                                        </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
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
                          <button
                            type="button"
                            className="btn btn-outline-danger d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            onClick={this.handleDeleteTimeTable}
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
          </Fragment>
        )}

        <br></br>
      </Fragment>
    );
  }
}
export default withRouter(EditTimeTable);
