import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudent, updateStudent } from '../../redux/actions/studentActions';
import { TextField, Button, Container, Typography, InputAdornment, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EditStudent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const student = useSelector((state) => state.students.currentStudent);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [marks, setMarks] = useState('');

    useEffect(() => {
        dispatch(getStudent(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (student) {
            setName(student.name);
            setSubject(student.subject);
            setMarks(student.marks);
        }
    }, [student]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStudent(id, { name, subject, marks }));
    };

    return (
        <Container>
            {/* <Typography variant="h4" gutterBottom>Edit Student</Typography> */}
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                    <span style={{ margin: '0 8px' }}>|</span>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Subject"
                        fullWidth
                        margin="normal"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MenuBookIcon />
                                    <span style={{ margin: '0 8px' }}>|</span>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Marks"
                        fullWidth
                        margin="normal"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CheckCircleIcon />
                                    <span style={{ margin: '0 8px' }}>|</span>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
            </form>
        </Container>
    );
};

export default EditStudent;
