import { useFormik } from "formik"
import * as Yup from "yup"
// import { Form, Button, Row, Col } from "react-bootstrap";
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerUser } from "../store/Auth/Action";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("email is required"),
    password: Yup.string().required("Password is required")
})

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "Septemner" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" }

]

export default function SignupForm({ handleCloseAuthModal }) {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const formik = useFormik({
    //     initialValues: {
    //         username: "",
    //         email: "",
    //         password: "",
    //         dateOfBirth: {
    //             day: "",
    //             month: "",
    //             year: ""
    //         }
    //     },
    //     validationSchema,
    //     onSubmit: (values) => {
    //         const { day, month, year } = values.dateOfBirth
    //         const dateOfBirth = `${year}-${month}-${day}`
    //         values.dateOfBirth = dateOfBirth

    //         try {
    //             dispatch(registerUser(values)); // Ensure this returns a promise
    //             handleCloseAuthModal(); // ✅ Close modal
    //             navigate("/verify", { state: { email: values.email } }); // ✅ Redirect
    //         } catch (error) {
    //             console.error("Signup failed", error);
    //         }
    //         console.log("form values", values)
    //     }
    // })

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            dateOfBirth: { day: "", month: "", year: "" }
        },
        validationSchema,
        onSubmit: async (values) => { // ✅ Make it async
            const { day, month, year } = values.dateOfBirth;
            const dateOfBirth = `${year}-${month}-${day}`;
            values.dateOfBirth = dateOfBirth;


            try {
                await dispatch(registerUser(values)); // ✅ Ensure registerUser returns a promise
                if (handleCloseAuthModal) handleCloseAuthModal(); // ✅ Close modal
                navigate("/verify", { state: { email: values.email } }); // ✅ Redirect
            }
            catch (error) {
                console.error("Signup failed", error);
            }

            console.log("form values", values);
        }
    });

    const handleDateChange = (name) => (event) => {
        formik.setFieldValue("dateOfBirth", {
            ...formik.values.dateOfBirth,
            [name]: event.target.value
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}>

            {/* Username & Email in one row */}
            <div className="flex gap-4 mb-4">
                {/* Username */}
                <div className="flex-1">
                    <input
                        type="text"
                        name="username"
                        placeholder="User Name"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                    )}
                </div>

                {/* Email */}
                <div className="flex-1">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                </div>
            </div>

            {/* Password below */}
            <div className="mb-4">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}
            </div>

            {/* Date of Birth */}
            <div className="flex gap-4 mb-4">
                {/* Day */}
                <div className="flex-1">
                    <select
                        name="day"
                        className="w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formik.values.dateOfBirth.day}
                        onChange={handleDateChange("day")}
                    >
                        <option value="">Date</option>
                        {days.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Month */}
                <div className="flex-1">
                    <select
                        name="month"
                        className="w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formik.values.dateOfBirth.month}
                        onChange={handleDateChange("month")}
                    >
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year */}
                <div className="flex-1">
                    <select
                        name="year"
                        className="w-full border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formik.values.dateOfBirth.year}
                        onChange={handleDateChange("year")}
                    >
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white rounded-full py-3 font-semibold hover:bg-blue-600 transition"
                >
                    SIGNUP
                </button>
            </div>

        </form>
    )
}






























































































{/* <Grid container spacing={2}> 

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
            </Grid> */}