import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { createExtension } from "../../actions/extensionActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";

class CreateExtension extends Component {
  formData = new FormData();
  constructor(props) {
    super(props);
    this.state = {
      extensionCreated: false,
      name: '',
      extension: '',
      site: store
        .getState()
        .site.sites[0]._id,
      floor: '',
      loading: true,
    };
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
    formData.set("name", e.target.name.value);
    formData.set("extension", e.target.extension.value);
    formData.set("site", e.target.site.value);
    formData.set("floor", e.target.floor.value);
    store
        .dispatch(createExtension(formData))
        .then((data) => {
        if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
            return { extensionCreated: true };
            });
        } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"إضافة طابق جديد"}
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
        {this.state.extensionCreated ? (
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
                                {this.state.extensionCreated ? <Redirect to="/" /> : ""}
                                <div className="col-12 col-lg-6 d-block mx-auto">
                                  <div className="login-container">
                                    <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                                    <h1 className="text-center text-white">إضافة طابق جديد</h1>
                                    <br></br>
                                    <form onSubmit={(e) => this.onSubmitHandler(e)} dir="rtl">
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label for="exampleInputExtensionName1" className="col-sm-2 col-form-label text-center text-white">إسم الإمتداد</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputExtensionName1"
                                          placeholder="إسم الإمتداد"
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
                                        <label for="exampleInputExtensionExtension1" className="col-sm-2 col-form-label text-center text-white">رقم الإمتداد</label>
                                        <div className="col-sm-10">
                            <input
                                          type="number"
                                          className="form-control"
                                          id="exampleInputExtensionExtension1"
                                          placeholder="رقم الإمتداد"
                                          style={{ borderRadius: "25px" }}
                                          name="extension"
                                          value={this.state.extension}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { extension: e.target.value };
                                            })
                                          }
                                          required
                                        />
                                        </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      <br></br>
                               <div className="form-group">
                                        <div className="mb-3 row">
                                        <label for="exampleInputExtensionSite1" className="col-sm-2 col-form-label text-center text-white">مكان الإمتداد</label>
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
                               <div className="form-group">
                                        <div className="mb-3 row">
                                        <label for="exampleInputExtensionFloor1" className="col-sm-2 col-form-label text-center text-white">طابق الإمتداد</label>
                                        <div className="col-sm-10">
                            <select
                              defaultValue={this.state.floor}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { floor: e.target.value };
                                })
                              }
                              id="exampleInputExtensionFloor1"
                              className="form-select"
                              aria-label="Default select example"
                              name="floor"
                              required
                            >
                                {store.getState().floor.floors.map((floor) => {
                                  console.log(floor.site, this.state.site)
                                    if(floor.site === this.state.site){
                                      return <option value={floor._id}>{floor.nameArabic} - {floor.nameEnglish}</option>
                                    }
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
export default CreateExtension;
