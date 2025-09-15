import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { editSite, deleteSite } from "../../actions/siteActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { withRouter } from "react-router-dom";
import intlTelInput from "intl-tel-input";

class EditSite extends Component {
  formData = new FormData();
  constructor(props) {
    super(props);
    this.state = {
      siteEditied: false,
      name: store
        .getState()
        .site.sites.filter((site) => site._id === this.props.match.params.id)[0]
        .name,
      location: store
        .getState()
        .site.sites.filter((site) => site._id === this.props.match.params.id)[0]
        .location,
      loading: true,
    };
    this.handleDeleteSite = this.handleDeleteSite.bind(this);
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
    formData.set("location", e.target.location.value);
    store
        .dispatch(editSite(this.props.match.params.id, formData))
        .then((data) => {
        if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
            return { siteEditied: true };
            });
        } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
  }
    async handleDeleteSite(e) {
    store.dispatch(deleteSite(this.props.match.params.id)).then((data) => {
      if (data.success === true) {
        toast.success(data.message);
        this.setState((state, props) => {
          return { siteEditied: true };
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
          title={"تعديل مكان"}
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
        {this.state.siteEditied ? (
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
                                {this.state.siteEditied ? <Redirect to="/" /> : ""}
                                <div className="col-12 col-lg-6 d-block mx-auto">
                                  <div className="login-container">
                                    <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                                    <h1 className="text-center text-white">إضافة مكان جديد</h1>
                                    <br></br>
                                    <form onSubmit={(e) => this.onSubmitHandler(e)} dir="rtl">
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label for="exampleInputSiteName1" className="col-sm-2 col-form-label text-center text-white">إسم المكان</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputSiteName1"
                                          placeholder="إسم المكان"
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
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      <br></br>
                                        <div className="form-group">
                                          <div className="mb-3 row">     
                                        <label for="exampleInputSiteLocation1" className="col-sm-2 col-form-label text-center text-white">عنوان المكان</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputSiteLocation1"
                                          placeholder="عنوان المكان"
                                          style={{ borderRadius: "25px" }}
                                          name="location"
                                          value={this.state.location}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { location: e.target.value };
                                            })
                                          }
                                          required
                                        />
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
                            onClick={this.handleDeleteSite}
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
export default withRouter(EditSite);
