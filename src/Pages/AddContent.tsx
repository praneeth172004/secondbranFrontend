import React, { useState } from 'react';
import axiosinstance from '../axios';

interface AddcontentProps {
  show: boolean;
  setshow: React.Dispatch<React.SetStateAction<boolean>>;
  pdf: string;
  setpdfurl: React.Dispatch<React.SetStateAction<string>>;
}

const VALID_TYPES = [
  { label: 'Audio', value: 'audio' },
  { label: 'Video', value: 'video' },
  { label: 'Websites', value: 'article' },
  { label: 'Image', value: 'image' },
  // { label: 'Websites', value: 'article' },
  { label: 'Youtube', value: 'youtube' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Content', value: 'content' },
  { label: 'PDF', value: 'pdf' }
];

export default function AddContent({ show, setshow }: AddcontentProps) {
  const [form, setform] = useState({
    title: "",
    content: "",
    tags: "",
    link: "",
    type: ""
  });

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const processedForm = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim())
    };

    try {
      const response = await axiosinstance.post(
        "/user/addcontent",
        processedForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      
      alert("Content Successfully Added");
      setshow(false);
    } catch (err) {
      console.log(err);
      alert("Error in adding content"+err);
    }
  };

  const handleupload = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("tags", form.tags);
      formData.append("type", form.type);
      if (pdfFile) {
        formData.append("pdf", pdfFile);
      }

      const response = await axiosinstance.post("/user/upload/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      

      alert("PDF Successfully Uploaded");
      setshow(false);
    } catch (err) {
      console.log(err);
      alert("Error uploading PDF");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 flex backdrop-blur-sm bg-black/50 h-screen w-screen justify-center items-center z-50 transition-all duration-700 ease-in-out">
      <div className="bg-white w-[400px] h-auto p-10 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform hover:scale-105">
        <h1 className="text-2xl font-bold mb-4">Add Content</h1>

        <form className="space-y-4" onSubmit={handlesubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              value={form.title}
              onChange={(e) => setform({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              rows={4}
              value={form.content}
              onChange={(e) => setform({ ...form, content: e.target.value })}
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              value={form.link}
              onChange={(e) => setform({ ...form, link: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
              value={form.tags}
              onChange={(e) => setform({ ...form, tags: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-2"
              value={form.type}
              onChange={(e) => setform({ ...form, type: e.target.value })}
            >
              <option value="">Select Type</option>
              {VALID_TYPES.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {form.type === "pdf" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload PDF</label>
              <input
                type="file"
                accept="application/pdf"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-1"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPdfFile(file);
                }}
              />
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={() => setshow(false)}
            >
              Go Back
            </button>

            {form.type !== "pdf" ? (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Content
              </button>
            ) : (
              <div
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                onClick={handleupload}
              >
                Upload
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
