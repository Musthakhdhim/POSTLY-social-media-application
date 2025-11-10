import { useFormik } from "formik"
import * as Yup from "yup"
// import { Form, Button, Row, Col } from "react-bootstrap";
import {Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/Auth/Action";


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string().required("Password is required")
})

const currentYear=new Date().getFullYear();
const years=Array.from({length:100},(_,i)=>currentYear-i)
const days=Array.from({length:31},(_,i)=>i+1)
const months =[
    {value:1, label:"January"},
    {value:2, label:"February"},
    {value:3, label:"March"},
    {value:4, label:"April"},
    {value:5, label:"May"},
    {value:6, label:"June"},
    {value:7, label:"July"},
    {value:8, label:"August"},
    {value:9, label:"Septemner"},
    {value:10, label:"October"},
    {value:11, label:"November"},
    {value:12, label:"December"}

]

export default function SignupForm() {


    const dispatch=useDispatch()

    const formik = useFormik({
        initialValues: {
            username:"",
            email: "",
            password: "",
            dateOfBirth:{
                day:"",
                month:"",
                year:""
            }
        },
        validationSchema,
        onSubmit: (values) => {
            const {day, month, year}=values.dateOfBirth
            const dateOfBirth=`${year}-${month}-${day}`
            values.dateOfBirth=dateOfBirth

            dispatch(registerUser(values))

            console.log("form values", values)
        }
    })

    const handleDateChange=(name)=>(event)=>{
        formik.setFieldValue("dateOfBirth", {
            ...formik.values.dateOfBirth,
            [name]:event.target.value
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField className=""
                        fullWidth
                        label="Username"
                        name="username"
                        variant="outlined"
                        size="large"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField className=""
                        fullWidth
                        label="Email"
                        name="email"
                        variant="outlined"
                        size="large"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField className=""
                        fullWidth
                        label="Password"
                        name="password"
                        variant="outlined"
                        size="large"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Grid>

                <Grid item xs={4}>
                    <InputLabel>Date</InputLabel>
                    <Select name="day" onChange={handleDateChange("day")} 
                    fullWidth
                    onBlur={formik.handleBlur} value={formik.values.dateOfBirth.day}>
                        {days.map((day)=><MenuItem key={day} value={day}>{day}</MenuItem>)}
                    </Select>
                </Grid>

                <Grid item xs={4}>
                    <InputLabel>Month</InputLabel>
                    <Select name="month" onChange={handleDateChange("month")} 
                    fullWidth
                    onBlur={formik.handleBlur} value={formik.values.dateOfBirth.month}>
                        {months.map((month)=><MenuItem key={month} value={month.value}>{month.label}</MenuItem>)}
                    </Select>
                </Grid>

                <Grid item xs={4}>
                    <InputLabel>Year</InputLabel>
                    <Select name="year" onChange={handleDateChange("year")} 
                    fullWidth
                    onBlur={formik.handleBlur} value={formik.values.dateOfBirth.year}>
                        {years.map((year)=><MenuItem key={year} value={year}>{year}</MenuItem>)}
                    </Select>
                </Grid>

                <Grid item xs={12} className="mt-20">
                    <Button
                        size="large"
                        sx={{ borderRadius: "29px", py: "15px", bgcolor: "green[500]" }}
                        type="submit" fullWidth variant="contained"
                    >signup</Button>
                </Grid>
            </Grid>
        </form>
    )
}