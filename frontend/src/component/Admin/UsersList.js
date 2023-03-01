import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const UsersList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };
  const [sortModel, setSortModel] = React.useState([
    {
      field: "email",
      sort: "asc",
    },
  ]);
  const handleSortChange = (model) => {
    /* if statement to prevent the infinite loop by confirming model is 
     different than the current sortModel state */
    if (JSON.stringify(model) !== JSON.stringify(sortModel)) {
      setSortModel(model);
    }
  };
  const submit = (params) => {
    confirmAlert({
      title: "Delete User",
      message: "Are you sure you want to delete this user",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUserHandler(params.getValue(params.id, "id")),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

  const columns = [
    //{ field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Login ID",
      minWidth: 200,
      flex: 0.1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.1,
    },
    {
      field: "district",
      headerName: "District",
      minWidth: 150,
      flex: 0.1,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.1,
      cellClassName: (params) => {
        return (
          (params.getValue(params.id, "role") === "admin"
            ? "greenColor"
            : "") ||
          (params.getValue(params.id, "role") === "user" ? "redColor" : "") ||
          (params.getValue(params.id, "role") === "volunteer"
            ? "blueColor"
            : "")
        );
      },
    },

    {
      field: "actions",
      flex: 0.1,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              {/* <EditIcon /> */}
              <span>Edit</span>
            </Link>

            <Button onClick={() => submit(params)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
        district: item.district,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        {/* <SideBar /> */}
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            sortModel={sortModel}
            onSortModelChange={(model) => handleSortChange(model)}
            rows={rows}
            columns={columns}
            pageSize={15}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
