import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Box, Typography, IconButton, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageUploaderProps {
  label: string;
  onFileSelect: (files: File | File[] | null) => void;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  label, 
  onFileSelect, 
  multiple = false, 
  maxFiles = 1, 
  maxSize = 5 * 1024 * 1024 
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        setError("Some files were rejected. Please check size and format.");
        return;
      }
  

      if (selectedFiles.length + acceptedFiles.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      setError(null); // Clear any previous errors

      const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => (multiple ? [...prev, ...newPreviews] : newPreviews));
      setSelectedFiles((prev) => (multiple ? [...prev, ...acceptedFiles] : acceptedFiles));

      onFileSelect(multiple ? [...selectedFiles, ...acceptedFiles] : acceptedFiles[0]);
    },
    [onFileSelect, selectedFiles, multiple, maxFiles]
  );

  const handleDelete = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);

    onFileSelect(multiple ? updatedFiles : updatedFiles[0] || null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    multiple,
    maxFiles,
    maxSize,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        cursor: "pointer",
        position: "relative"
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon fontSize="large" color="primary" />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {isDragActive ? "Drop files here..." : `Click or drag files to upload ${label}`}
      </Typography>
      <Typography variant="caption" display="block">
        {multiple ? `Up to ${maxFiles} files` : "Single file"}, Max {maxSize / (1024 * 1024)}MB each, <br/> (PDF, JPEG, PNG, WEBP)
      </Typography>

      {/* Show Error Messages */}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

      {/* Image Previews */}
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2, gap: 1 }}>
        {previews.map((src, index) => (
          <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
            <img
              src={src}
              alt={`preview-${index}`}
              style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover", border: "1px solid #ddd" }}
            />
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 0, right: 0, bgcolor: "rgba(0,0,0,0.5)", color: "white" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImageUploader;
