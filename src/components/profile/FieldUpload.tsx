"use client";

import { useState, useRef, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";

type FileWithPreview = {
  file: File;
  id: string;
  preview?: string;
};

export function FieldUpload({ id }: { id: string }) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const movieChaseApiUrl = process.env.NEXT_PUBLIC_MOVIECHASE_API_URL;

  const handleUpdateImage = async (id: string, file: File) => {
    if (!file) {
      console.error("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `${movieChaseApiUrl}/api/v1/user/update-image/${id}`,
      {
        method: "POST",
        body: formData,
      }
    );
    try {
      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating image", error);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    // If files were selected, send the first one to the backend
    if (files.length > 0) {
      handleUpdateImage(id, files[0].file);
    }
  }, [files]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray: FileWithPreview[] = Array.from(selectedFiles).map(
        (file) => ({
          file,
          id,
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(fileArray);
    }
  };

  return (
    <>
      <button
        onClick={openFileDialog}
        className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-400 transition-colors bg-gray-100"
        aria-label="Upload file"
      >
        <FaPencilAlt className="h-4 w-4 text-primary" />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
    </>
  );
}
