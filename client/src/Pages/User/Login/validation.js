
import * as Yup from 'yup';

export const formikConfig = {
    initialValues: {
        id: '',
        password: ''
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .matches("[a-zA-Z0-9")
        .required('El ID es obligatorio'),
      password: Yup.string()
        .required("Ingrese una contraseña"),
    }),
    onSubmit: async (formData) => {
      
    }
  }