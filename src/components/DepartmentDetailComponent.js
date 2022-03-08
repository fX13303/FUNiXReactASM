import React from "react";
import { CardText, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderStaffItem({staff, department}) {
    console.log(staff);
    // console.log(dept.name);
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

const DepartmentDetail = (props) => {
    const staffs = props.staff.map((value) => (
      <RenderStaffItem 
        key={value.id}
        staff={value}
        department={props.department}
        />
  ));
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
    else if (props.staff != null && props.department != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/department">Phòng Ban</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.department.name}</h3>
                        <hr />
                    </div>                    
                </div>
                {/* <div className="row"> */}
                    {staffs}
                {/* </div> */}
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}


// const DepartmentDetail = (props) => {
//   const staffs = props.staff.map((val) => (
//     <div className="col-6 col-md-4 col-lg-2 mt-3 mb-3" key={val.id}>
//       <RenderStaffItem staff={val} />
//     </div>
//   ));

//   if (props.staff != null && props.department != null) {
//     return (
//       <div className="container">
//         <div className="row">
//           <Breadcrumb>
//             <BreadcrumbItem>
//               <Link to="/department">Phòng ban</Link>
//             </BreadcrumbItem>
//             <BreadcrumbItem active>{props.department.name}</BreadcrumbItem>
//           </Breadcrumb>
//           <div className="col-12">
//             <h3>{props.department.name}</h3>
//             <hr />
//           </div>
//         </div>
//         <div className="row mb-3">{staffs}</div>
//       </div>
//     );
//   } else {
//     return <div></div>;
//   }
// };

export default DepartmentDetail;