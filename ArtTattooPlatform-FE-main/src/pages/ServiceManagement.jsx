import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Breadcrumbs,
  Button,
  Container,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Home } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useUserInfo } from "../stores/useUserInfo";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function ServiceManagement() {
  const user = useUserInfo((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role != "MN" && user.role != "AD") navigate("/access-denied");
    return;
  }, []);

  //Api
  const [studio, setStudio] = useState(null);
  const [studioService, setServiceData] = useState([]);

  useEffect(() => {
    getStudio();
    getServiceByStudioId();
  }, []);

  const getStudio = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Studio/GetStudioByManager/${user.userID}`
      );
      const studioData = response.data.studio;

      if (studioData) {
        // Set the studioId in the newServiceData
        setNewServiceData((prevData) => ({
          ...prevData,
          StudioID: studioData.studioId,
        }));

        setStudio(studioData);
        getServiceByStudioId(studioData.studioId);
      }
    } catch (error) {
      console.error("Error getting studio:", error);
    }
  };

  const getServiceByStudioId = async (studioId) => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Service/GetServiceByStudio/${studioId}`
      );
      setServiceData(response.data.$values);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Add dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [addSuccessDialog, setAddSuccessDialog] = useState(false);

  const handleAddSuccessClose = () => {
    setAddSuccessDialog(false);
  };

  const [newServiceData, setNewServiceData] = useState({
    ServiceName: "",
    Description: "",
    StudioID: studio?.studioId || null,
    Price: 0,
    Image: "",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNewServiceDataChange = (field, value) => {
    setNewServiceData((prevData) => ({ ...prevData, [field]: value }));
  };

  const addService = async () => {
    try {
      console.log("New Service Data:", newServiceData);

      // Validate that all necessary fields are filled
      if (
        !newServiceData.ServiceName ||
        !newServiceData.Image ||
        !newServiceData.Description ||
        !newServiceData.Price
      ) {
        console.error("All fields are required.");
        return;
      }

      // Validate data types
      if (
        typeof newServiceData.ServiceName !== "string" ||
        typeof newServiceData.Image !== "string" ||
        typeof newServiceData.Description !== "string" ||
        isNaN(newServiceData.Price)
      ) {
        console.error(
          "Invalid data types. Check the data types for each field."
        );
        console.log("Data types:", {
          ServiceName: typeof newServiceData.ServiceName,
          Image: typeof newServiceData.Image,
          Description: typeof newServiceData.Description,
          Price: typeof newServiceData.Price,
        });
        return;
      }

      // Ensure that StudioID is properly set
      const studioId = studio?.studioId;
      if (!studioId) {
        console.error("Unable to obtain StudioID.");
        return;
      }

      const payload = {
        ServiceName: newServiceData.ServiceName,
        Description: newServiceData.Description,
        StudioID: parseInt(newServiceData.StudioID), // Parse as an integer
        Price: parseFloat(newServiceData.Price),
        Image: newServiceData.Image,
      };

      console.log("Request Payload:", payload);

      const token = localStorage.getItem("token");

      // Use axios.post with try/catch for error handling
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/Service/Add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response status is 201 (Created)
      const addedService = response.data;
      setServiceData((prevData) => [...prevData, addedService]);

      // Reset the input fields and close the dialog
      // After successfully adding the service, show success message
      setAddSuccessDialog(true);

      // Reset the input fields and close the dialog
      setNewServiceData({
        ServiceName: "",
        Description: "",
        StudioID: studio?.studioId || null,
        Price: 0,
        Image: "",
      });
      handleCloseDialog();
    } catch (error) {
      console.error("Error adding service:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received. Request details:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    }
  };

  //Edit service
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editServiceId, setEditServiceId] = useState("");
  const [editServiceName, setEditServiceName] = useState("");
  const [editImageService, setEditImageService] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [updateSuccessDialog, setUpdateSuccessDialog] = useState(false);

  const handleEditClick = (service) => {
    setEditServiceId(service.serviceId);
    setEditServiceName(service.serviceName);
    setEditImageService(service.imageService);
    setEditDescription(service.description);
    setEditPrice(service.price);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setUpdateSuccessDialog(false); // Reset the success message
    setOpenEditDialog(false);
  };
  const handleUpdateSuccessClose = () => {
    setUpdateSuccessDialog(false);
  };
  const updateService = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        StudioID: studio?.studioId,
        ServiceName: editServiceName,
        Description: editDescription,
        Price: parseFloat(editPrice),
        Image: editImageService,
      };

      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/Service/UpdateService/${editServiceId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const updatedService = response.data;
        setServiceData((prevData) =>
          prevData.map((service) =>
            service.serviceId === editServiceId ? updatedService : service
          )
        );
        setUpdateSuccessDialog(true);

        setEditServiceId("");
        setEditServiceName("");
        setEditImageService("");
        setEditDescription("");
        setEditPrice("");
        handleEditDialogClose();
      } else {
        throw new Error(
          `Update service failed. Unexpected response status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error updating service:", error);
      handleRequestError(error);
    }
  };

  //Delete service
  const deleteService = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");

      // Make an API call to delete the service
      await axios.delete(
        `${import.meta.env.VITE_REACT_APP_API_URL}/Service/Delete/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the deleted service from the state
      setServiceData((prevData) =>
        prevData.filter((service) => service.serviceId !== serviceId)
      );

      // Close the edit/delete dialog
      handleEditDialogClose();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false);

  return (
    <Container className="mt-5 mb-5">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 5 }}>
        <Stack
          spacing={1}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Home fontSize="inherit" />
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              "&:hover": {
                color: "#FF7F22",
              },
            }}
          >
            Home
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ textDecoration: "none" }}>
          Service Management
        </Typography>
      </Breadcrumbs>
      <Typography variant="h5" className="mb-3">
        Service Dashboard
      </Typography>
      <TableContainer
        component={Paper}
        style={{ maxHeight: 700, overflowY: "auto", height: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  sx={{ border: 2 }}
                  onClick={handleOpenDialog}
                >
                  Add
                </Button>
              </TableCell>
              <TableCell>serviceId</TableCell>
              <TableCell>serviceName</TableCell>
              <TableCell align="left">price</TableCell>
              <TableCell align="left">description</TableCell>
              <TableCell align="left">imageService</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studioService.map((service) => (
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell component="th" scope="row">
                  <Button onClick={() => handleEditClick(service)}>Edit</Button>
                </TableCell>
                <TableCell component="th" scope="row">
                  {service.serviceId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {service.serviceName}
                </TableCell>
                <TableCell align="left">{service.price}</TableCell>
                <TableCell
                  align="left"
                  className="ellipsis"
                  sx={{ maxWidth: "200px" }}
                >
                  {service.description}
                </TableCell>
                <TableCell
                  align="left"
                  className="ellipsis"
                  sx={{ maxWidth: "200px" }}
                >
                  <img
                    src={service.imageService}
                    alt="Service Image"
                    style={{ width: "100px", height: "60px" }}
                  ></img>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* add */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a New Service</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              sx={{ minWidth: "300px" }}
              fullWidth
              label="Service Name"
              value={newServiceData.ServiceName}
              onChange={(e) =>
                handleNewServiceDataChange("ServiceName", e.target.value)
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              sx={{ minWidth: "300px" }}
              fullWidth
              label="Image"
              value={newServiceData.Image}
              onChange={(e) =>
                handleNewServiceDataChange("Image", e.target.value)
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              sx={{ minWidth: "300px" }}
              fullWidth
              label="Description"
              value={newServiceData.Description}
              onChange={(e) =>
                handleNewServiceDataChange("Description", e.target.value)
              }
              margin="normal"
              variant="outlined"
            />
            <TextField
              sx={{ minWidth: "300px" }}
              fullWidth
              label="Price"
              value={newServiceData.Price}
              onChange={(e) =>
                handleNewServiceDataChange("Price", e.target.value)
              }
              margin="normal"
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={addService} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={addSuccessDialog} onClose={handleAddSuccessClose}>
        <DialogTitle>Add Success</DialogTitle>
        <DialogContent>The service has been added successfully.</DialogContent>
        <DialogActions>
          <Button onClick={handleAddSuccessClose}>OK</Button>
        </DialogActions>
      </Dialog>
      {/* edit */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              fullWidth
              label="Service Name"
              value={editServiceName}
              onChange={(e) => setEditServiceName(e.target.value)}
              margin="normal"
              variant="outlined"
              sx={{ minWidth: "300px" }}
            />
            <TextField
              fullWidth
              label="Image"
              value={editImageService}
              onChange={(e) => setEditImageService(e.target.value)}
              margin="normal"
              variant="outlined"
              sx={{ minWidth: "300px" }}
            />
            <TextField
              fullWidth
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              margin="normal"
              variant="outlined"
              sx={{ minWidth: "300px" }}
            />
            <TextField
              fullWidth
              label="Price"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              margin="normal"
              variant="outlined"
              sx={{ minWidth: "300px" }}
            />
            {/* ... other input fields ... */}
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={updateService} variant="contained">
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setConfirmDeleteDialog(true)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateSuccessDialog} onClose={handleUpdateSuccessClose}>
        <DialogTitle>Update Success</DialogTitle>
        <DialogContent>
          The service has been updated successfully.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateSuccessClose}>OK</Button>
        </DialogActions>
      </Dialog>

      {/* Delete */}
      <Dialog
        open={confirmDeleteDialog}
        onClose={() => setConfirmDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this service?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteDialog(false)}>No</Button>
          <Button
            onClick={() => {
              setConfirmDeleteDialog(false);
              deleteService(editServiceId);
              setDeleteSuccessDialog(true);
            }}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteSuccessDialog}
        onClose={() => setDeleteSuccessDialog(false)}
      >
        <DialogTitle>Delete Success</DialogTitle>
        <DialogContent>
          The service has been deleted successfully.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteSuccessDialog(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
