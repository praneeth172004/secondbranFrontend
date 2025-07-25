import React, { useState } from "react";

function VideoUpload() {
  const [uploadFile, setUploadFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mt-4">
      <label htmlFor="video-upload" className="block text-sm font-medium text-gray-700 mb-2">
        Upload Video
      </label>

      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
        <input
          id="video-upload"
          type="file"
          accept="video/mp4, video/webm"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="video-upload"
          className="flex items-center gap-3 text-blue-600 font-medium hover:underline cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553 2.276A1 1 0 0120 13.118V18.5a1 1 0 01-1.447.894L15 17v-7z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h11a1 1 0 011 1v10a1 1 0 01-1 1H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
          </svg>
          Choose Video File
        </label>

        <p className="text-sm text-gray-500 mt-2">
          Accepted formats: MP4, WebM up to 50MB.
        </p>

        {uploadFile && (
          <p className="mt-2 text-sm text-green-600 font-medium truncate">
            Selected: {uploadFile.name}
          </p>
        )}
      </div>

      {/* Optional Video Preview */}
      {previewUrl && (
        <video
          controls
          src={previewUrl}
          className="mt-4 rounded-md shadow max-h-64 w-full"
        />
      )}
    </div>
  );
}

export default VideoUpload;
