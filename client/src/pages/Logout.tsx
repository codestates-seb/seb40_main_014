import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { myLogout } from '../slices/mySlice';

const Logout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		dispatch(myLogout());
		navigate('/');
	}, []);

	return <></>;
};

export default Logout;
