"use client";

import * as React from "react";
import { UploadCloud, X, File, AlertCircle } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  accept?: string;
  label?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onFilesSelected,
  maxFiles = 1,
  maxSizeMB = 5,
  accept,
  label,
  helperText,
  className,
  disabled = false,
}: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File ${file.name} is too large. Max size is ${maxSizeMB}MB`;
    }
    // Basic accept validation if needed, though input accept handles OS level
    return null;
  };

  const processFiles = (newFiles: File[]) => {
    setError(null);
    let validFiles = [...newFiles];
    
    if (files.length + validFiles.length > maxFiles) {
      setError(`You can only upload a maximum of ${maxFiles} file${maxFiles !== 1 ? 's' : ''}.`);
      validFiles = validFiles.slice(0, maxFiles - files.length);
    }

    for (const file of validFiles) {
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }
    }

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-sm font-medium text-[#1B4D3E]">{label}</label>}
      
      <div
        className={cn(
          "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-colors text-center",
          dragActive ? "border-[#C9A96E] bg-[#C9A96E]/5" : "border-gray-300 bg-gray-50/50 hover:bg-gray-50",
          error ? "border-red-400" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="rounded-full bg-[#F8F5F0] p-4 mb-4">
          <UploadCloud className="h-6 w-6 text-[#1B4D3E]" />
        </div>
        
        <p className="text-sm font-medium text-gray-900 mb-1">
          Click to upload <span className="font-normal text-gray-500">or drag and drop</span>
        </p>
        <p className="text-xs text-gray-500">
          {accept ? `Supported files: ${accept.split(',').join(', ')}.` : "All files supported."} Max size: {maxSizeMB}MB
        </p>
      </div>

      {(error || helperText) && (
        <p className={cn("text-xs flex items-center mt-1", error ? "text-red-500" : "text-gray-500")}>
          {error && <AlertCircle className="h-3 w-3 mr-1 inline" />}
          {error || helperText}
        </p>
      )}

      {files.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 border border-gray-200 rounded-md bg-white shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-[#F8F5F0] rounded text-[#1B4D3E]">
                  <File className="h-4 w-4" />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
