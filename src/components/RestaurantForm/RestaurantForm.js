import { Fragment } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { FieldArray, FormikProvider, useFormik } from 'formik';

import { restaurantFormValidator } from '../../validators/RestaurantFormValidator';
import { COUNTRIES } from '../../constants/Countries';

const initalBranchValues = {
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    branchType: '',
    foodType: []
};

const initialValues = {
    name: '',
    branches: [{ ...JSON.parse(JSON.stringify(initalBranchValues)) }]
};

const RestaurantForm = () => {

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: restaurantFormValidator,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const addBranch = () => {
        const updatedValues = [...values.branches];
        const branchValuesDeepCopy = JSON.parse(JSON.stringify(initalBranchValues));
        updatedValues.push(branchValuesDeepCopy);
        setFieldValue('branches', updatedValues);
    };

    const removeBranch = index => {
        const updatedValues = [...values.branches];
        updatedValues.splice(index, 1);
        setFieldValue('branches', updatedValues);
    };

    const { values, errors, touched, isValid, handleSubmit, handleChange, handleBlur, setFieldValue } = formik;

    return (
        <>
            <Row>
                <Col md={6} className="my-3">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center my-3">
                                <h4>Restaurant Branches Form</h4>
                            </Card.Title>
                            <form>
                                <FormikProvider value={formik}>
                                    <Row>
                                        <Col md={12}>
                                            <Form.Group controlId="name">
                                                <Form.Label>
                                                    <span>Restaurant Name</span>
                                                    <span className="required">&nbsp;*</span>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter restaurant name"
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    isInvalid={!!errors.name && touched.name}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.name}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <FieldArray name="branches">
                                        {() => (values.branches.map((branch, i) => {
                                            const branchErrors = (errors.branches?.length && errors.branches[i]) || {};
                                            const branchTouched = (touched.branches?.length && touched.branches[i]) || {};
                                            return (
                                                <Fragment key={i}>
                                                    <Row className="my-3">
                                                        <Col md={12} className="my-3">
                                                            <h4 className="d-inline-block">Branch #{i + 1}</h4>
                                                            {i !== 0 ? (
                                                                <button className="btn btn-danger mx-3" type="button" onClick={() => removeBranch(i)}>−</button>
                                                            ) : (
                                                                    <button className="btn btn-primary text-white mx-3" type="button" onClick={() => addBranch(i)}>+</button>
                                                                )}
                                                        </Col>

                                                        <Col className="my-1" md={12}>
                                                            <Form.Group controlId={`branches.${i}.branchType`}>
                                                                <Form.Label>
                                                                    <span>Branch Type</span>
                                                                    <span className="required">&nbsp;*</span>
                                                                </Form.Label>
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="Main Branch"
                                                                    name={`branches.${i}.branchType`}
                                                                    value="main"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!branchErrors.branchType && branchTouched.branchType}
                                                                />
                                                                <Form.Check
                                                                    type="radio"
                                                                    label="Sub Branch"
                                                                    name={`branches.${i}.branchType`}
                                                                    onChange={handleChange}
                                                                    value="sub"
                                                                    isInvalid={!!branchErrors.branchType && branchTouched.branchType}
                                                                    feedback={branchErrors?.branchType}
                                                                />
                                                            </Form.Group>
                                                        </Col>

                                                        <Col className="my-1" md={12}>
                                                            <Form.Group controlId={`branches.${i}.foodType`}>
                                                                <Form.Label>
                                                                    <span>Food Type</span>
                                                                    <span className="required">&nbsp;*</span>
                                                                </Form.Label>
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    label="Veg"
                                                                    name={`branches.${i}.foodType`}
                                                                    value="veg"
                                                                    onChange={handleChange}
                                                                    isInvalid={!!branchErrors.foodType && branchTouched.foodType}
                                                                />
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    label="Non Veg"
                                                                    name={`branches.${i}.foodType`}
                                                                    onChange={handleChange}
                                                                    value="non-veg"
                                                                    isInvalid={!!branchErrors.foodType && branchTouched.foodType}
                                                                />
                                                                <Form.Check
                                                                    type="checkbox"
                                                                    label="Vegan"
                                                                    name={`branches.${i}.foodType`}
                                                                    onChange={handleChange}
                                                                    value="vegan"
                                                                    isInvalid={!!branchErrors.foodType && branchTouched.foodType}
                                                                    feedback={branchErrors?.foodType}
                                                                />
                                                            </Form.Group>
                                                        </Col>

                                                        <Col className="my-1" md={12}>
                                                            <Form.Group controlId={`branches.${i}.address`}>
                                                                <Form.Label>
                                                                    <span>Address</span>
                                                                    <span className="required">&nbsp;*</span>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    as="textarea"
                                                                    placeholder="Enter address"
                                                                    name={`branches.${i}.address`}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.branches[i]?.address}
                                                                    isInvalid={!!branchErrors.address && branchTouched.address}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {branchErrors.address}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>


                                                        <Col className="my-1" md={6}>
                                                            <Form.Group controlId={`branches.${i}.city`}>
                                                                <Form.Label>
                                                                    <span>City</span>
                                                                    <span className="required">&nbsp;*</span>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter city"
                                                                    name={`branches.${i}.city`}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.branches[i]?.city}
                                                                    isInvalid={!!branchErrors.city && branchTouched.city}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {branchErrors.city}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col className="my-1" md={6}>
                                                            <Form.Group controlId={`branches.${i}.state`}>
                                                                <Form.Label>
                                                                    <span>State</span>
                                                                    <span className="required">&nbsp;*</span>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter state"
                                                                    name={`branches.${i}.state`}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.branches[i]?.state}
                                                                    isInvalid={!!branchErrors.state && branchTouched.state}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {branchErrors.state}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col className="my-1" md={6}>
                                                            <Form.Group controlId={`branches.${i}.country`} >
                                                                <Form.Label>
                                                                    <span>Country</span>
                                                                    <span className="required">&nbsp;*</span>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    as="select"
                                                                    name={`branches.${i}.country`}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.branches[i]?.country}
                                                                    isInvalid={!!branchErrors.country && branchTouched.country}
                                                                >
                                                                    <option value="" disabled>Select country</option>
                                                                    {COUNTRIES.map(c => (
                                                                        <option value={c.name} key={c._id}>{c.name}</option>
                                                                    ))}
                                                                </Form.Control>
                                                                <Form.Control.Feedback type="invalid">
                                                                    {branchErrors.country}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col className="my-1" md={6}>
                                                            <Form.Group controlId={`branches.${i}.postalCode`}>
                                                                <Form.Label>
                                                                    <span>Postal Code</span>
                                                                    <span className="required">&nbsp;*</span>
                                                                </Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter postalCode"
                                                                    name={`branches.${i}.postalCode`}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.branches[i]?.postalCode}
                                                                    isInvalid={!!branchErrors.postalCode && branchTouched.postalCode}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    {branchErrors.postalCode}
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Fragment>
                                            );
                                        }))}
                                    </FieldArray>
                                </FormikProvider>
                                <div className="row">
                                    <div className="col-md-12 text-center mt-4">
                                        <button className="btn btn-primary text-white" type="button" onClick={handleSubmit}>Save</button>
                                    </div>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} className="my-3">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center my-3">
                                <h4>Restaurant Branches JSON</h4>
                            </Card.Title>
                            <p className={`lead text-center ${isValid ? 'green' : 'required'}`}>
                                <strong>Form Status : {isValid ? 'Valid' : 'Invalid'}</strong>
                            </p>
                            <pre className="pretty-json">
                                {JSON.stringify(values, null, 4)}
                            </pre>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default RestaurantForm;