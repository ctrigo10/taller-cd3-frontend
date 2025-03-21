// src/components/FileUploadForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Constants, TOKEN } from '../constants/constants';

// Definimos un tipo para el archivo
interface FileUploadFormProps {
  onFileUpload?: (file: File) => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string>('');

  // Maneja el cambio de archivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type); // Guardamos el tipo MIME del archivo
    }
  };

  // Maneja el submit del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!file) {
      alert('Por favor, selecciona un archivo.');
      return;
    }

    // Validamos que el tipo de archivo sea PDF o JSON
    if (fileType !== 'application/pdf' && fileType !== 'application/json') {
      alert('Por favor, selecciona un archivo PDF o JSON.');
      return;
    }

    // Creamos un FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = Constants.apiBaseUrl;
    try {
      const response = await axios.post(
        `${apiUrl}/api/documents/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
          },
        }
      );
      console.log('Archivo subido correctamente', response.data);

      // Si se proporciona una función `onFileUpload`, la llamamos
      if (onFileUpload) {
        onFileUpload(file);
      }
    } catch (error) {
      console.error('Error al subir el archivo', error);
    }
  };

  return (
    <div>
      <h2>Subir archivo PDF o JSON</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            accept=".pdf,.json"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Subir Archivo</button>
      </form>
    </div>
  );
};

export default FileUploadForm;
