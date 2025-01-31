import axios from 'axios';



export const registerUser = async (formData) => {
  
        const response = await axios.post('http://localhost:5001/auth/register',
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

        console.log(response);
        return response.data;
};

export const loginUser = async (payload) => {

    const response = await axios.post('http://localhost:5001/auth/login',
        payload,
        {
            withCredentials: true,
        });

    console.log(response);
    return response;
};

export const forgetPassword = async (email) => {

        const response = await axios.post('http://localhost:5001/auth/forget-password',
            email
        );

        console.log(response);
        return response;
};

export const resetPassword = async (resetData) => {

        const response = await axios.post('http://localhost:5001/auth/reset-password',
            resetData
        );

        console.log(response);
        return response;

};

export const verifiedEmail = async ({ params: { token, phoneNumber } }) => {

        const response = await axios.get('http://localhost:5001/auth/mail-verification',
            { params: { token, phoneNumber } }
        );

        console.log(response);
        return response;

};