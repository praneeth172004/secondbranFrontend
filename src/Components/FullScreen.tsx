

interface FullScreenProps {
  imageUrl: string;
  onClose: () => void;
}

export default function FullScreen({ imageUrl, onClose }: FullScreenProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <img
        src={imageUrl}
        alt="Full View"
        className="max-w-full max-h-full object-contain"
      />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-400 transition"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  );
}
