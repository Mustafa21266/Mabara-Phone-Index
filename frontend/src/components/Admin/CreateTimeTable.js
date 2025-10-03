import React, { useState } from "react";
import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { createTimeTable } from "../../actions/timetableActions";
import { createTableDay } from "../../actions/tabledayActions";
import store from "../../store";
import { toast } from "material-react-toastify";
import MetaData from "../MetaData";
import Loader from "../Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import type { TimePickerProps } from 'antd';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const CreateTimeTable = () => {
  let formData = new FormData();
  const [timetableCreated, setTimetableCreated] = useState(false);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [site, setSite] = useState("");
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState(store
        .getState()
        .auth.users);
  const [tableRows, setTableRows] = useState([]);
  const [tableRowsRaw, setTableRowsRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState([new Date(2025, 7, 8, 15, 12, 12)]);
  const [endTime, setEndTime] = useState([new Date(2025, 7, 8, 15, 12, 12)]);
  const [user, setUser] = useState(store
        .getState()
        .auth.users[0]._id);
  async function onSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    document.getElementById("loader").style.display = "block";
    formData.set("name", e.target.name.value);
    formData.set("department", e.target.department.value);
    formData.set("site", e.target.site.value);
    // formData.set("user", e.target.user.value);
    store
        .dispatch(createTimeTable(formData))
        .then((data) => {
        if (data.success === true) {
          tableRowsRaw.map((row, index) => {
            const fd = new FormData();
            // document.getElementById("loader").style.display = "block";
            fd.set("startDate", row[0]);
            fd.set("startTime", row[1]);
            fd.set("endTime", row[2]);
            fd.set("user", row[3]);
            fd.set("timetable", data.timetable._id);
            store.dispatch(createTableDay(fd)).then((data) => {
                
            })
          })
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            setTimetableCreated(true)
        } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
  }
  function handleAddTableRow(e) {
    e.preventDefault();
    console.log(user)
    let newObj = [startDate.toLocaleDateString(), startTime.$d.toTimeString().split(' ')[0], endTime.$d.toTimeString().split(' ')[0], store
        .getState()
        .auth.users.filter(us => us._id === user)[0].name]
    setTableRows([...tableRows, newObj])
    let newObjRaw = [startDate, startTime.$d, endTime.$d, user]
    setTableRowsRaw([...tableRowsRaw, newObjRaw])
    console.log(tableRows)
  }
  function onChangeStartTime(time, timeString){
    console.log(time, timeString)
    setStartTime(time)
  }
    function onChangeEndTime(time, timeString){
    console.log(time, timeString)
    setEndTime(time)
  }
  function handleRemoveTableRow(e, index){
    setTableRows(tableRows.filter((row, idx)=> idx !== index))
  }
  return (
      <Fragment>
        {setTimeout(() => {
              setLoading(false);
              }, 1000)}
        <MetaData
          title={"إضافة جدول جديد"}
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
        {timetableCreated ? (
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
        {loading === true ? (
          <Loader />
        ) : (
          <Fragment>
                            <div className="container">
                              <div className="row animate__animated animate__fadeIn animate__slower">
                                {timetableCreated ? <Redirect to="/" /> : ""}
                                <div className="col-12 col-lg-6 d-block mx-auto">
                                  <div className="login-container">
                                    <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                                    <h1 className="text-center text-white">إضافة جدول جديد</h1>
                                    <br></br>
                                    <form onSubmit={(e) => onSubmitHandler(e)} dir="rtl">
                                       <div className="form-group">
                                        <div className="mb-3 row">
                                        <label htmlFor="exampleInputTimeTableNameArabic1" className="col-sm-2 col-form-label text-center text-white">إسم الجدول</label>
                                        <div className="col-sm-10">
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="exampleInputTimeTableNameArabic1"
                                          placeholder="إسم الجدول"
                                          style={{ borderRadius: "25px" }}
                                          name="name"
                                          value={name}
                                          onChange={(e) =>
                                            setName(e.target.value)
                                          }
                                          required
                                        />
                                                                    {/* <select
                              defaultValue={role}
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
                                        <label htmlFor="exampleInputExtensionDepartment1" className="col-sm-2 col-form-label text-center text-white">القسم</label>
                                        <div className="col-sm-10">
                            <select
                              defaultValue={department}
                              onChange={(e) =>
                                setDepartment(e.target.value)
                              }
                              id="exampleInputExtensionDepartment1"
                              className="form-select"
                              aria-label="Default select example"
                              name="department"
                              required
                            >
                                {departments.map((department) => {
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
                                        <label htmlFor="exampleInputExtensionSite1" className="col-sm-2 col-form-label text-center text-white">مكان الجدول</label>
                                        <div className="col-sm-10">
                            <select
                              defaultValue={site}
                              onChange={(e) => {
                                setSite(e.target.value)
                                setDepartments(store.getState().department.departments.filter((department) => department.site === e.target.value))
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
                                      <hr></hr>
                                      <div class="row">
  <div class="col">
    <h5 className="text-white text-center">اليوم</h5>
    <hr></hr>
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  </div>
  <div class="col">
            <h5 className="text-white text-center">الشخص</h5>
    <hr></hr>
                             <select
                              defaultValue=""
                              onChange={(e) => {
                                setUser(e.target.value)
                                // setDepartments(store.getState().department.departments.filter((department) => department.site === e.target.value))
                                }
                              }
                              id="exampleInputExtensionExtension1"
                              className="form-select"
                              aria-label="Default select example"
                              name="user"
                              required
                            >
                                {users.map((user) => {
                                    return <option value={user._id}>{user.name}</option>
                                })}
                            </select>
  </div>
</div>
<br></br>
<div className="row">
<div class="col">
        <h5 className="text-white text-center">من</h5>
    <hr></hr>
<TimePicker onChange={onChangeStartTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
  </div>
  <div class="col">
            <h5 className="text-white text-center">إلى</h5>
    <hr></hr>
    <TimePicker onChange={onChangeEndTime} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
  </div>
</div>
<br></br>
<div className="row">
  <div className="col d-flex justify-content-center">
<button type="button" class="btn btn-warning" onClick={handleAddTableRow}>إضافة</button>
  </div>
</div>
                                      <hr></hr>
                                      <br></br>
                                      <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">اليوم</th>
      <th scope="col">من</th>
      <th scope="col">إلى</th>
      <th scope="col">الشخص</th>
      <th scope="col">خيارات</th>
    </tr>
  </thead>
  <tbody>
    {tableRows.map((row, index) => {
      console.log(row)
      return <tr>
      <th scope="row">{index + 1}</th>
      <td>{row[0]}</td>
      <td>{row[1]}</td>
      <td>{row[2]}</td>
      <td>{row[3]}</td>
      <td><button type="button" class="btn btn-danger" onClick={(e) => handleRemoveTableRow(e, index)}>إلغاء</button></td>
    </tr>
    })}
  </tbody>
</table>
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
export default CreateTimeTable;
