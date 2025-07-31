import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import { Edit, Delete, GitHub } from '@mui/icons-material';
import { Project } from '../types/Project';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: (project: Project) => void;
}

export default function ProjectCard({ project, onDelete, onEdit }: ProjectCardProps) {
  return (
    <Card>
      {/* <CardMedia component="img" height="140" image={project.imageUrl} alt={project.title} /> */}
<CardMedia
  component="img"
  height="180"
  image={project.imageUrl}
  alt={project.title}
sx={{
  objectFit: 'contain',
  width: '100%',
  backgroundColor: '#c9f9b7ff' // Optional light background
}}

/>



      <CardContent>
        <Typography gutterBottom variant="h6">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onEdit(project)} color="primary">
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(project.id!)} color="error">
          <Delete />
        </IconButton>
        <IconButton component="a" href={project.gitHubUrl} target="_blank" rel="noopener noreferrer">
          <GitHub />
        </IconButton>
      </CardActions>
    </Card>
  );
}