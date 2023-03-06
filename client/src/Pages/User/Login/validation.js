
import * as Yup from 'yup';
const users = [
  { 
    id: '12FS2',
    name: 'Francisco',
    aPaterno: 'Santiago',
    aMaterno: 'Cruz',
    password: '1234FSC'
  },
  { 
    id: '12LRS2',
    name: 'Luis Alberto',
    aPaterno: 'Robles',
    aMaterno: 'Parada',
    password: '1234LARP'
  },
  { 
    id: '12HR2',
    name: 'Hugo',
    aPaterno: 'Robles',
    aMaterno: 'Parada',
    password: '1234HRP'
  },
]
export const formikConfig = {
    initialValues: {
        id: '',
        password: ''
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required('El ID es obligatorio')
        //.matches("[a-zA-Z0-9")
        ,
      password: Yup.string()
        .required("Ingrese una contraseña"),
    }),
    onSubmit: async (formData) => {
      console.log('formData', formData)
      let dataExists = users.find(user => user.id === formData.id && user.password === formData.password)
      if(dataExists != null) {
        localStorage.setItem("user", JSON.stringify(dataExists));
        window.location = '/';
      }
      //console.log('dataExists', dataExists)
    }
  }