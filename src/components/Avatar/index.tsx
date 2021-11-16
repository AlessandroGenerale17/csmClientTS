import Avatar from '@mui/material/Avatar';

type Props = {
    imgUrl: string | null;
    alt?: string;
};

export default function AvatarComponent(props: Props) {
    const { imgUrl, alt } = props;
    return imgUrl ? (
        <Avatar style={{ marginRight: '3px' }} src={imgUrl} />
    ) : (
        <Avatar>{alt && alt[0].toUpperCase()}</Avatar>
    );
}
