import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup"
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/Auth/Action";



const validationSchema = Yup.object().shape({
    username: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required")
})

export default function SigninForm() {

    const dispatch=useDispatch()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values))
            console.log("form values", values)
        }
    })


    return (
        <Form onSubmit={formik.handleSubmit}>
            <Row className="g-3">
                {/* Email Field */}
                <Col xs={12}>
                    <Form.Group controlId="username">
                        <Form.Label>username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.username && Boolean(formik.errors.username)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.username && formik.errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                {/* Password Field */}
                <Col xs={12}>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.touched.password && formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                {/* Submit Button */}
                <Col xs={12} className="mt-4">
                    <Button
                        type="submit"
                        variant="success"
                        size="lg"
                        className="w-100 rounded-pill py-2 fw-bold"
                    >
                        Sign In
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}














































// return(
//         <form>
//             <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                     <TextField className=""
//                     fullWidth
//                     label="Email"
//                     name="email"
//                     variant="outlined"
//                     size="large"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email && formik.errors.email}
//                     />
//                 </Grid>

//                 <Grid item xs={12}>
//                     <TextField className=""
//                     fullWidth
//                     label="Password"
//                     name="password"
//                     variant="outlined"
//                     size="large"
//                     value={formik.values.password}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.password && Boolean(formik.errors.password)}
//                     helperText={formik.touched.password && formik.errors.password}
//                     />
//                 </Grid>

//                 <Grid item xs={12} className="mt-20">
//                     <Button
//                     size="large"
//                      sx={{borderRadius:"29px", py:"15px", bgcolor:"green[500]"}} 
//                      type="submit" fullWidth variant="contained"
//                      >signin</Button>
//                 </Grid>
//             </Grid>
//         </form>
//     )