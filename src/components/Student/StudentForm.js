import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Box } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../../redux/actions/studentActions';

const StudentForm = ({ open, student, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: '', subject: '', marks: '' });

    useEffect(() => {
        if (student) {
            setFormData(student);
        } else {
            setFormData({ name: '', subject: '', marks: '' });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        if (student) {
            dispatch(updateStudent(formData));
        } else {
            dispatch(addStudent(formData));
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogContent>
                <Box mb={1.5}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineOutlinedIcon />
                                    <span style={{ margin: '0 6px' }}>|</span>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        size="small"
                    />
                </Box>
                <Box mb={1.5}>
                    <TextField
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SubjectOutlinedIcon />
                                    <span style={{ margin: '0 6px' }}>|</span>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        size="small"
                    />
                </Box>
                <Box mb={1.5}>
                    <TextField
                        label="Marks"
                        name="marks"
                        type="number"
                        value={formData.marks}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <BookmarkBorderOutlinedIcon />
                                    <span style={{ margin: '0 6px' }}>|</span>
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                        size="small"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StudentForm;
