/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

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

export const loginUser = async (payload: { email: string; password: string; phoneNumber?: undefined; } | { phoneNumber: string; password: string; email?: undefined; }) => {

    const response = await axios.post('http://localhost:5001/auth/login',
        payload,
        {
            withCredentials: true,
        });
    return response;
};

export const forgetPassword = async (email: { email: string; }) => {

    const response = await axios.post('http://localhost:5001/auth/forget-password',
        email
    );

    return response;
};

export const resetPassword = async (resetData: { token: string | null; newPassword: string; }) => {

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

export const editProfilePic = async (formData: FormData) => {

    const response = await axios.post("http://localhost:5001/shop/edit-profilepic",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });

    return response;

};

export const changePassword = async ({ formData, user }) => {
    const response = await axios.post(`http://localhost:5001/shop/change-password?email=${user.email}`,
        formData
    );

    return response;
}


export const addRestaurant = async (formData: FormData) => {
    const response = await axios.post("http://localhost:5001/seller/add-restaurant",
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        });

    return response;
}


export const fetchRestaurant = async () => {
    const response = await axios.get("http://localhost:5001/seller/fetch-restaurant");

    return response;
}

export const fetchRestaurantDetails = async (id: string | undefined) => {
    const response = await axios.get(`http://localhost:5001/seller/get-restaurant?id=${id}`,
    );

    return response;
}

export const deleteRestaurant = async (id: any) => {
    const response = await axios.delete(`http://localhost:5001/seller/delete-restaurant?id=${id}`,
    );

    console.log(response);
    return response;
}


export const addCategory = async ({ restaurant_id, name }) => {
    const response = await axios.post("http://localhost:5001/seller/add-category",
        { restaurant_id, name }
    );

    console.log(response);
    return response;
}

export const editCategory = async({id, name}) => {

    console.log(id);
    
    const response = await axios.put("http://localhost:5001/seller/edit-category",
        {id, name}
    )

    return response;
}


export const fetchCategories = async (id: string | null) => {
    const response = await axios.get(`http://localhost:5001/seller/fetch-category?id=${id}`
    );

    // console.log(response);
    return response;
}


export const addMenuItem = async (payload: any) => {
    const response = await axios.post("http://localhost:5001/seller/add-menuItem",
        payload,
        {
            headers: {
                'Content-Type': 'multipart/form-data', // Ensure the correct content type for FormData
            },
        }
    );

    console.log(response);
    return response;
}


export const fetchMenu = async (id: string | undefined) => {
    const response = await axios.get(`http://localhost:5001/seller/fetch-menu?id=${id}`);
    return response;
}


export const editMenu = async (formData: FormData) => {
    const response = await axios.put(`http://localhost:5001/seller/edit-menu`,
        formData,
        {
            headers: {
                'Content-Type': "multipart/form-data",
            },
        }
    );
    console.log(response);

    return response;
}


export const deleteCategory = async (id: any) => {
    const response = await axios.delete(`http://localhost:5001/seller/delete-category?id=${id}`);

    return response;
}
export const deleteMenuItem = async (id: any) => {
    const response = await axios.delete(`http://localhost:5001/seller/delete-menu?id=${id}`);

    return response;
}



