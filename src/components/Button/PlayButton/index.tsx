import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { OnClick } from '../../../Types/EventListener';

type Props = {
    handleClick: (e: OnClick) => void;
};

export default function PlayButton(props: Props) {
    const { handleClick } = props;
    return (
        <Button variant='contained' color='success' onClick={handleClick}>
            <PlayCircleIcon />
        </Button>
    );
}
