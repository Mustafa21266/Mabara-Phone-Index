import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { editExtension, deleteExtension } from "../../actions/extensionActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { withRouter } from "react-router-dom";
import intlTelInput from "intl-tel-input";

class EditExtension extends Component {
  formData = new FormData();
  constructor(props) {
    super(props);
    this.state = {
      extensionEditied: false,
      name: store
        .getState()
        .extension.extensions.filter((extension) => extension._id === this.props.match.params.id)[0]
        .name,
      number: store
        .getState()
        .extension.extensions.filter((extension) => extension._id === this.props.match.params.id)[0]
        .number,
      site: store
        .getState()
        .extension.extensions.filter((extension) => extension._id === this.props.match.params.id)[0]
        .site,
      loading: true,
    };
    this.handleDeleteExtension = this.handleDeleteExtension.bind(this);
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
    formData.set("number", e.target.number.value);
    formData.set("site", e.target.site.value);
    store
        .dispatch(editExtension(this.props.match.params.id, formData))
        .then((data) => {
        if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
            return { extensionEditied: true };
            });
        } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
  }
    async handleDeleteExtension(e) {
    store.dispatch(deleteExtension(this.props.match.params.id)).then((data) => {
      if (data.success === true) {
        toast.success(data.message);
        this.setState((state, props) => {
          return { extensionEditied: true };
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
          title={"تعديل الطابق"}
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
        {this.state.extensionEditied ? (
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
                                {this.state.extensionEditied ? <Redirect to="/" /> : ""}
                                <div className="col-12 col-lg-6 d-block mx-auto">
                                  <div className="login-container">
                                    <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                                    <h1 className="text-center text-white">تعديل الطابق</h1>
                                    <br></br>
                                    <form onSubmit={(e) => this.onSubmitHandler(e)} dir="rtl">
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputExtensionName1" className="col-sm-2 col-form-label text-center text-white">إسم الطابق</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputExtensionName1"
                                          placeholder="إسم الطابق"
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
                                        <label htmlFor="exampleInputExtensionNumber1" className="col-sm-2 col-form-label text-center text-white">رقم الطابق</label>
                                        <div className="col-sm-10">
                            <select
                              defaultValue={this.state.number}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { number: e.target.value };
                                })
                              }
                              id="exampleInputExtensionNumber1"
                              className="form-select"
                              aria-label="Default select example"
                              name="number"
                              required
                            >
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                              <option value="11">11</option>
                              <option value="12">12</option>
                              <option value="13">13</option>
                              <option value="14">14</option>
                              <option value="15">15</option>
                            </select>
                                        </div>
                                        </div>
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      <br></br>
                                                                            <br></br>
                               <div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputExtensionSite1" className="col-sm-2 col-form-label text-center text-white">مكان الطابق</label>
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
                            onClick={this.handleDeleteExtension}
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
export default withRouter(EditExtension);
