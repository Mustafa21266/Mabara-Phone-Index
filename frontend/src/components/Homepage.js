import React, { Component } from "react";
import { Fragment } from "react";
import "./Homepage.css";
import store from "../store";
import { Link } from "react-router-dom";
import MetaData from "./MetaData";
import Loader from "./Loader";
import { getAllArticles } from "../actions/articleActions";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    setTimeout(async () => {
      this.setState((state, props) => {
        return {
          loading: false
        };
      });
    }, 1000);
  }
  render() {
    return (
      <Fragment>
        <MetaData
          title={`Mabara Alasafra Support Portal`}
          description="Mabara Alasafra Support Portal"
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
            <div className="container-fluid" style={{backgroundColor: '#3357A0',height: '1500px'}}>
              <h1>Test</h1>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Homepage;
