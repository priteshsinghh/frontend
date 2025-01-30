import axios from 'axios';



export const registerUser = async (formData) => {
    try {
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

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const loginUser = async (payload) => {

    try {
        const response = await axios.post('http://localhost:5001/auth/login',
            payload,
            {
                withCredentials: true,
            });

        console.log(response);
        return response;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const forgetPassword = async (email) => {

    try {
        const response = await axios.post('http://localhost:5001/auth/forget-password',
            email
        );

        console.log(response);
        return response;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const resetPassword = async (resetData) => {

    try {
        const response = await axios.post('http://localhost:5001/auth/reset-password',
            resetData
        );

        console.log(response);
        return response;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const verifiedEmail = async ({ params: { token, phoneNumber } }) => {

    try {
        const response = await axios.get('http://localhost:5001/auth/mail-verification',
            { params: { token, phoneNumber } }
        );
        
        console.log(response);
        return response;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};