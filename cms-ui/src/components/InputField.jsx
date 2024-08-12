import { Form } from "react-bootstrap"


export const InputField = ({ formik, name, label, type = "text", as }) => {

    return  <div>
    <Form.Label htmlFor={name}>{label}</Form.Label>
    <Form.Control name={name} type={type} id={name} as={as} value={type != 'password' ? formik.values[name] : undefined} 
        onChange={formik.handleChange} onBlur={formik.handleBlur} 
        isInvalid={formik.touched[name] && formik.errors[name]} 
        isValid={formik.values[name] && !formik.errors[name]}  required />
    {formik.touched[name] && formik.errors[name] && <Form.Control.Feedback type="invalid">
        {formik.errors[name]}
        </Form.Control.Feedback>}
    </div>

}