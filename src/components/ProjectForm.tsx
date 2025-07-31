import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';
import axios from 'axios';

interface Props {
  open: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

export default function ProjectForm({ open, onClose, onProjectAdded }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gitHubUrl, setGitHubUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/projects', {
        title,
        description,
        gitHubUrl,
        imageUrl
      });
      onProjectAdded();
      onClose();
    } catch (error) {
      console.error('Failed to add project', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Project</DialogTitle>
      <DialogContent>
        <TextField label="Title" fullWidth value={title} onChange={e => setTitle(e.target.value)} margin="dense" />
        <TextField label="Description" fullWidth value={description} onChange={e => setDescription(e.target.value)} margin="dense" multiline />
        <TextField label="GitHub URL" fullWidth value={gitHubUrl} onChange={e => setGitHubUrl(e.target.value)} margin="dense" />
        <TextField label="Image URL" fullWidth value={imageUrl} onChange={e => setImageUrl(e.target.value)} margin="dense" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
