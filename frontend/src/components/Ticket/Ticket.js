import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import store from "../../store";
import { withRouter } from "react-router-dom";
import { formatRelative } from "date-fns";
import MetaData from "../MetaData";
import Loader from "../Loader";
import avatarPNG from '../../assets/images/avatar.png';
import { changeTicketAssigned, changeTicketStatus } from "../../actions/ticketActions";
import { createTicketHTML, deleteTicketHTML, editTicketHTML } from "../../actions/ticketHTMLActions";
import { toast } from "material-react-toastify";
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
const idForImages = Date.now();
class Ticket extends Component {
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
  constructor(props) {
    super(props);
    this.state = {
      ticket: store.getState().ticket.tickets.filter(
        (ticket) => ticket._id === this.props.match.params.id
      )[0],
      loading: true,
      ticketHTML: [],
      status: "",
      assignedTo: "",
      commentAdded: false,
      commentBeingEditied: false,
      editiedCommentId: "",
      url: window.location.href,
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.handleAddNewComment = this.handleAddNewComment.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false, ticket: store.getState().ticket.tickets.filter(
        (ticket) => ticket._id === this.props.match.params.id
      )[0],
      ticketHTML: store.getState().ticketHTML.ticketHTMLs.filter(
        (ticketHTML) => ticketHTML.ticket._id === this.props.match.params.id
      )
    });
      document.getElementById("ticketHTML").innerHTML =
        this.state.ticket.ticketHTML;
    }, 3000);
  }
  componentDidUpdate(e) {
    if (this.props.match.params.id !== e.match.params.id) {
      this.setState({
        ticket: store.getState().ticket.tickets.filter(
          (ticket) => ticket._id === this.props.match.params.id
        )[0],
        loading: false,
        url: window.location.href,
      });
      document.getElementById("ticketHTML").innerHTML =
        this.state.ticket.ticketHTML;
    }
  }
  hoverHandler(e) {
    // e.target.style.border = '3px solid rgba(0,0,0,0.5)'
    if (e.target.tagName === "A") {
      e.target.style.opacity = "0.4";
      e.target.style.transform = "scale(1.1)";
      e.target.style.transition = "opacity 1s, transform 1s";
    }
  }
  hoverAwayHandler(e) {
    e.target.style.opacity = "1";
    e.target.style.transform = "scale(1)";
    e.target.style.transition = "opacity 1s, transform 1s";
  }
  scrollToTop(e) {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
    //    window.scroll(0,0)
  }
  async handleAddNewComment(e) {
    document.getElementById("loader").style.display = "block";
    const formData = new FormData();
    formData.set("ticketHTML", document.getElementsByClassName("fr-element fr-view")[0].innerHTML);
    formData.set("ticket", this.state.ticket._id);
    formData.set("createdBy", store.getState().auth.user._id);
    formData.set("idForImages", idForImages);
    store.dispatch(createTicketHTML(formData)).then((data) => {
      if (data.success === true) {
        document.getElementById("loader").style.display = "none";
        toast.success(data.message);
        this.setState({
            ticketHTML: this.state.ticketHTML.concat(data.ticketHTML)
          })
          document.getElementsByClassName("fr-element fr-view")[0].innerHTML = ""
        setTimeout(() => { 
          this.forceUpdate();
        },2000)
      } else {
        toast.error(data.message);
      }
    });
  }
  async handleDeleteComment(e, index) {
    document.getElementById("loader").style.display = "block";
    store.dispatch(deleteTicketHTML(index)).then((data) => {
      if (data.success === true) {
        document.getElementById("loader").style.display = "none";
        toast.success(data.message);
        this.setState({
            ticketHTML: this.state.ticketHTML.filter((ticketHTML) => ticketHTML._id !== data.ticketHTML._id)
          })
          document.getElementsByClassName("fr-element fr-view")[0].innerHTML = ""
        setTimeout(() => { 
          this.forceUpdate();
        },2000)
      } else {
        toast.error(data.message);
      }
    });
  }
    async handleEditComment(e, index) {
    document.getElementById("loader").style.display = "block";
    const formData = new FormData();
    formData.set("ticketHTML", document.getElementsByClassName("fr-element fr-view")[0].innerHTML);
    store.dispatch(editTicketHTML(this.state.editiedCommentId , formData)).then((data) => {
      if (data.success === true) {
        document.getElementById("loader").style.display = "none";
        toast.success(data.message);
        this.setState({
            ticketHTML: this.state.ticketHTML.map((ticketHTML) => {
              if(ticketHTML._id === data.ticketHTML._id){
                return data.ticketHTML
              }
              return ticketHTML
            })
          })
          document.getElementsByClassName("fr-element fr-view")[0].innerHTML = ""
        setTimeout(() => { 
          this.setState({
            editiedCommentId: ""
          })
          this.forceUpdate();
        },2000)
      } else {
        toast.error(data.message);
      }
    });
  }
  render() {
    return (
      <Fragment>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData
              title={`${this.state.ticket.ticketTitle}`}
              description={this.state.ticket.ticketTitle}
              url={this.state.url}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row animate__animated animate__fadeIn animate__slower">
              <div className="col-12 col-lg-10 d-block mx-auto background-class">
                <br></br>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-end bg-transparent">
                    <li className="breadcrumb-item active" aria-current="page">
                      {this.state.ticket.ticketHeadline}
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="/tickets/all">كل التيكيتات</Link>
                    </li>
                  </ol>
                </nav>
                <hr />
                <div className="row">
                  <div className="col-10 mx-auto">
                    <br></br>
                    <br></br>
                    <h1 className="text-white">#{this.state.ticket.ticketNumber} - {this.state.ticket.ticketTitle}</h1>
                    <hr></hr>
                    <br></br>
                    <div className="row">
                      <div className="col-12 col-md-9">
<h5 className="text-white">Created On : {formatRelative(
                            new Date(this.state.ticket.createdAt),
                            Date.now()
                          )}</h5>
                          <br></br>
                    <h5 className="text-white">Assigned to :                           <img
                            className="img-fluid ticket-avatar"
                            src={avatarPNG}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              marginRight: "10px",
                              marginLeft: "10px",
                              position: "relative",
                              top: "-2px",
                            }}
                            alt="Card image cap"
                          />
                          <span> {this.state.ticket.assignedTo.name}</span>
                          </h5>
                    </div>
                    <div className="col-12 col-md-3">
                            <select
                              defaultValue={this.state.ticket.status}
                              onChange={(e) => {
                                document.getElementById("loader").style.display = "block";
      const formData = new FormData();
      formData.set("status", e.target.value);
      console.log(this.props.match.params.id)
      store
        .dispatch(changeTicketStatus(this.props.match.params.id, formData))
        .then((data) => {
          if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
this.setState((state, props) => {
                                  return { status: e.target.value };
                                })
          } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
          }
        });
                                
                              }
                              }
                              id="statusSelect"
                              className="form-select"
                              aria-label="Default select example"
                              name="status"
                              required
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Solved">Solved</option>
                              <option value="Closed">Closed</option>
                              <option value="Escalated">Escalated</option>

                            </select>
                            <hr></hr>
                            <select
                              defaultValue={this.state.ticket.assignedTo._id}
                              onChange={(e) => {
                                document.getElementById("loader").style.display = "block";
      const formData = new FormData();
      formData.set("assignedTo", e.target.value);
      store
        .dispatch(changeTicketAssigned(this.props.match.params.id, formData))
        .then((data) => {
          if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
this.setState((state, props) => {
                                  return { assignedTo: e.target.value };
                                })
          } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
          }
        });
                                
                              }
                              }
                              id="statusSelect"
                              className="form-select"
                              aria-label="Default select example"
                              name="status"
                              required
                            >
                              {store.getState().auth.users.map((user) => {
                                return <option value={user._id}>{user.name}</option>
                              })}
                            </select>
                    </div>
                    </div>
                          <br></br>
                    <hr></hr>
                    <br></br>
                    <br></br>
                    <div className="row">
                      <div className="col-12">
                        <div>
                        <p className="author-mention text-left text-white">
                          <img
                            className="img-fluid ticket-avatar"
                            src={avatarPNG}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              marginRight: "10px",
                              position: "relative",
                              top: "-2px",
                            }}
                            alt="Card image cap"
                          />
                          <span> {this.state.ticket.createdBy.name}</span>
                          <span style={{marginLeft: '5px'}} className="by-class">
                            Commented <span className="by-class-2">:</span>
                          </span>
                          <span style={{float: 'right'}}>
                            {formatRelative(
                            new Date(this.state.ticket.createdAt),
                            Date.now()
                          )}
                          </span>
                        </p>
                      </div>
                      </div>
                    </div>
                    {/* {"_id" in store.getState().auth.user &&
                      store.getState().auth.user._id ===
                        this.state.ticket.user._id && (
                        <Link
                          className="btn btn-outline-warning"
                          style={{ borderRadius: "50px", padding: "10px 30px" }}
                          to={`/admin/ticket/edit/${this.state.ticket._id}`}
                        >
                          Edit
                        </Link>
                      )} */}
                  </div>
                </div>
                <div className="row">
                <div className="col-12">
<div
                  id="ticketHTML"
                  className="ticket-div color-white"
                  dir="rtl"
                ></div>
                </div>
                </div>
                <hr></hr>
                {this.state.ticketHTML.map((ticketHTML, index) => {
                  return  <Fragment>
                    <div className="row">
                      <div className="col-6 col-md-6 text-white">
                        <img
                            className="img-fluid ticket-avatar"
                            src={avatarPNG}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              marginRight: "10px",
                              position: "relative",
                              top: "-2px",
                            }}
                            alt="Card image cap"
                          />
                          <span> {ticketHTML.createdBy.name}</span>
                          <span style={{marginLeft: '5px'}} className="by-class">
                            Commented <span className="by-class-2">:</span>
                          </span>
                          <p><span style={{marginLeft: '55px',fontSize: '14px'}}>
                            {formatRelative(
                            new Date(ticketHTML.createdAt),
                            Date.now()
                          )}
                          </span></p>
                      </div>
                      <div className="col-6 col-md-6" dir="rtl">
                        <div className="dropdown">
  <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{padding: '10px'}}>
  </button>
  <ul className="dropdown-menu text-right">
       <button className="dropdown-item text-center ibm-plex-sans-arabic-semibold" onClick={(e) => {
        document.getElementsByClassName("fr-element fr-view")[0].scrollIntoView({
        behavior: 'smooth'
    });
    document.getElementsByClassName("fr-element fr-view")[0].innerHTML = ticketHTML.ticketHTML
    this.setState({
      commentBeingEditied: true,
      editiedCommentId: ticketHTML._id
    })
       }}>تعديل</button>
    <div className="dropdown-divider"></div>
       <button className="dropdown-item text-center ibm-plex-sans-arabic-semibold" onClick={(e) => this.handleDeleteComment(e, ticketHTML._id)}>إلغاء</button>
    {/* <li><a className="dropdown-item" href="#">تعديل</a></li>
    <li><a className="dropdown-item" href="#">إلغاء</a></li> */}
  </ul>
</div>
                      </div>
                    </div> 
                  <div className="row">
                <div className="col-12">
<div
                  id={`ticketHTML_${index}`}
                  className="ticket-div color-white"
                  dir="rtl"
                >
                </div>
                </div>
                </div>
                                  { <div style={{visibility: 'hidden'}}>{setTimeout(() => {
                    document.getElementById(`ticketHTML_${index}`).innerHTML = ticketHTML.ticketHTML
                  }, 2000)}
                  </div>
                  }
                  </Fragment>
                })}
                <div className="row">
                  <div className="col-12">
                    <FroalaEditor
                                          tag="textarea"
                                          config={this.config}
                                          // model={this.state.model}
                                          // onModelChange={this.handleModelChange}
                                        />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <hr></hr>
                    {!this.state.commentBeingEditied && <button
                            type="button"
                            className="btn btn-outline-light d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            onClick={this.handleAddNewComment}
                          >
                            إضافة تعليق
                          </button>}
                   {this.state.commentBeingEditied && <button
                            type="button"
                            className="btn btn-outline-light d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            onClick={this.handleEditComment}
                          >
                            حفظ
                          </button>}
                  </div>
                </div>
                
                                          <div id="loader" style={{ display: "none" }}>
                            <div className="text-center">
                              <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          </div>
              </div>
            </div>
          </Fragment>
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Fragment>
    );
  }
}

export default withRouter(Ticket);
