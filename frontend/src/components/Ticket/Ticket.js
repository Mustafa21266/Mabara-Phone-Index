import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import store from "../../store";
import { withRouter } from "react-router-dom";
import { formatRelative } from "date-fns";
import MetaData from "../MetaData";
import Loader from "../Loader";
import avatarPNG from '../../assets/images/avatar.png';
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: store.getState().ticket.tickets.filter(
        (ticket) => ticket._id === this.props.match.params.id
      )[0],
      loading: true,
      url: window.location.href,
    };
    this.scrollToTop = this.scrollToTop.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });
      document.getElementById("ticketHTML").innerHTML =
        this.state.ticket.ticketHTML;
    }, 4000);
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
                    <h1>{this.state.ticket.ticketTitle}</h1>
                    <hr></hr>
                    <br></br>
                    <div className="d-block">
                      {/* (click)="openAuthorProfile($event) */}
                    </div>
                    <br></br>
                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <p className="author-mention text-left">
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
                          <span className="by-class">
                            By <span className="by-class-2">.</span>
                          </span>
                          <span> {this.state.ticket.user.name}</span>
                        </p>
                        <p
                          className="date-added-style"
                          style={{
                            color: "rgba(0,0,0,0.5)",
                            marginTop: "10px",
                          }}
                        >
                          {formatRelative(
                            new Date(this.state.ticket.createdAt),
                            Date.now()
                          )}
                        </p>
                      </div>
                    </div>

                    <br></br>
                    <hr />
                    <br></br>
                    {"_id" in store.getState().auth.user &&
                      store.getState().auth.user._id ===
                        this.state.ticket.user._id && (
                        <Link
                          className="btn btn-outline-warning"
                          style={{ borderRadius: "50px", padding: "10px 30px" }}
                          to={`/admin/ticket/edit/${this.state.ticket._id}`}
                        >
                          Edit
                        </Link>
                      )}
                    <br></br>
                    <br></br>
                  </div>
                </div>
                <div
                  id="ticketHTML"
                  className="ticket-div color-white"
                  dir="rtl"
                ></div>
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
