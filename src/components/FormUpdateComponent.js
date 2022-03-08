import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Label, Col, Row, Input, Form } from 'reactstrap';

// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => (val) && (val.length >= len);

class FromUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staff: props.staff,
            isModalOpen: false
        }
        // this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  // Tắt mở Modal
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  

  // Xử lý event onChange
  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;

  //   this.setState({
  //     staff: {...this.state.staff, name: value},
  //   });
  // }
  handleSubmit = (e) => {
  e.preventDefault();
    const updateNewStaff = {
      id: this.state.staff.id,
      name: this.state.staff.name,
      doB: this.state.staff.doB,
      startDate: this.state.staff.startDate,
      salaryScale: this.state.staff.salaryScale,
      departmentId: this.state.staff.departmentId,
      annualLeave: this.state.staff.annualLeave,
      overTime: this.state.staff.overTime,
      image: '/asset/images/alberto.png'
    };
    this.props.onUpdate(updateNewStaff);
  }

    render() {
        return(
            <React.Fragment>
            <Button onClick={this.toggleModal}>Update</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Cập nhật Nhân Viên</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={(values) => this.handleSubmit (values)}>
                        <Row className="form-group">
                          <Label htmlFor="name">Tên</Label>
                          <Col>
                          <Input type="text" id="name" name="name"
                             placeholder="Vui lòng nhập Họ và Tên"
                            className="form-control"
                            value={this.state.staff.name}
                            onChange={(event) => this.setState({
                              staff: {...this.state.staff, name: event.target.value}
                            })}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="doB">Ngày sinh</Label>
                          <Col>
                          <Input type="date" id="doB" name="doB"
                            className="form-control"
                            value={this.state.staff.doB}
                            onChange={(event) => this.setState({
                              staff: {...this.state.staff, doB: event.target.value}
                            })}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="startDate">Ngày vào công ty</Label>
                          <Col>
                          <Input type="date" id="startDate" name="startDate"
                            className="form-control"
                            value={this.state.staff.startDate}
                            onChange={(event) => this.setState({
                              staff: {...this.state.staff, startDate: event.target.value}
                            })}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="departmentId">Phòng ban</Label>
                          <Col>
                          <Input type="select" id="departmentId" name="departmentId"
                            className="form-control"
                            value={this.state.staff.departmentId}
                            onChange={(event) => this.setState({
                              staff: {...this.state.staff, departmentId: event.target.value}
                            })}
                            >
                              <option value="Dept01">Sale</option>
                              <option value="Dept02">HR</option>
                              <option value="Dept03">Marketing</option>
                              <option value="Dept04">IT</option>
                              <option value="Dept05">Finance</option>
                          </Input>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="salaryScale">Hệ số lương</Label>
                          <Col>
                          <Input type="text" id="salaryScale" name="salaryScale"
                            className="form-control" 
                            value={this.state.staff.salaryScale}
                            onChange={(event) => this.setState({
                              staff: {...this.state.staff, salaryScale: event.target.value}
                            })}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                          <Col>
                          <Input type="text" id="annualLeave" name="annualLeave"
                            className="form-control" 
                            value={this.state.staff.annualLeave}
                            onChange={(event) => this.setState({
                              staff: {...this.state.staff, annualLeave: event.target.value}
                            })}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                          <Col>
                          <Input type="text" id="overTime" name="overTime"
                            className="form-control" 
                            value={this.state.staff.overTime}
                            onChange={(event) => this.setState({
                              staff: {...this.state.staff, overTime: event.target.value}
                            })}
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Button type="submit" color="primary">Update</Button>
                        </Row>                      
                      </Form>
                    </ModalBody>
                  </Modal>
                </React.Fragment>
        )
    }
}

export default FromUpdate;