import React, { Component } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/third_party/image_tui.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/print.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import { createTicket } from "../../actions/ticketActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
const idForImages = Date.now();
class CreateTicket extends Component {
  config = {
    placeholderText: "Edit Your Content Here!",
    charCounterCount: false,
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
          "inlineClass",
          "inlineStyle",
          "clearFormatting",
        ],
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "paragraphStyle",
          "lineHeight",
          "outdent",
          "indent",
          "quote",
        ],
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "embedly",
          "insertFile",
          "insertHR",
        ],
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
          "help",
        ],
        align: "right",
        buttonsVisible: 2,
      },
    },
    // Set the image upload parameter.
    imageUploadParam: "ticketImage",

    // Set the image upload URL.
    imageUploadURL: `http://localhost:8000/api/v1/admin/ticket/images/upload/${
      store.getState().auth.user._id
    }`,
    // imageRemoveURL: `http://localhost:8000/api/v1/admin/ticket/images/delete/${store.getState().auth.user._id}`,

    // Additional upload params.
    imageUploadParams: {
      idForImages: idForImages,
    },
    // Set request type.
    imageUploadMethod: "POST",

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ["jpeg", "jpg", "png"],

    events: {
      "image.beforeUpload": async function (images) {
        // Return false if you want to stop the image upload.
      },
      "image.uploaded": function (response) {
        toast.success("Image Uploaded Successfully!");
      },
      "image.inserted": function ($img, response) {
        // Image was inserted in the editor.
        // console.log($img,response)
      },
      "image.removed": function ($img) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          // Image was removed.
          if (this.readyState === 4 && this.status === 200) {
            toast.success("Image Deleted Successfully!");
          }
        };
        xhttp.open(
          "POST",
          `http://localhost:8000/api/v1/admin/ticket/images/delete/${
            store.getState().auth.user._id
          }`,
          true
        );
        xhttp.setRequestHeader(
          "Content-Type",
          "application/json;charset=UTF-8"
        );
        xhttp.send(
          JSON.stringify({
            src: $img[0].currentSrc,
          })
        );
      },
      "image.replaced": function ($img, response) {
        // Image was replaced in the editor.
      },
      "image.error": function (error, response) {
        // Bad link.
        if (error.code === 1) {
        }

        // No link in upload response.
        else if (error.code === 2) {
        }

        // Error during image upload.
        else if (error.code === 3) {
        }

        // Parsing response failed.
        else if (error.code === 4) {
        }

        // Image too text-large.
        else if (error.code === 5) {
        }

        // Invalid image type.
        else if (error.code === 6) {
        }

        // Image can be uploaded only to same domain in IE 8 and IE 9.
        else if (error.code === 7) {
        }

        // Response contains the original server response to the request if available.
      },
    },
  };
  formData = new FormData();
  constructor(props) {
    super(props);
    this.state = {
      ticketCreated: false,
      ticket: {},
      ticketTitle: "",
      category: "Infrastructure",
      subcategory: "Hardware",
      department: "",
      site: "",
      departments: [],
      user: "",
      loading: true,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
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
  // changeTicketCoverHandler(e) {
  //   //
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       document
  //         .getElementById("coverForTicket")
  //         .setAttribute("src", reader.result);
  //       // store.dispatch(avatarChange(store.getState().auth.user._id,formData)).then((data)=>{
  //       //     if(data.success === true){
  //       //         toast.success(data.message)
  //       //     }else {
  //       //         toast.error(data.message)
  //       //     }
  //       // }).catch(err => toast.error(err.message))
  //     }
  //   };
  //   this.formData.set("ticketCover", e.target.files[0]);
  //   reader.readAsDataURL(e.target.files[0]);
  //   // console.log(e.target.files[0])
  //   // const objectURL = URL.createObjectURL(e.target.files[0])
  // }
  submitHandler(e) {
    e.preventDefault();
    if (document.getElementById("ticketTitle").value === "") {
      toast.error("أدخل عنوان التيكيت");
    } else if (
      document.getElementsByClassName("fr-element fr-view")[0].innerHTML ===
      "<p><br></p>"
    ) {
      toast.error("المقالة لا يمكن ان تكون فارغة");
    }else {
      document.getElementById("loader").style.display = "block";
      this.formData.set(
        "ticketTitle",
        document.getElementById("ticketTitle").value
      );
      this.formData.set("category", this.state.category);
      this.formData.set("subcategory", this.state.subcategory);
      this.formData.set("department", this.state.department);
      this.formData.set("site", this.state.site);
      this.formData.set("ticketNumber", store.getState().ticket.tickets.length + 1);
      this.formData.set("createdBy", store.getState().auth.user._id);
      this.formData.set("assignedTo", store.getState().auth.user._id);
      this.formData.set(
        "ticketHTML",
        document.getElementsByClassName("fr-element fr-view")[0].innerHTML
      );
      this.formData.set("idForImages", idForImages);
      console.log(this.formData)
      store
        .dispatch(createTicket(this.formData))
        .then((data) => {
          if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            this.setState({ ticketCreated: true, ticket: data.ticket });
          } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
          }
        })
        .catch((err) => toast.error(err.message));
    }
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"إنشاء تيكيت جديدة"}
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
        {this.state.ticketCreated ? (
          <Redirect to={`/ticket/${this.state.ticket._id}`}></Redirect>
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
            <div className="row animate__animated animate__fadeIn animate__slower">
              <div className="col-12 col-lg-10 background-class mx-auto animate__animated animate__fadeIn  animate__delay-1s" dir="rtl">
                <h1 style={{ textAlign: "center", color: 'white' }}>إنشاء تيكيت جديده</h1>
                <br></br>
                <hr></hr>
                <br></br>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                        <div className="mb-3 row">
                        <label htmlhtmlFor="staticSite" className="col-sm-2 col-form-label text-center text-white">عنوان التيكيت</label>
                    <div className="col-sm-10">
                    <input
                      id="ticketTitle"
                      type="text"
                      className="form-control"
                      placeholder="عنوان التيكيت"
                      required
                    />
                    </div>
                    </div>
                    </div>
                    <br></br>
                          <div className="form-group">
                        <div className="mb-3 row">
                        <label htmlhtmlFor="staticCategory" className="col-sm-2 col-form-label text-center text-white">التصنيف</label>
                        <div className="col-sm-10">
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                            <select
                              defaultValue={this.state.category}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { category: e.target.value };
                                })
                              }
                              id="categorySelect"
                              className="form-select"
                              aria-label="Default select example"
                              name="category"
                              required
                            >
                              <option value="Infrastructure">بنية تحتية</option>
                              <option value="Application">أبليكيشن</option>
                              <option value="Others">أخر</option>
                            </select>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                          </div>
                          </div>
                          </div>
<br></br>
                          <div className="form-group">
                        <div className="mb-3 row">
                        <label htmlhtmlFor="staticsubCategory" className="col-sm-2 col-form-label text-center text-white">التصنيف الفرعي</label>
                        <div className="col-sm-10">
                            {/* <label htmlFor="exampleInputEmail1">Email address</label> */}
                            <select
                              defaultValue={this.state.subcategory}
                              onChange={(e) =>
                                this.setState((state, props) => {
                                  return { subcategory: e.target.value };
                                })
                              }
                              id="subcategorySelect"
                              className="form-select"
                              aria-label="Default select example"
                              name="subcategory"
                              required
                            >
                              <option value="Hardware">هارد وير</option>
                              <option value="Software">سوفت وير</option>
                              <option value="Networking">شبكات</option>
                              <option value="System">سيستم</option>
                              <option value="PrimeCare">برايم كير - خبير</option>
                              <option value="Others">أخر</option>
                            </select>
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
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
                                let dep = store.getState().department.departments.length > 0 ? store.getState().department.departments.filter((department) => department.site === e.target.value)[0]._id : ""
                                this.setState({
                                  site: e.target.value,
                                  departments: store.getState().department.departments.filter((department) => department.site === e.target.value),
                                  department: dep
                                })
                                }
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




                    <FroalaEditor
                      tag="textarea"
                      config={this.config}
                      // model={this.state.model}
                      // onModelChange={this.handleModelChange}
                    />
                  </div>
                </div>
                <br></br>
                <div className="form-group col-12">
                  <button
                    type="button"
                    onClick={(e) => this.submitHandler(e)}
                    className="btn btn-outline-primary d-block mx-auto"
                    style={{ borderRadius: "50px", padding: "10px 30px" }}
                  >
                    إنشاء
                  </button>
                  <br></br>
                  <div id="loader" style={{ display: "none" }}>
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
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
export default CreateTicket;
