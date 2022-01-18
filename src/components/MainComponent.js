import React, { Component } from 'react';
import StaffDetail from './StaffDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import Department from './DepartmentComponent';
import Salary from './SalaryComponent';
import { STAFFS, DEPARTMENTS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {
  constructor(props){
    super(props);
    this.state = {      
      staffs: STAFFS,
      departments: DEPARTMENTS
    }
  }


  render() {


    const StaffWithId = ({match}) => {
      return(
        <StaffDetail
          staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
        />
      );
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route path="/staff" component={() => <StaffList staffs={this.state.staffs} />} />
          <Route path="/salary" component={() => <Salary staffs={this.state.staffs} />} />
          <Route path="/department" component={() => <Department departments={this.state.departments} />} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;