import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, deleteStudent, updateStudent } from '../../redux/actions/studentActions';
import { Button, Container, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Menu, MenuItem, CircularProgress, Avatar, Box, InputAdornment } from '@mui/material';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Layout from '../Layout/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import StudentForm from './StudentForm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    table: {
        margin: '0 auto',
        border: 'none',
    },
    tableHead: {
        '& th': {
            color:'grey',
            position: 'relative',
            borderRight: 'none',
            '&::after': {
                content: '""',
                position: 'absolute',
                top: '60%',
                left: '0',
                width: '100%',
                height: '60%',
                borderRight: '2px solid #d3d3d3',
                transform: 'translateY(-60%)',
            },
        },
        '& th:last-child::after': {
            borderRight: 'none',
        },
    },
    formField: {
        marginBottom: theme.spacing(2),
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
    },
    avatar: {
        backgroundColor: '#62c1e5',
        color: '#fff',
        width: 40,
        height: 40,
        marginRight: theme.spacing(2),
    },
}));

const StudentList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const students = useSelector(state => state.students.students);
    const [open, setOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [studentData, setStudentData] = useState({ name: '', subject: '', marks: '', studentId: '' });
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true); // Set loading to true when starting to fetch data
            await dispatch(getStudents());
            setLoading(false); // Set loading to false when data is fetched
        };
        fetchStudents();
    }, [dispatch]);

    const handleEditClick = (student) => {
        setEditingStudent(student);
        setStudentData({ name: student.name, subject: student.subject, marks: student.marks, studentId: student.studentId });
        setOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteStudent(id));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        dispatch(updateStudent(studentData.studentId, studentData));
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prevData => ({ ...prevData, [name]: value }));
    };

    // Dropdown menu related states and handlers
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuStudent, setMenuStudent] = useState(null);

    const handleMenuClick = (event, student) => {
        setAnchorEl(event.currentTarget);
        setMenuStudent(student);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setMenuStudent(null);
    };

    const handleMenuEdit = () => {
        handleEditClick(menuStudent);
        handleMenuClose();
    };

    const handleMenuDelete = () => {
        handleDelete(menuStudent.studentId);
        handleMenuClose();
    };

    // form popover related function
    const [formOpen, setFormOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleOpenForm = () => {
        setFormOpen(true);
        setSelectedStudent(null);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setSelectedStudent(null);
    };

    if (loading) {
        return (
            <Container className={classes.loaderContainer}>
                <CircularProgress />
            </Container>
        );
    }

    if (!students || students.length === 0) {
        return (
            <Container className={classes.root}>
                <Typography variant="h4">Student List</Typography>
                <Typography variant="h6">No students available</Typography>
            </Container>
        );
    }

    return (
        <>
            <Layout />
            <Container className={classes.root}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead className={classes.tableHead}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Subject</TableCell>
                                <TableCell>Marks</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.studentId}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <Avatar className={classes.avatar}>
                                                {student.name[0].toUpperCase()}
                                            </Avatar>
                                            {student.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{student.subject}</TableCell>
                                    <TableCell>{student.marks}</TableCell>
                                    <TableCell>
                                        <ArrowDropDownCircleOutlinedIcon onClick={(event) => handleMenuClick(event, student)} />
                                        
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <MenuItem onClick={handleMenuEdit}>Edit</MenuItem>
                                            <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={handleOpenForm}>
                    Add Student
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <Box mb={2}>
                            <TextField
                                label="Name"
                                name="name"
                                value={studentData.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
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
                                name="subject"
                                value={studentData.subject}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
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
                                name="marks"
                                type="number"
                                value={studentData.marks}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <StudentForm open={formOpen} student={selectedStudent} onClose={handleCloseForm} />
            </Container>
        </>
    );
};

export default StudentList;
