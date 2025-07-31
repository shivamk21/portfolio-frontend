import { Container, Grid, Typography } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { useEffect, useState } from 'react';
import type { Project } from '../types/Project';
import { getAllProjects } from '../services/projectService';


const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Projects
      </Typography>
<Grid container spacing={3}>
  {projects.map((project: Project) => (
    <Grid item xs={12} sm={6} md={4} key={project.id}>
      <ProjectCard project={project} />
    </Grid>
  ))}
</Grid>


    </Container>
  );
};

export default Home;
