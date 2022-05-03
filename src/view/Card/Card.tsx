import { default as MuiCard } from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props {
    title: string;
    image?: string;
    description?: string;
    link?: string;
}

export default function Card({ title, image, description, link }: Props) {
    return (
        <MuiCard>
            {image && <CardMedia component="img" height="140" image={image} alt={title} />}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                {link && (
                    <Button href={link} target="_blank" size="small">
                        Link
                    </Button>
                )}
            </CardActions>
        </MuiCard>
    );
}
