import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { OnSubmit } from '../../../Types/EventListener';

type Props = {
    handleClick: (e: OnSubmit) => void;
    loading: boolean;
    backgroundColor: string;
};

export default function Loading(props: Props) {
    const { handleClick, loading, backgroundColor } = props;
    return (
        <LoadingButton
            style={{
                color: 'white',
                backgroundColor: `${backgroundColor}`,
                fontFamily: 'Roboto, monospace',
                width: '15rem',
                alignSelf: 'center'
            }}
            onClick={(e: OnSubmit) => handleClick(e)}
            loading={loading}
            loadingPosition='start'
            startIcon={<SaveIcon />}
            variant='contained'
        >
            Save
        </LoadingButton>
    );
}
