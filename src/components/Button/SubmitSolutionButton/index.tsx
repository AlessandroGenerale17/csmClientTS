import Button from '@mui/material/Button';
import { OnClick } from '../../../Types/EventListener';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
    handleClick: (e: OnClick) => void;
};

export default function SubmitSolutionButton(props: Props) {
    return (
        <Button variant='contained' color='success'>
            <CheckCircleIcon />
            Submit
        </Button>
    );
}
