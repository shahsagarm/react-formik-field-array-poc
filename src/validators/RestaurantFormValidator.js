import * as Yup from 'yup';

export const restaurantFormValidator = Yup.object().shape({
    name: Yup.string()
        .min(2)
        .max(50)
        .required()
        .label('Restaurant name'),
    branches: Yup.array(Yup.object().shape({
        address: Yup.string()
            .min(10)
            .max(150)
            .required()
            .label('Address'),
        city: Yup.string()
            .required()
            .label('City'),
        state: Yup.string()
            .required()
            .label('State'),
        country: Yup.string()
            .required()
            .label('Country'),
        postalCode: Yup.string()
            .required()
            .label('Postal code'),
        branchType: Yup.string()
            .required()
            .label('Branch type'),
        foodType: Yup.array().min(1).label('Food type')
    }))
});