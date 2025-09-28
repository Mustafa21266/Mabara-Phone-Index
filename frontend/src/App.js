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
import Homepage from "./components/Homepage";
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
import { getUserDetails } from "./actions/adminActions";
import store from "./store";
import { Fragment } from "react";
import Dashboard from "./components/Admin/Dashboard";
import { getAllArticles } from "./actions/articleActions";
import EditUser from "./components/Admin/EditUser";
import Loader from "./components/Loader";
import ForgotPassword from "./components/User/ForgotPassword";
import NewPassword from "./components/User/NewPassword";
import Cookies from 'js-cookie';
import CreateSite from './components/Admin/CreateSite'
import EditSite from './components/Admin/EditSite'
import CreateFloor from './components/Admin/CreateFloor'
import EditFloor from './components/Admin/EditFloor'
import CreateExtension from './components/Admin/CreateExtension'
import EditExtension from './components/Admin/EditExtension'
import { getAllSites } from "./actions/siteActions";
import { getAllFloors } from "./actions/floorActions";
import { getAllExtensions } from "./actions/extensionActions";
import { getAllPins } from "./actions/pinActions";

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
            <Route path="/" exact>
              <Homepage />
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
            <Route path="/admin/floor/create" exact>
              <CreateFloor />
            </Route>
            <Route path="/admin/floor/update/:id" exact>
              <EditFloor />
            </Route>
              <Route path="/admin/extension/create" exact>
              <CreateExtension />
            </Route>
            <Route path="/admin/extension/update/:id" exact>
              <EditExtension />
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
