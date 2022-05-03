import { Grid as MuiGrid, GridProps } from '@mui/material';

export default function Grid(props: GridProps) {
    return <MuiGrid {...props}>{props.children}</MuiGrid>;
}
