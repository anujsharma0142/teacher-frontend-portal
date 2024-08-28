import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentCard = ({ student }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{student.name}</Typography>
                <Typography>Subject: {student.subject}</Typography>
                <Typography>Marks: {student.marks}</Typography>
                <Button component={Link} to={`/students/edit/${student.id}`} variant="contained" color="primary">
                    Edit
                </Button>
                <Button variant="contained" color="secondary">
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default StudentCard;
