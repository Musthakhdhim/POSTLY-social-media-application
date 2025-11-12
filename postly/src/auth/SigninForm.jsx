import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/Auth/Action";
import { useNavigate } from "react-router-dom";



const validationSchema = Yup.object().shape({
    username: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required")
})

export default function SigninForm({handleCloseAuthModal}) {

    const dispatch = useDispatch()
    const navigate=useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: async(values) => {
            try{
                await dispatch(loginUser(values));
                if(handleCloseAuthModal)
                    handleCloseAuthModal()
                    navigate("/")
            }
            catch(error){
                console.error("login failed", error)
            }
        }
    })


    return (
       

        <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div>
                <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white rounded-full py-3 font-semibold hover:bg-green-600 transition"
                >
                    Sign In
                </button>
            </div>
        </form>
    );
}












