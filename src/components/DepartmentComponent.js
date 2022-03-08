import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function Department(props) {

    const jobs = props.departments.departments.map((job) => {
            return(
                <div className="col-12 col-md-6 col-lg-4 border">
                    <Link to={`/department/${job.id}`}>
                        <h1>{job.name}</h1>
                        <p>Số lượng nhân viên: {job.numberOfStaff}</p>
                    </Link>
                </div>
            );
    });
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/stafflist">Nhân Viên</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
                {jobs}
            </div>
        </div>
    );
}

export default Department;