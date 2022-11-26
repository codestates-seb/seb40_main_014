import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMyInfo } from '../api/userApi';
import Loading from '../components/common/Loading';
import { myInfo } from '../slices/mySlice';

const LoginCallback = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const accessToken = new URL(location.href).searchParams.get('access_token');
	const refreshToken = new URL(location.href).searchParams.get('refresh_token');
	const memberId = new URL(location.href).searchParams.get('member_id');

	useEffect(() => {
		if (accessToken && refreshToken) {
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			getMyInfo(Number(memberId), accessToken).then((res) => {
				console.log('getMyInfo res', res);

				dispatch(myInfo(res.data));

				// navigate('/');
				window.location.href = '/';
			});
		}
	}, []);

	return <Loading />;
};

export default LoginCallback;
