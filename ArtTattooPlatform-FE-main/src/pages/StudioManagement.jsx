import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Card, Container, Dialog, DialogContent, DialogTitle, Rating, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../stores/useUserInfo';

export default function StudioManagement() {
    const user = useUserInfo((state) => state.user);
    const navigate = useNavigate();
    const [studio, setStudio] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedStudio, setEditedStudio] = useState({
        studioId: null,
        studioName: null,
        logo: null,
        studioEmail: null,
        studioPhone: null,
        address: null,
        description: null,
        ManagerID: null,
    });

    useEffect(() => {
        if (user.role !== 'MN' && user.role !== 'AD') navigate('/access-denied');
    }, [user.role, navigate]);

    useEffect(() => {
        getStudio();
    }, []);

    const getStudio = async () => {
        try {
            const response = await axios.get(
                import.meta.env.VITE_REACT_APP_API_URL + `/Studio/GetStudioByManager/${user.userID}`
            );
            const studioData = response.data.studio;

            if (studioData) {
                setStudio(studioData);
            }
        } catch (error) {
            console.error('Error fetching studio data:', error);
        }
    };

    const handleEditDialogOpen = () => {
        if (
            studio &&
            studio.studioId !== null &&
            studio.studioName !== null &&
            studio.studioEmail !== null &&
            studio.studioPhone !== null &&
            studio.address !== null &&
            studio.description !== null &&
            studio.ManagerID !== null &&
            typeof studio.logo === 'string'
        ) {
            setEditedStudio({
                studioId: studio.studioId,
                studioName: studio.studioName,
                logo: studio.logo,
                studioEmail: studio.studioEmail,
                studioPhone: studio.studioPhone,
                address: studio.address,
                description: studio.description,
                ManagerID: studio.ManagerID,
            });
            setEditDialogOpen(true);
        } else {
            console.error('Error opening edit dialog: Missing or incomplete studio data');
        }
    };

    const handleFormChange = (event) => {
        setEditedStudio({
            ...editedStudio,
            [event.target.name]: event.target.value,
        });
    };

    const handleEditDialogClose = () => {
        setEditDialogOpen(false);
    };

    const handleEditSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
    
            const payload = {
                StudioID: parseInt(editedStudio.studioId),
                StudioName: editedStudio.studioName,
                Description: editedStudio.description,
                Logo: editedStudio.logo,  // Assuming this is already base64-encoded binary data
                StudioEmail: editedStudio.studioEmail,
                StudioPhone: editedStudio.studioPhone,
                Address: editedStudio.address,
                ManagerID: parseInt(editedStudio.ManagerID),
            };
    
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_API_URL}/Studio/UpdateStudio/${editedStudio.studioId}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            if (response.status === 200) {
                const updatedStudio = response.data;
                setStudio(updatedStudio);
                handleEditDialogClose();
            } else {
                console.error(`Update studio failed. Unexpected response status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating studio:', error);
        }
    };
    

    return (
        <Container className='mt-5'>
            <Typography variant="h5" className="mb-3">
                Studio Information
            </Typography>
            <div className='mb-5'>
                <Card sx={{ border: '2px solid #322F2F', borderRadius: 1 }}>
                    <Stack
                        spacing={2}
                        direction='column'
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Avatar
                            sx={{ width: 100, height: 100, borderColor: 'white' }}
                            className='mt-5 mb-4'
                            src={studio.logo}
                        />

                        <Typography
                            gutterBottom
                            variant='h5'
                            component='div'
                            sx={{ textAlign: 'center' }}
                            className='mb-1'
                        >
                            {studio.studioName}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='h6'
                            sx={{ textAlign: 'center' }}
                            className='mb-1'
                        >
                            {studio.description}
                        </Typography>
                        <Rating
                            name='size-small'
                            value={Number(studio.ratingStb)}
                            size='small'
                            readOnly
                        />
                        <Typography
                            gutterBottom
                            variant='h7'
                            component='div'
                            sx={{ textAlign: 'center' }}
                            className='mb-1'
                        >
                            {studio.studioEmail}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='h7'
                            component='div'
                            sx={{ textAlign: 'center' }}
                            className='mb-1'
                        >
                            {studio.studioPhone}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant='h7'
                            component='div'
                            sx={{ textAlign: 'center' }}
                            className='mb-5'
                        >
                            {studio.address}
                        </Typography>
                    </Stack>
                </Card>
                <Button variant='outlined' sx={{ textAlign: 'center', marginTop: 2 }} onClick={handleEditDialogOpen}>
                    Edit Studio
                </Button>
            </div>
            <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Studio Information</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            label='Studio Name'
                            name='studioName'
                            value={editedStudio.studioName}
                            onChange={handleFormChange}
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Logo'
                            name='logo'
                            value={editedStudio.logo}
                            onChange={handleFormChange}
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Studio Email'
                            name='studioEmail'
                            value={editedStudio.studioEmail}
                            onChange={handleFormChange}
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Studio Phone'
                            name='studioPhone'
                            value={editedStudio.studioPhone}
                            onChange={handleFormChange}
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Studio Address'
                            name='address'
                            value={editedStudio.address}
                            onChange={handleFormChange}
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            label='Description'
                            name='description'
                            value={editedStudio.description}
                            onChange={handleFormChange}
                            fullWidth
                            multiline
                            rows={4}
                            margin='normal'
                        />
                        <Button variant='contained' color='primary' onClick={handleEditSubmit}>
                            Save Changes
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
}
