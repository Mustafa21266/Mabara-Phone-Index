import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { editPC } from "../../actions/pcActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";

class EditPC extends Component {
  formData = new FormData();
  constructor(props) {
    super(props);
    this.state = {
    article: store.getState().pc.pcs.filter((pc) => pc._id === this.props.match.params.id)[0],
      pcEditied: false,
      pcDeleted: false,
      pcName: '',
      pcDescription: '',
      processorGeneration: '',
      pcManufacturer: '',
      pcOS: '',
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
    formData.set("pcName", e.target.pcName.value);
    formData.set("pcDescription", e.target.pcDescription.value);
    formData.set("processorGeneration", e.target.processorGeneration.value);
    formData.set("pcManufacturer", e.target.pcManufacturer.value);
    formData.set("pcOS", e.target.pcOS.value);
    store
        .dispatch(editPC(formData))
        .then((data) => {
        if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState((state, props) => {
            return { pcEditied: true };
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
          title={"إنشاء مقالة جديدة"}
          description="الموقع الرسمي للأستاذ اتدكتور صلاح الجوهري أستاذ و رئيس وحدة جراحة الأورام و الجراحات الدقيقة بطب طنطا
             و استشاري الجراحة العامة و جراحات المناظير"
          image={
            "https://res.cloudinary.com/dvlnovdyu/image/upload/v1628954855/Screenshot_2021-08-13_165613_ucepzs.png"
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
        {this.state.pcEditied ? (
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
                                {this.state.pcCreated ? <Redirect to="/" /> : ""}
                                <div className="col-12 col-lg-6 d-block mx-auto">
                                  <div className="login-container">
                                    <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                                    <h1 className="text-center text-white">تعديل بيانات كمبيوتر</h1>
                                    <br></br>
                                    <form onSubmit={(e) => this.onSubmitHandler(e)} dir="rtl">
                                      <div className="form-group">
                                        <div className="mb-3 row">
                                        <label for="exampleInputPCName1" className="col-sm-2 col-form-label text-center text-white">إسم الكمبيوتر</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputPCName1"
                                          placeholder="إسم الكمبيوتر"
                                          style={{ borderRadius: "25px" }}
                                          name="pcName"
                                          value={this.state.pcName}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { pcName: e.target.value };
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
                                        <label for="exampleInputPCDescription1" className="col-sm-2 col-form-label text-center text-white">وصف الكمبيوتر</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputPCDescription1"
                                          placeholder="وصف الكمبيوتر"
                                          style={{ borderRadius: "25px" }}
                                          name="pcDescription"
                                          value={this.state.pcDescription}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { pcDescription: e.target.value };
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
                                        <label for="exampleInputProcessorGeneration1" className="col-sm-2 col-form-label text-center text-white">نوع البروسيسور</label>
                                        <div className="col-sm-10">
                                                                        <select
                              defaultValue={this.state.processorGeneration}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { processorGeneration: e.target.value };
                                })
                              }
                              id="exampleInputProcessorGeneration1"
                              className="form-select"
                              aria-label="Default select example"
                              name="processorGeneration"
                              required
                            >
                              <option value="I3">I3</option>
                              <option value="I5">I5</option>
                              <option value="I7">I7</option>
                            </select>
                                        {/* <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputProcessorGeneration1"
                                          placeholder="البريد الإلكتروني"
                                          style={{ borderRadius: "25px" }}
                                          name="email"
                                          value={this.state.email}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { email: e.target.value };
                                            })
                                          }
                                          required
                                        /> */}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      </div>
                                      </div>
                                      <br></br>
                                      <div className="form-group">
                                        <div className="mb-3 row">     
                                        <label for="exampleInputpcOS1" className="col-sm-2 col-form-label text-center text-white">نظام التشغيل</label>
                                        <div className="col-sm-10">
                                                                        <select
                              defaultValue={this.state.pcOS}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { pcOS: e.target.value };
                                })
                              }
                              id="exampleInputpcOS1"
                              className="form-select"
                              aria-label="Default select example"
                              name="pcOS"
                              required
                            >
                              <option value="Windows">ويندوز</option>
                              <option value="Linux">لينيكس</option>
                              <option value="macOS">ماك او اس</option>
                              <option value="Others">أخر</option>
                            </select>
                                        {/* <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputProcessorGeneration1"
                                          placeholder="البريد الإلكتروني"
                                          style={{ borderRadius: "25px" }}
                                          name="email"
                                          value={this.state.email}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { email: e.target.value };
                                            })
                                          }
                                          required
                                        /> */}
                                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                      </div>
                                      </div>
                                      </div>
                                      <br></br>
                                        <div className="form-group">
                                          <div className="mb-3 row">     
                                        <label for="exampleInputPCManufacturer1" className="col-sm-2 col-form-label text-center text-white">جهة التصنيع</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputPCManufacturer1"
                                          placeholder="جهة التصنيع"
                                          style={{ borderRadius: "25px" }}
                                          name="pcManufacturer"
                                          value={this.state.pcManufacturer}
                                          onChange={(e) =>
                                            this.setState((state, props) => {
                                              return { pcManufacturer: e.target.value };
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
export default EditPC;
