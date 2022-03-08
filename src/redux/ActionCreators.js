import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

    // Thêm Nhân Viên (addStaff)
export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
});

export const postStaff = (staff) => (dispatch) => {

    return fetch(baseUrl + "staffs", {
        method: "POST",
        body: JSON.stringify(staff),
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "same-origin",
    })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addStaff(response)))
    .catch(error => {
      console.log("Post staffs", error.message);
      alert("Your staff could not be posted\nError: " + error.message);
    });
}

    // Xóa Nhân Viên (Del staff)
export const delStaff = (id) => ({
    type: ActionTypes.DEL_STAFF,
    payload: id
});

export const deleteStaff = (id) => (dispatch) => {
  return fetch(baseUrl + `staffs/${id}`, {
    method: "DELETE",
  }).then(() => dispatch(delStaff(id)));
};

    // Cập nhật nhân viên ( Update staff )
export const updateStaff = (staff) => ({
    type: ActionTypes.UPDATE_STAFF,
    payload: staff
});

export const patchStaff = (staff) => (dispatch) => {

    return fetch(baseUrl + "staffs", {
        method: "PATCH",
        body: JSON.stringify(staff),
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "same-origin",
    })
    .then(
      (response) => {
        if (response.ok) {
            console.log('RESPONSE ' + JSON.stringify(response));
          return response;
        } else {
          var error = new Error("Error " + response.status + ": " + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(updateStaff(response)))
    .catch(error => {
      console.log("Patch staffs", error.message);
      alert("Your staff could not be patch\nError: " + error.message);
    });
}

    // Nhân Viên (staffs)
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)))
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

    // Phòng Ban (departments)
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentsLoading(true));

    return fetch(baseUrl + 'departments')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(departments => dispatch(addDepartments(departments)))
    .catch(error => dispatch(departmentsFailed(error.message)))
}

export const departmentsLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING
});

export const departmentsFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
});

export const addDepartments = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});

    // Bảng Lương ( staffsSalary)
export const fetchStaffsSalary = () => (dispatch) => {
    dispatch(staffsSalaryLoading(true));

    return fetch(baseUrl + 'staffsSalary')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(staffsSalary => dispatch(addStaffsSalary(staffsSalary)))
    .catch(error => dispatch(staffsSalaryFailed(error.message)))
}

export const staffsSalaryLoading = () => ({
    type: ActionTypes.STAFFSSALARY_LOADING
});

export const staffsSalaryFailed = (errmess) => ({
    type: ActionTypes.STAFFSSALARY_FAILED,
    payload: errmess
});

export const addStaffsSalary = (staffsSalary) => ({
    type: ActionTypes.ADD_STAFFSSALARY,
    payload: staffsSalary
});