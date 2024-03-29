"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUPloadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
  onUploadBegin?: () => void,
  onClientUploadComplete?: () => void
}

const FileUpload = ({ endpoint, onChange, value, onUploadBegin, onClientUploadComplete }: FileUPloadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <UploadDropzone
        endpoint={endpoint}
        onUploadBegin={() => {
            onUploadBegin?.()          
        }}
        onClientUploadComplete={(res) => {
          onClientUploadComplete?.()
          onChange(res?.[0]?.url);
        }}
        onUploadError={(error) => console.log(error)}
      />
    </>
  );
};

export default FileUpload;
