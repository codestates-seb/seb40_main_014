export type music = {
	id: number;
	name: string;
};

export type plinfo = {
	title: string;
	category: string;
	author: string;
	like: number;
	desc: string;
	total: number;
};

export type PlayListInfoProps = {
	playListInfo: plinfo;
};

export type MusicListProps = {
	musicList: Array<music>;
};
