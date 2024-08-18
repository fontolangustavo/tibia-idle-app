import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';

function CharacterDialog({ open, onClose, onRegister }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await onRegister(name);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar personagem:', error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cadastrar Personagem</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nome do Personagem"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button onClick={handleRegister} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CharacterDialog;
