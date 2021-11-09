import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAlert } from '../../store/appState/selectors';

export default function FormAlert() {
    const alert = useSelector(selectAlert);
    if (!alert) return null;
    const severity = alert.severity === 'success' ? 'success' : 'error';
    return <Alert severity={severity}>{alert.message}</Alert>;
}
