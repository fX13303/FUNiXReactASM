import React from "react";
import { Card, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const basicSalary = 3000000;
const overTimeSalary = 200000;

function Salary(props) {

    const salaries = props.staffs.staffs.map((staff) => {
        const salary = (parseFloat(staff.salaryScale) * basicSalary) + (parseFloat(staff.overTime) * overTimeSalary);
        return(
            <Card key={staff.id} className="col-12 col-md-6 col-lg-4 border">
                <CardBody>
                    <h2>{staff.name}</h2>
                    <CardText>Mã nhân viên: {staff.id}</CardText>
                    <CardText>Hệ số lương: {staff.salaryScale}</CardText>
                    <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <CardText>Lương: {salary.toFixed(0)}</CardText>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </CardBody>
            </Card>
        );
    });
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/stafflist">Nhân Viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {salaries}
            </div>
        </div>
    );
}

export default Salary;