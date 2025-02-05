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

    return response.data;
};

export const loginUser = async (payload) => {

    const response = await axios.post('http://localhost:5001/auth/login',
        payload,
        {
            withCredentials: true,
        });
    return response;
};

export const forgetPassword = async (email) => {

    const response = await axios.post('http://localhost:5001/auth/forget-password',
        email
    );

    return response;
};

export const resetPassword = async (resetData) => {

    const response = await axios.post('http://localhost:5001/auth/reset-password',
        resetData
    );

    return response;

};

export const verifiedEmail = async ({ params: { token, phoneNumber } }) => {

    const response = await axios.get('http://localhost:5001/auth/mail-verification',
        { params: { token, phoneNumber } }
    );

    return response;

};

export const editProfile = async ({ formData, user }) => {

    const response = await axios.put(`http://localhost:5001/shop/edit-profile?email=${user.email}`, formData);

    return response;

};

export const editProfilePic = async (formData) => {

    const response = await axios.post("http://localhost:5001/shop/edit-profilepic",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });

    return response;

};

export const changePassword = async ({formData, user}) => {
    const response = await axios.post(`http://localhost:5001/shop/change-password?email=${user.email}`,
        formData
    );

    return response;
}


