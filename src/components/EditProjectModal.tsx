// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button
// } from '@mui/material';
// import { Project } from '../types/Project';

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   project: Project | null;
//   onSave: (updated: Project) => void;
// };

// const EditProjectModal: React.FC<Props> = ({ open, onClose, project, onSave }) => {
//   const [formData, setFormData] = useState<Project | null>(null);

//   useEffect(() => {
//     setFormData(project);
//   }, [project]);

//   if (!formData) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     } as Project);
//   };

//   const handleSubmit = () => {
//     onSave(formData!);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Edit Project</DialogTitle>
//       <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
//         <TextField
//           label="Title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           multiline
//         />
//         <TextField
//           label="GitHub URL"
//           name="gitHubUrl"
//           value={formData.gitHubUrl}
//           onChange={handleChange}
//         />
//         <TextField
//           label="Image URL"
//           name="imageUrl"
//           value={formData.imageUrl}
//           onChange={handleChange}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="contained" onClick={handleSubmit}>Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditProjectModal;
import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Project } from '../types/Project';

interface Props {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  onUpdate: (updated: Project) => void;
}

const EditProjectDialog = ({ open, onClose, project, onUpdate }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [gitHubUrl, setGitHubUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setGitHubUrl(project.gitHubUrl);
      setImageUrl(project.imageUrl);
    }
  }, [project]);

  const handleSubmit = () => {
    if (!project) return;
    onUpdate({
      ...project,
      title,
      description,
      gitHubUrl,
      imageUrl,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Title" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
        <TextField fullWidth label="Description" value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
        <TextField fullWidth label="GitHub URL" value={gitHubUrl} onChange={e => setGitHubUrl(e.target.value)} margin="normal" />
        <TextField fullWidth label="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProjectDialog;
