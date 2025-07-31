import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Snackbar,
  Fab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectCard from './components/ProjectCard';
import AddProjectDialog from './components/AddProjectDialog';
import { getAllProjects, createProject, updateProject, deleteProject } from './services/projectService';
import type { Project } from './types/Project';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      setErrorMessage('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch {
      setErrorMessage('Failed to delete project');
    }
  };

  const handleSave = async (projectData: Omit<Project, 'id' | 'createdAt'>, id?: string) => {
    try {
      if (id) await updateProject(id, projectData);
      else await createProject(projectData);
      fetchProjects();
    } catch {
      setErrorMessage('Failed to save project');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        My Projects
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          {/* <Grid container spacing={4} justifyContent="center">
            {projects.map((project) => (
              <Grid item key={project.id} xs={12} sm={6} md={4}>
                <ProjectCard
                  project={project}
                  onDelete={handleDelete}
                  onEdit={(p) => {
                    setEditProject(p);
                    setDialogOpen(true);
                  }}
                />
              </Grid>
            ))}
          </Grid> */}
<Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4, // spacing between cards
  }}
>
  {projects.map((project) => (
    <Box
      key={project.id}
      sx={{
        width: {
          xs: '100%', // full width on small screens
          sm: '45%',  // ~2 cards per row
          md: '30%',  // ~3 cards per row
        },
      }}
    >
      <ProjectCard
        project={project}
        onDelete={handleDelete}
        onEdit={(p) => {
          setEditProject(p);
          setDialogOpen(true);
        }}
      />
    </Box>
  ))}
</Box>

        </Box>
      )}

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => { setEditProject(null); setDialogOpen(true); }}>
        <AddIcon />
      </Fab>

      <AddProjectDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        projectToEdit={editProject}
      />

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage('')}
        message={errorMessage}
      />
    </Container>
  );
}

export default App;