import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFormAlertMessage } from '../../../store/appState/selectors';

export default function FormAlert() {
    const message = useSelector(selectFormAlertMessage);
    const showMessage = message !== null;
    if (!showMessage) return null;
    return <Alert severity='error'>{message}</Alert>;
}
