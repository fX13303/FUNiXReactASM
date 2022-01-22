import React, {Component} from "react";
import {Card,CardImg,CardBody,CardSubtitle,Button,Modal,Col,FormFeedback,Input,ModalHeader,ModalBody,Form,FormGroup,Label} from "reactstrap";
import {Link} from 'react-router-dom';

const RenderStaffItem = ({staff}) => {
    return(
        <Link to={`/staff/${staff.id}`}>
            <Card>
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardBody>
                    <CardSubtitle>{staff.name}</CardSubtitle>
                </CardBody>
            </Card>
        </Link>
    );
};

class StaffList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            doB: '',
            salaryScale: 1,
            startDate: "",
            department: "Sale",
            annualLeave: 0,
            overTime: 0,
            salary: "",
            nameF: "",
            modalOpen: false,
            touched: {
                name: false,
                doB: false,
                startDate: false,
            },
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.timNhanvien = this.timNhanvien.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const StaffID = Math.floor(Math.random()*1000+1);
        const newStaff = {
            id: StaffID,
            name: this.state.name,
            doB: this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate: this.state.startDate,
            department: this.state.department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            salary: this.state.salary,
            image: "/assets/images/alberto.png",
        };
        if ( !this.state.name || !this.state.doB || !this.state.startDate )      
            this.setState({
                touched: { name: true, doB: true, startDate: true }
            })
        else    
            this.props.onAdd(newStaff);
    };
    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    };
    validate(name, doB, startDate) {
        const errors = {
          name: "",
          doB: "",
          startDate: "",
        };
        if (this.state.touched.name && name.length < 1)
            errors.name = "Yêu cầu nhập";
        else if (this.state.touched.name && name.length < 3)
            errors.name = "Yêu cầu nhiều hơn 2 ký tự";
        else if (this.state.touched.name && name.length > 30)
            errors.name = "Yêu cầu ít hơn 30 ký tự";  
        if (this.state.touched.doB && doB.length < 1) 
            errors.doB = "Yêu cầu nhập";
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = "Yêu cầu nhập";
        return errors;
    }
    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen,
        });
    }
    timNhanvien(event) {
        const nameS = event.target.nameS.value;
        event.preventDefault();
        this.setState({ nameF: nameS });
    }
    render() {
        const errors = this.validate(
            this.state.name,
            this.state.doB,
            this.state.startDate
        );
        const staffList = this.props.staffs
            .filter((val) => {
                if (this.state.nameF === "") return val;
                else if (
                    val.name.toLowerCase().includes(this.state.nameF.toLowerCase())
                )
                return val;
                return 0;
            })
            .map((val) => {
                return (
                    <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
                        <RenderStaffItem staff={val} />
                    </div>
                );
            });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 mt-3">
                        <div className="row">
                            <div className="col-10 col-md-10">
                                <h3>Nhân viên</h3>
                            </div>
                            <div className="col-2 col-auto">
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-plus fa-lg"></span>
                            </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                        <form onSubmit={this.timNhanvien} className="form-group row">
                            <div className="col-8 col-md-8">
                                <input type="text" name="nameS" className="form-control" placeholder="Tìm kiếm nhân viên ..."/>
                            </div>
                            <div className="col-4 col-md-4">
                                <button className="btn btn-success" type="submit">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-12">
                    <hr />
                </div>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="name" md={4}>Tên</Label>
                                <Col md={8}>
                                    <Input type="text" id="name" name="name" valid={errors.name === ""} invalid={errors.name !== ""} value={this.state.name} onChange={this.handleInputChange} onBlur={this.handleBlur("name")} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Input type="date" id="doB" name="doB" valid={errors.doB === ""} invalid={errors.doB !== ""} value={this.state.doB} onChange={this.handleInputChange} onBlur={this.handleBlur("doB")} />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Input type="date" id="startDate" name="startDate" valid={errors.startDate === ""} invalid={errors.startDate !== ""} value={this.state.startDate} onChange={this.handleInputChange} onBlur={this.handleBlur("startDate")} />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Input type="select" id="department" name="department" value={this.state.department} onChange={this.handleInputChange}>
                                        <option>Sale</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>IT</option>
                                        <option>Finance</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Input type="text" id="salaryScale" name="salaryScale" placeholder="1.0 -> 3.0" value={this.state.salaryScale} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Input type="text" id="annualLeave" name="annualLeave" value={this.state.annualLeave} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Input type="text" id="overTime" name="overTime" value={this.state.overTime} onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="success">Thêm</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <div className="row shadow mb-5 mt-5">{staffList}</div>
            </div>
        );
    }
}
        
export default StaffList;
