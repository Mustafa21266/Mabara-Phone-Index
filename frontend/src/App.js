// import logo from './logo.svg';
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link
} from "react-router-dom";
import { ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import CapitalHomepage from "./components/CapitalHomepage";
import SharkHomepage from "./components/SharkHomepage";
import GharbHomepage from "./components/GharbHomepage";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";
import Register from "./components/User/Register";
import history from "./history";
import EditProfile from "./components/User/EditProfile";
// Require Editor JS files.
import "froala-editor/js/froala_editor.pkgd.min.js";

// Require Editor CSS files.
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";

// Require Font Awesome.
// import 'font-awesome/css/font-awesome.css';
import CreateArticle from "./components/Admin/CreateArticle";
import EditArticle from "./components/Admin/EditArticle";
import AllArticles from "./components/Article/AllArticles";
import Article from "./components/Article/Article";
import { getAllUsers, getUserDetails } from "./actions/adminActions";
import store from "./store";
import { Fragment } from "react";
import Dashboard from "./components/Admin/Dashboard";
import OPGharbDashboard from "./components/Operator/OPGharbDashboard";
import OPSharkDashboard from "./components/Operator/OPSharkDashboard";
import OPCapitalDashboard from "./components/Operator/OPCapitalDashboard";
import { getAllArticles } from "./actions/articleActions";
import EditUser from "./components/Admin/EditUser";
import Loader from "./components/Loader";
import ForgotPassword from "./components/User/ForgotPassword";
import NewPassword from "./components/User/NewPassword";
import Cookies from 'js-cookie';
import CreateSite from './components/Admin/CreateSite'
import EditSite from './components/Admin/EditSite'
import CreateDepartment from './components/Admin/CreateDepartment'
import EditDepartment from './components/Admin/EditDepartment'
import CreateTimeTable from './components/Admin/CreateTimeTable'
import EditTimeTable from './components/Admin/EditTimeTable'
import CreateFloor from './components/Admin/CreateFloor'
import EditFloor from './components/Admin/EditFloor'
import CreateExtension from './components/Admin/CreateExtension'
import EditExtension from './components/Admin/EditExtension'
import { getAllSites } from "./actions/siteActions";
import { getAllFloors } from "./actions/floorActions";
import { getAllExtensions } from "./actions/extensionActions";
import { getAllPins } from "./actions/pinActions";
import { getAllDepartments } from "./actions/departmentActions";
import { getAllTimeTables } from "./actions/timetableActions";
import { getAllTableDays } from "./actions/tabledayActions";
// import { SIPProvider } from "react-sipjs";
// import { ReactSipPhone } from 'react-sip-phone'
// import 'react-sip-phone/dist/index.css'

const name = "4444";
const sipuri = "sip:4444@10.30.90.13";
const password = "T3$t1234";
const websocket = "https://10.30.90.13:8090"; // Your WebSocket server

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refresh: false,
    };
    // console.log(Cookies.get("token"))
  }
  componentDidMount() {
    setTimeout(()=>{
    // console.log(Cookies.get("token"))
    
    store.dispatch(getAllSites()).then((data) => {
                store.dispatch(getAllFloors()).then((data) => {
              store.dispatch(getAllExtensions()).then((data) => {
                store.dispatch(getAllDepartments()).then((data) => {
                store.dispatch(getAllUsers()).then((data) => {
                store.dispatch(getAllTimeTables()).then((data) => {
                store.dispatch(getAllTableDays()).then((data) => {
                
            })
            })
            })
            })
            })
          });
      });
      console.log(Cookies.get("token"))
      if(Cookies.get("token")){
        store.dispatch(getUserDetails(Cookies.get("token"))).then((data) => {
                store.dispatch(getAllPins(Cookies.get("token"))).then((data) => {
                            if (data.success) {
                      this.setState({ refresh: true, loading: false });
                  } else {
                  this.setState({ loading: false });
                }
                })
         
        });
      }else {
        this.setState({ refresh: true, loading: false });
      }
    },2000)

  }
  
  render() {
    return (
      <Fragment>
        {this.state.loading === true ? (
          <Loader />
        ) : (
          <Router history={history}>
            <Navbar history={history} />
            {/* <ReactSipPhone
                        name={name}
                        sipCredentials={{ sipuri: sipuri, password: password }}
                        sipConfig={{ websocket: websocket, defaultCountryCode: '20' }}
                        width={400}
                    /> */}
            <Route path="/capital/homepage" exact>
              <CapitalHomepage />
            </Route>
              <Route path="/shark/homepage" exact>
              <SharkHomepage />
            </Route>
              <Route path="/gharb/homepage" exact>
              <GharbHomepage />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/register" exact>
              <Register />
            </Route>
            <Route path="/me/update" exact>
              <EditProfile />
            </Route>
            <Route path="/me" exact>
              <Profile />
            </Route>
            <Route path="/password/forgot" component={ForgotPassword} exact />
            <Route
              path="/password/reset/:token"
              component={NewPassword}
              exact
            />
            <Route path="/admin/site/create" exact>
              <CreateSite />
            </Route>
            <Route path="/admin/site/update/:id" exact>
              <EditSite />
            </Route>
              <Route path="/admin/department/create" exact>
              <CreateDepartment />
            </Route>
            <Route path="/admin/department/update/:id" exact>
              <EditDepartment />
            </Route>
              <Route path="/admin/timetable/create" exact>
              <CreateTimeTable />
            </Route>
            <Route path="/admin/timetable/update/:id" exact>
              <EditTimeTable />
            </Route>
            <Route path="/admin/floor/create" exact>
              <CreateFloor />
            </Route>
            <Route path="/admin/floor/update/:id" exact>
              <EditFloor />
            </Route>
              <Route path="/admin/extension/create" exact>
              <CreateExtension />
            </Route>
            <Route path="/admin/extension/update/:id" element={<EditExtension />} exact>
             
            </Route>
            <Route path="/admin/article/create" exact>
              <CreateArticle />
            </Route>
            <Route path="/admin/article/edit/:id" exact>
              <EditArticle />
            </Route>
            <Route path="/admin/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/operator/gharb/dashboard" exact>
              <OPGharbDashboard />
            </Route>
            <Route path="/operator/shark/dashboard" exact>
              <OPSharkDashboard />
            </Route>
            <Route path="/operator/capital/dashboard" exact>
              <OPCapitalDashboard />
            </Route>
            <Route path="/admin/user/update/:id" exact>
              <EditUser />
            </Route>
            <Route path="/articles/all" exact>
              <AllArticles />
            </Route>
            <Route path="/article/:id" exact>
              <Article />
            </Route>
            <ToastContainer autoClose={3000} />
            <Footer />
          </Router>
        )}
      </Fragment>
    );
  }
}

export default App;
