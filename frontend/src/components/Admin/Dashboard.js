import React, { Component } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../actions/adminActions";
import { get } from "../../actions/adminActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import { withRouter } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { getAllSites } from "../../actions/siteActions";
import { getAllFloors } from "../../actions/floorActions";
import { getAllExtensions } from "../../actions/extensionActions";
import Cookies from 'js-cookie';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sites: [],
      floors: [],
      extensions: [],
      loading: true,
    };
    store.dispatch(getAllUsers(Cookies.get("token"))).then(async (usersData) => {
      if (usersData.success === true) {
        store.dispatch(getAllSites()).then(async (sitesData) => {
          store.dispatch(getAllFloors()).then(async (floorsData) => {
            store.dispatch(getAllExtensions()).then(async (extensionsData) => {
              console.log(sitesData)
              this.setState({
                users: usersData.users,
                sites: sitesData,
                floors: floorsData,
                extensions: extensionsData,
                loading: false,
              });
            })
        })
        })
        } else {
          toast.error(usersData.message);
          this.setState({
            loading: false,
          });
        }
    });
  }
  componentDidMount() {}
  setUsers() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "الأسم",
          field: "name",
          sort: "asc",
        },
        {
          label: "إسم المستخدم",
          field: "username",
          sort: "asc",
        },
        {
          label: "البريد الإلكتروني",
          field: "email",
          sort: "asc",
        },
        {
          label: "الدور",
          field: "role",
          sort: "asc",
        },

        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.users.forEach((user) => {
      data.rows = data.rows.concat({
        id: user._id,
        name: user.name,
        username: user.username,
        email: `${user.email}`,
        role: `${user.role}`,
        createdAt: String(user.createdAt).substring(0, 10),
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/user/update/${user._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
  setSites() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "الأسم",
          field: "name",
          sort: "asc",
        },
        {
          label: "العنوان",
          field: "location",
          sort: "asc",
        },
        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.sites.forEach((site) => {
      data.rows = data.rows.concat({
        id: site._id,
        name: site.name,
        location: site.location,
        createdAt: String(site.createdAt).substring(0, 10),
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/site/update/${site._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
    setFloors() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "الأسم",
          field: "name",
          sort: "asc",
        },
        {
          label: "رقم الطابق",
          field: "number",
          sort: "asc",
        },
        {
          label: "المكان",
          field: "site",
          sort: "asc",
        },
        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.floors.forEach((floor) => {
      data.rows = data.rows.concat({
        id: floor._id,
        name: floor.name,
        number: floor.number,
        site: floor.site,
        createdAt: String(floor.createdAt).substring(0, 10),
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/floor/update/${floor._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
      setExtensions() {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "الأسم",
          field: "name",
          sort: "asc",
        },
        {
          label: "الإمتداد",
          field: "extension",
          sort: "asc",
        },
        {
          label: "المكان",
          field: "site",
          sort: "asc",
        },
        {
          label: "الطابق",
          field: "floor",
          sort: "asc",
        },
        {
          label: "تاريخ التسجيل",
          field: "createdAt",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    this.state.extensions.forEach((extension) => {
      data.rows = data.rows.concat({
        id: extension._id,
        name: extension.name,
        extension: extension.extension,
        site: extension.site,
        floor: extension.floor,
        createdAt: String(extension.createdAt).substring(0, 10),
        actions: (
          <Fragment>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <Link
                  to={`/admin/extension/update/${extension._id}`}
                  className="btn btn-primary py-2 px-3"
                >
                  <i className="bi bi-pen"></i>
                </Link>
              </div>
            </div>
            <hr />
          </Fragment>
        ),
      });
    });
    return data;
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={"لوجة تحكم الأدمن"}
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div
              className="row animate__animated animate__fadeIn animate__slower animate__delay-1s"
              style={{ padding: "30px" }}
              dir="rtl"
            >
              <div className="col-12 col-lg-2 animate__animated animate__fadeIn animate__slower animate__delay-2s" dir="ltr">
                <h1 style={{ textAlign: "center", color: 'white' }}>
                  <i className="bi bi-speedometer"></i>
                </h1>
                <h1 style={{ textAlign: "center", color: 'white' }}> لوحة التحكم</h1>
                <br></br>
                <ul className="nav flex-column nav-pills nav-fill">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                      style={{color: 'white'}}
                    >
                      الرئيسية
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="user-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#user"
                      type="button"
                      role="tab"
                      aria-controls="user"
                      aria-selected="false"
                      style={{color: 'white'}}
                    >
                      المستخدمين
                    </a>
                  </li>
                    <li className="nav-item">
                    <a
                      className="nav-link"
                      id="site-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#site"
                      type="button"
                      role="tab"
                      aria-controls="site"
                      aria-selected="false"
                      style={{color: 'white'}}
                    >
                      الأماكن
                    </a>
                  </li>
                                      <li className="nav-item">
                    <a
                      className="nav-link"
                      id="floor-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#floor"
                      type="button"
                      role="tab"
                      aria-controls="floor"
                      aria-selected="false"
                      style={{color: 'white'}}
                    >
                      الطوابق
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="extension-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#extension"
                      type="button"
                      role="tab"
                      aria-controls="extension"
                      aria-selected="false"
                      style={{color: 'white'}}
                    >
                      الإمتدادات
                    </a>
                  </li>
                </ul>

                {/* 
                <ul className="nav flex-column" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="reservation-tab" data-bs-toggle="tab" data-bs-target="#reservation" type="button" role="tab" aria-controls="reservation" aria-selected="false">reservation</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="user-tab" data-bs-toggle="tab" data-bs-target="#user" type="button" role="tab" aria-controls="user" aria-selected="false">user</button>
                    </li>
                </ul> */}
                <br></br>
                <hr></hr>
                <br></br>
              </div>
              <div className="col-12 col-lg-10">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div
                        className="col-12 col-lg-6 animate__animated animate__fadeIn animate__slower animate__delay-3s"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-person"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.users.length}
                            </h4>
                            <p className="card-text text-center">مستخدمين</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document.getElementById("user-tab").click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>
<div
                        className="col-12 col-lg-6 animate__animated animate__fadeIn animate__slower animate__delay-4s"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-house-door"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.sites ? this.state.sites.length : 0}
                            </h4>
                            <p className="card-text text-center">الأماكن</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document.getElementById("site-tab").click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>


                    </div>
                    <br></br>
                    <br></br>
                                        <div className="row">
                      <div
                        className="col-12 col-lg-6 animate__animated animate__fadeIn animate__slower animate__delay-5s"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-house"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.floors ? this.state.floors.length : 0}
                            </h4>
                            <p className="card-text text-center">الطوابق</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document.getElementById("floor-tab").click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-12 col-lg-6 animate__animated animate__fadeIn animate__slower animate__delay-5s"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        <div className="card">
                          <br></br>
                          <i
                            className="bi bi-telephone"
                            style={{ fontSize: "7rem" }}
                          ></i>
                          <div className="card-body">
                            <h4 className="card-title text-center">
                              {this.state.extensions ? this.state.extensions.length : 0}
                            </h4>
                            <p className="card-text text-center">الإمتدادات</p>
                            <hr></hr>
                            <a
                              className="card-text text-center"
                              type="button"
                              onClick={(e) =>
                                document.getElementById("extension-tab").click()
                              }
                            >
                              عرض التفاصيل
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="user"
                    role="tabpanel"
                    aria-labelledby="user-tab"
                  >
                    <MDBDataTable
                      data={this.setUsers()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="site"
                    role="tabpanel"
                    aria-labelledby="site-tab"
                  >
                    <MDBDataTable
                      data={this.setSites()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
                  </div>
                <div
                    className="tab-pane fade"
                    id="floor"
                    role="tabpanel"
                    aria-labelledby="floor-tab"
                  >
                    <MDBDataTable
                      data={this.setFloors()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
                  </div>
                                  <div
                    className="tab-pane fade"
                    id="extension"
                    role="tabpanel"
                    aria-labelledby="extension-tab"
                  >
                    <MDBDataTable
                      data={this.setExtensions()}
                      className="px-3"
                      bordered
                      striped
                      hover
                      responsive
                      dir="rtl"
                    />
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
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </Fragment>
    );
  }
}
export default withRouter(Dashboard);
