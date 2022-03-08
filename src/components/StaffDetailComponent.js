import React from "react";
import { CardText, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import FormUpdate from './FormUpdateComponent';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderStaff({staff, department}) {
    // console.log(staff.departmentId);
    if (staff != null && department != null) {
    return(
        <div className="col-12">
            <FadeTransform in
                transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3">
                        <CardImg width="100%" src={staff.image} alt={staff.name} />
                    </div>
                    <div className="col-12 col-md-8 col-lg-9">
                        <CardTitle heading>Họ và tên: {staff.name}</CardTitle>
                        <CardText>Mã số nhân viên: {staff.id}</CardText>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Phòng ban: {department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </div>
                </div>
            </FadeTransform>
        </div>
    );
        }
}

const StaffDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.staff != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/stafflist">Nhân Viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.staff.name}</h3>
                        <hr />
                    </div>                    
                </div>
                <div className="row">
                    <RenderStaff
                    staff={props.staff}
                    department={props.department.filter((dept) => dept.id === props.staff.departmentId)[0]} />
                    <FormUpdate onUpdate={props.onUpdateStaff} staff={props.staff} />
                </div>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}


export default StaffDetail;