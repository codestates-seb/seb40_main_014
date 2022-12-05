import instance from './root';

export const getYouTubeMusic = async (data) => {
	const id = data;
	const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.REACT_APP_YOUTUBE_KEY}
&part=snippet`;
	try {
		const result = await instance.get(url);
		return result.data;
	} catch (err) {
		return err;
	}
};
