import React, { useState } from 'react';
import axiosinstance from '../axios';
import { useAuth } from '../AuthProvider';

interface AddcontentProps {
  show: boolean;
  setshow: React.Dispatch<React.SetStateAction<boolean>>;
  pdf?: string;
  setpdfurl?: React.Dispatch<React.SetStateAction<string>>;
  onContentAdded?: () => void;
}

const VALID_TYPES = [
  { label: 'Websites', value: 'article' },
  { label: 'Image', value: 'image' },
  { label: 'Youtube', value: 'youtube' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Content', value: 'content' },
];

const initialFormState = {
  title: '',
  content: '',
  tags: '',
  link: '',
  type: '',
};

export default function AddContent({ show, setshow, onContentAdded }: AddcontentProps) {
  const [form, setform] = useState(initialFormState);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  //@ts-ignore
  const { seturlimage } = useAuth();

  const resetAll = () => {
    setform(initialFormState);
    setUploadFile(null);
    setPreviewUrl(null);
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const processedForm = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
    };

    try {
      await axiosinstance.post("/user/addcontent", processedForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Content Successfully Added");
      onContentAdded?.();
      resetAll();
      setshow(false);
    } catch (err) {
      alert("Error in adding content: " + err);
    }
  };

  const handleupload = async () => {
    if (!uploadFile) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("tags", form.tags);
      formData.append("type", form.type);
      if (form.type === "image") {
        formData.append("image", uploadFile);
      }

      const response = await axiosinstance.post(
        `/user/upload/${form.type === "image" ? "image" : "pdf"}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      seturlimage(response.data.url);
      alert("File Successfully Uploaded");
      onContentAdded?.();
      resetAll();
      setshow(false);
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 flex backdrop-blur-sm bg-black/50 h-screen w-screen justify-center items-center z-50">
      <div className="bg-white w-[400px] max-h-[90vh] p-10 rounded-lg shadow-lg overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Add Content</h1>
        <form className="space-y-4" onSubmit={handlesubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              value={form.title}
              onChange={(e) => setform({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              rows={4}
              value={form.content}
              onChange={(e) => setform({ ...form, content: e.target.value })}
            ></textarea>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              value={form.link}
              onChange={(e) => setform({ ...form, link: e.target.value })}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              value={form.tags}
              onChange={(e) => setform({ ...form, tags: e.target.value })}
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-2"
              value={form.type}
              onChange={(e) => {
                setform({ ...form, type: e.target.value });
                setUploadFile(null);
                setPreviewUrl(null);
              }}
              required
            >
              <option value="">Select Type</option>
              {VALID_TYPES.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* File Upload */}
          {form.type === "image" && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg, image/jpg, image/png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setUploadFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreviewUrl(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-3 text-blue-600 font-medium hover:underline cursor-pointer"
                >
                  Choose Image
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Accepted formats: JPEG, JPG, PNG up to 5MB
                </p>
              </div>

              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-4 max-h-48 rounded-md shadow-sm"
                />
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => {
                resetAll();
                setshow(false);
              }}
            >
              Cancel
            </button>

            {(form.type === "image") ? (
              <button
                type="button"
                disabled={!uploadFile || isUploading}
                className={`${uploadFile && !isUploading
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400"
                  } text-white px-4 py-2 rounded`}
                onClick={handleupload}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Content
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
