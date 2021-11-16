import Button from '@mui/material/Button';
import { OnClick } from '../../../types/EventListener';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    handleClick: (e: OnClick) => void;
};

export default function SubmitSolutionButton(props: Props) {
    const { handleClick } = props;
    return (
        <Button variant='contained' color='success' onClick={handleClick}>
            <CheckCircleIcon />
            Submit
        </Button>
    );
}
