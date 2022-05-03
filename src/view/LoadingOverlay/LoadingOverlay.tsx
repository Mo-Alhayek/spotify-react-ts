import { CircularProgress, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from 'view/Box/Box';

const StyledBox = styled(Box)`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export default function LoadingOverlay(): JSX.Element {
    return (
        <StyledBox>
            <Fade in timeout={300}>
                <CircularProgress />
            </Fade>
        </StyledBox>
    );
}
