import React, { Component } from 'react';
import Header from './HeaderComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import Department from './DepartmentComponent';
import DepartmentDetail from './DepartmentDetailComponent';
import Salary from './SalaryComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStaffs, fetchDepartments, fetchStaffsSalary, postStaff, deleteStaff, patchStaff } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary
  }
}

const mapDispatchToProps = (dispatch) => ({
  postStaff: (staff) => dispatch(postStaff(staff)),
  fetchStaffs: () => {dispatch(fetchStaffs())},
  fetchDepartments: () => {dispatch(fetchDepartments())},
  fetchStaffsSalary: () => {dispatch(fetchStaffsSalary())},
  deleteStaff: (id) => dispatch(deleteStaff(id)),
  patchStaff: (staff) => dispatch(patchStaff(staff)),
});
class Main extends Component {

  // Xử lí hàm thêm nhân viên
  // handleAddStaff(newStaff) {
  //   const addStaff = this.props.staffs.staffs.push(newStaff)
  //   this.setState({
  //     staffs: [...this.props.staffs, addStaff]
  //   });
  // }

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }
  
  render() {
    console.log(this.props.staffs)
    const StaffWithId = ({match}) => {
      return(
          <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
          isLoading={this.props.staffs.isLoading}
          errMess={this.props.staffs.errMess}
          postStaff={this.props.postStaff}
          department={this.props.departments.departments}
          onUpdateStaff={this.props.patchStaff}
          />
        );
      }

    const DepartmentWithId = ({match}) => {
      console.log(this.props.departments.departments.filter((department) => department.id === match.params.departmentId)[0])
      return(
        <DepartmentDetail department={this.props.departments.departments.filter((department) => department.id === match.params.departmentId)[0]}
        staff={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.departmentId)}
        />
      );
    }

    return (
        <div className="App">
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
            <Route exact path="/stafflist" component={() => 
                <StaffList 
                  staffs={this.props.staffs} 
                  onAddStaff={this.props.postStaff} 
                  onDeleteStaff={this.props.deleteStaff}
                />}
            />
            <Route path="/stafflist/:staffId" component={StaffWithId} />
            <Route exact path="/department" component={() => <Department departments={this.props.departments} />} />
            <Route path="/department/:departmentId" component={DepartmentWithId} />
            <Route exact path="/salary" component={() => <Salary staffs={this.props.staffs} />} />
            <Redirect to="/stafflist" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));