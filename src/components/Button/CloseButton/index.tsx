import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import { OnClick } from '../../../types/EventListener';

type Props = {
    handleClick: (e: OnClick) => void;
};

export default function CloseButton(props: Props) {
    const { handleClick } = props;
    return (
        <Button variant='contained' color='error' onClick={handleClick}>
            <CancelIcon />
            Discard
        </Button>
    );
}
