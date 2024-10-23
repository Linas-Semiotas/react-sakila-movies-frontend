import * as Yup from 'yup';
import Utils from './utility';

//USER
export const personalInfoSchema = Yup.object().shape({
    firstName: Utils.schemaMinMax('First name', 2, 50),
    lastName: Utils.schemaMinMax('Last name', 2, 50),
    email: Utils.schemaEmail(),
    phone: Utils.schemaPattern('Phone', /^(\+?[0-9. ()-]{7,25}$)?$/, false)
});

export const addressInfoSchema = Yup.object().shape({
    address: Utils.schemaPattern('Address', /^.{5,100}$/, false),
    district: Utils.schemaPattern('District', /^.{2,50}$/, false),
    postalCode: Utils.schemaPattern('Postal code', /^[A-Za-z0-9\s]{3,10}$/, false),
    city: Utils.schemaPattern('City', /^.{2,50}$/, false),
    country: Utils.schemaPattern('Country', /^.{2,50}$/, false)
});

export const passwordSchema = Yup.object().shape({
    currentPassword: Utils.schemaMinMax('Current password', 8, 64),
    newPassword: Utils.schemaMinMax('Current password', 8, 64),
    repeatNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required')
});

//ADMIN
export const movieSchema = Yup.object().shape({
    title: Utils.schemaMinMax('Title', 1, 255),
    description: Utils.schemaMinMax('Description', 1, 255),
    releaseYear: Utils.schemaValueMinMax('Release Year', 1900, 2100),
    language: Yup.string().required('Language is required'),
    filmLength: Utils.schemaPositive('Film Length'),
    rentalDuration: Utils.schemaPositive('Rental Duration'),
    rentalRate: Utils.schemaDecimalMin('Rental Rate', '0.01'),
    replacementCost: Utils.schemaDecimalMin('Replacement Cost', '0.01'),
    rating: Yup.string().required('Rating is required'),
    category: Yup.array().min(1, 'At least one category is required').required(),
    actors: Yup.array().min(1, 'At least one actor is required').required(),
    specialFeatures: Utils.schemaMinMax('Special Features', 1, 255)
});

export const categorySchema = Yup.object().shape({
    name: Utils.schemaMinMax('Category', 2, 50)
});

export const languageSchema = Yup.object().shape({
    name: Utils.schemaMinMax('Language', 2, 50)
});

export const actorSchema = Yup.object().shape({
    firstName: Utils.schemaMinMax('First name', 2, 50),
    lastName: Utils.schemaMinMax('Last name', 2, 50)
});

//AUTH
export const loginSchema = Yup.object().shape({
    username: Utils.schemaMinMax('Username', 4, 30),
    password: Utils.schemaMinMax('Password', 8, 64)
});

export const registerSchema = Yup.object().shape({
    firstName: Utils.schemaMinMax('First name', 2, 50),
    lastName: Utils.schemaMinMax('Last name', 2, 50),
    email: Utils.schemaPattern('Email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, true),
    storeId: Yup.number().required('Store location is required'),
    username: Utils.schemaMinMax('Username', 4, 20),
    password: Utils.schemaMinMax('Password', 8, 64)
});