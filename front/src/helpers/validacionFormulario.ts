import { ILoginUser, IRegisterUser, IValidationErrors } from "@/interfaces/types";

export const validateRegisterForm = (formData: IRegisterUser): { isValid: boolean; validationErrors: IValidationErrors } => {
    const validationErrors: IValidationErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
        validationErrors.name = 'El nombre es obligatorio.';
        isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        validationErrors.email = 'El correo electrónico no es válido.';
        isValid = false;
    }

    if (!formData.address.trim()) {
        validationErrors.address = 'La dirección es obligatoria.';
        isValid = false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
        validationErrors.phone = 'El número de teléfono debe contener 10 dígitos.';
        isValid = false;
    }

    if (formData.password.length < 8) {
        validationErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        isValid = false;
    }

    return { isValid, validationErrors };
};

export const validateLoginForm = (formData: ILoginUser): { isValid: boolean; validationErrors: IValidationErrors } => {
    const validationErrors: IValidationErrors = {};
    let isValid = true;

    if (!formData.email.trim()) {
        validationErrors.email = 'El correo electrónico es obligatorio.';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        validationErrors.email = 'El correo electrónico no es válido.';
        isValid = false;
    }

    if (!formData.password.trim()) {
        validationErrors.password = 'La contraseña es obligatoria.';
        isValid = false;
    } else if (formData.password.length < 8) {
        validationErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
        isValid = false;
    }

    return { isValid, validationErrors };
};