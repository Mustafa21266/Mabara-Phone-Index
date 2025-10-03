import React, { useState } from "react";
import { Fragment } from "react";
import { Redirect, useParams } from "react-router-dom";
import { editTimeTable, deleteTimeTable } from "../../actions/timetableActions";
import { createTableDay, deleteTableDay } from "../../actions/tabledayActions";
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

const EditTimeTable = () => {
  const { id } = useParams();
  console.log(id)
  let formData = new FormData();
  const [timetableEdited, setTimetableEdited] = useState(false);
  const [name, setName] = useState(store
        .getState()
        .timetable.timetables.filter((timetable) => timetable._id === id)[0]
        .name);
  const [site, setSite] = useState(store
              .getState()
              .timetable.timetables.filter((timetable) => timetable._id === id)[0]
              .site._id);
  const [department, setDepartment] = useState(store
        .getState()
        .timetable.timetables.filter((timetable) => timetable._id === id)[0]
        .department._id);
  const [departments, setDepartments] = useState(store.getState().department.departments.filter((department) => department.site === site));
  const [users, setUsers] = useState(store
        .getState()
        .auth.users);
  const [tableRows, setTableRows] = useState(
    store.getState().tableday.tabledays.filter((tableday) => tableday.timetable.site === site).map((row, index) =>{
      return [ new Date(row.startDate).toLocaleDateString(), new Date(row.startTime).toTimeString().split(' ')[0], new Date(row.endTime).toTimeString().split(' ')[0], row.user.name, row._id]
    })
  );
  const [tableRowsRaw, setTableRowsRaw] = useState(store.getState().tableday.tabledays.filter((tableday) => tableday.timetable.site === site).map((row, index) =>{
      return [ new Date(row.startDate), new Date(row.startTime), new Date(row.endTime), row.user._id]
    })
  );
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
        .dispatch(editTimeTable(id,formData))
        .then((data) => {
        if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            setTimetableEdited(true)
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
    const fd = new FormData();
    // document.getElementById("loader").style.display = "block";
    fd.set("startDate", startDate);
    fd.set("startTime", startTime.$d);
    fd.set("endTime", endTime.$d);
    fd.set("user", user);
    fd.set("timetable", id);
    store.dispatch(createTableDay(fd)).then((data) => {
          if (data.success === true) {
            toast.success(data.message);
          }      
    })
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
    document.getElementById("loader").style.display = "block";
    store
        .dispatch(deleteTableDay(tableRows.filter((row, idx)=> idx === index)[0][4]))
        .then((data) => {
        if (data.success === true) {
            document.getElementById("loader").style.display = "none";
            toast.success(data.message);
            // setTimetableEdited(true)
        } else {
            document.getElementById("loader").style.display = "none";
            toast.error(data.message);
        }
        });
    // console.log(tableRows.filter((row, idx)=> idx === index)[0][4])
    setTableRows(tableRows.filter((row, idx)=> idx !== index))
    setTableRowsRaw(tableRowsRaw.filter((row, idx)=> idx !== index))
  }
  async function handleDeleteTimeTable(e) {
    store.dispatch(deleteTimeTable(id)).then((data) => {
      if (data.success === true) {
        toast.success(data.message);

        this.setState((state, props) => {
          return { timetableEdited: true };
        });
      } else {
        toast.error(data.message);
      }
    });
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
        {timetableEdited ? (
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
                                {timetableEdited ? <Redirect to="/" /> : ""}
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
                          <button
                            type="button"
                            className="btn btn-outline-danger d-block mx-auto"
                            style={{
                              borderRadius: "50px",
                              padding: "10px 30px",
                            }}
                            onClick={(e) => handleDeleteTimeTable(e, id)}
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
export default EditTimeTable;
