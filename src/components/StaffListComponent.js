import React, { Component } from 'react';
import { Card, CardImg, CardTitle, Button, Modal, ModalHeader, ModalBody, Label, Col, Row, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

    const RenderStaffList = ({staff, onDeleteStaff}) => {
        return(
          <FadeTransform in
            transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
              <Link to={`/stafflist/${staff.id}`}>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle heading className="align-center">{staff.name}</CardTitle>
              </Link>
                <Button type="submit" color="danger" onClick={() => onDeleteStaff(staff.id)}>Delete</Button>
            </Card>
          </FadeTransform>
        );
    }

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class StaffList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      doB: '',
      startDate: '',
      othername: '',
      departmentId: "Dept01",
      isModalOpen: false,
      touched: {
        name: false,
        doB: false,
        startDate: false
      }
    }

      this.handleChange = this.handleChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Tắt mở Modal
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  // Xử lý event onChange
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // Xử  lý event onBlur
  handleBlur = (field) => (evt) => {  
    this.setState({
      touched: {...this.state.touched, [field]: true}
    });
  }

  // Xử lý khi click vào button Tìm thì sẽ gọi đến hàm này
  handleSearch(event) {  
    const valueInput = this.othername.value;
    this.setState({
      othername: valueInput
    });
    event.preventDefault();
  }

  // Xử lý khi click vào button Thêm thì sẽ gọi đến hàm này
  handleSubmit = (values) => {
      this.toggleModal();
    const newStaff = {
      // id: Math.floor(Math.random() * 1000 + 1),
      name: values.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      salaryScale: parseFloat(values.salaryScale),
      departmentId: values.departmentId,
      annualLeave: parseFloat(values.annualLeave),
      overTime: parseFloat(values.overTime),
      image: '/asset/images/alberto.png'
    };
    this.props.onAddStaff(newStaff);
  }
  
  // Xử lý khi nhập chưa đủ độ dài vào input
  validate(doB, startDate) {
    const errors = {
      doB: '',
      startDate: ''
    }

      if (this.state.touched.doB && doB.length < 1)
      errors.doB = 'Yêu cầu nhập';

      if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = 'Yêu cầu nhập';

      return errors;
  }

    render() {

      const errors = this.validate(this.state.doB, this.state.startDate);

        const stafflist = this.props.staffs.staffs
        .filter((checkname) => {
          if (this.state.othername === "") return checkname;
          else if (checkname.name.toLowerCase().includes(this.state.othername.toLowerCase())) return checkname;
          return 0;
        })
        .map((staff) => {
            return (
              <div key={staff.id} className="col-sm-6 col-md-4 col-lg-2">
                <RenderStaffList staff={staff} onDeleteStaff={this.props.onDeleteStaff} />
              </div>
            );
        });

        if (this.props.staffs.isLoading) {
          return(
              <div className="container">
                  <div className="row">
                      <Loading />
                  </div>
              </div>
          );
        }
        else if (this.props.staffs.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.staffs.errMess}</h4>
                    </div>
                </div>
            );
        }
        else 
          return(
            <div className="container">
                <div className="row">
                  <div className="col-9 col-md-3 col-lg-3">
                    <h3>Nhân Viên</h3>
                  </div>
                  <div className="col-3 col-md-3 col-lg-3 mt-1">
                    <Button onClick={this.toggleModal}>
                      <span className="fa fa-user-plus fa-lg"></span>
                    </Button>
                  </div>

                  {/* Chức năng tìm kiếm nhân viên */}
                  <Form onSubmit={this.handleSearch} className="col-12 col-md-6 col-lg-6">
                    <FormGroup className="row">
                      <div className="col-9 col-md-9 col-lg-9 mt-1">
                        <Input
                          type="text"
                          name="othername"
                          innerRef={(input) => this.othername = input}
                          />
                      </div>
                      <div className="col-3 col-md-3 col-lg-3 mt-1">
                        <Button type="submit">Tìm</Button>
                      </div>
                    </FormGroup>
                  </Form>

                  {/* ModalBox và Chức năng thêm nhân viên */}
                  <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm Nhân Viên</ModalHeader>
                    <ModalBody>
                      <LocalForm onSubmit={(values) => this.handleSubmit (values)}>
                        <Row className="form-group">
                          <Label htmlFor="name">Tên</Label>
                          <Col>
                          <Control.text model=".name" id="name" name="name"
                            className="form-control"
                            validators={{
                              required, minLength: minLength(3), maxLength: maxLength(30)
                            }}
                            />
                          <Errors
                          className="text-danger"
                          model=".name"
                          show="touched"
                          messages={{
                            required: 'Yêu cầu nhập',
                            minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                            maxLength: 'Yêu cầu ít hơn 30 ký tự'
                          }}
                          />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="doB">Ngày sinh</Label>
                          <Col>
                          <Input type="date" id="doB" name="doB"
                            className="form-control"
                            valid={errors.doB === ''}
                            invalid={errors.doB !== ''}
                            value={this.state.doB}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur('doB')}
                            />
                          <FormFeedback>{errors.doB}</FormFeedback>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="startDate">Ngày vào công ty</Label>
                          <Col>
                          <Input type="date" id="startDate" name="startDate"
                            className="form-control"
                            valid={errors.startDate === ''}
                            invalid={errors.startDate !== ''}
                            value={this.state.startDate}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur('startDate')}
                            />
                          <FormFeedback>{errors.startDate}</FormFeedback>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="departmentId">Phòng ban</Label>
                          <Col>
                          <Control.select model=".departmentId" id="departmentId" name="departmentId"
                            className="form-control"
                            defaultValue="Sale"
                            >
                              <option value="Dept01">Sale</option>
                              <option value="Dept02">HR</option>
                              <option value="Dept03">Marketing</option>
                              <option value="Dept04">IT</option>
                              <option value="Dept05">Finance</option>
                          </Control.select>
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="salaryScale">Hệ số lương</Label>
                          <Col>
                          <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                            className="form-control"                        />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                          <Col>
                          <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                            className="form-control"
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Label htmlFor="overTime">Số ngày đã làm thêm</Label>
                          <Col>
                          <Control.text model=".overTime" id="overTime" name="overTime"
                            className="form-control"
                            />
                          </Col>
                        </Row>
                        <Row className="form-group">
                          <Button type="submit" color="primary">Thêm</Button>
                        </Row>                                       
                      </LocalForm>
                    </ModalBody>
                  </Modal>
                </div>

              <div className="row">
                {stafflist}
              </div>
            </div>

            );
      }
    }
    

export default StaffList;