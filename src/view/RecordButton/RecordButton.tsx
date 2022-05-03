import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import Button from 'view/Button/Button';

export interface Props {
    onClick: () => void;
    recording: boolean;
}

export default function RecordButton({ recording, onClick }: Props): JSX.Element {
    return (
        <Button
            color={recording ? 'error' : 'primary'}
            variant="contained"
            onClick={onClick}
            style={{ height: 56 }}
        >
            {recording ? <MicOffIcon /> : <MicIcon />}
        </Button>
    );
}
