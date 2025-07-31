import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { CreateProjectRequest } from '../services/projectService';
import { Project } from '../types/Project';

interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (project: CreateProjectRequest, id?: string) => void;
  projectToEdit?: Project | null;
}

export default function AddProjectDialog({ open, onClose, onSave, projectToEdit }: AddProjectDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gitHubUrl, setGitHubUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setDescription(projectToEdit.description);
      setGitHubUrl(projectToEdit.gitHubUrl);
      setImageUrl(projectToEdit.imageUrl);
    } else {
      setTitle('');
      setDescription('');
      setGitHubUrl('');
      setImageUrl('');
    }
  }, [projectToEdit]);

  const handleSubmit = () => {
    const payload: CreateProjectRequest = {
      title,
      description,
      gitHubUrl,
      imageUrl,
    };

    onSave(payload, projectToEdit?.id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{projectToEdit ? 'Edit Project' : 'Add Project'}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Title" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField margin="dense" label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
        <TextField margin="dense" label="GitHub URL" fullWidth value={gitHubUrl} onChange={(e) => setGitHubUrl(e.target.value)} />
        <TextField margin="dense" label="Image URL" fullWidth value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}