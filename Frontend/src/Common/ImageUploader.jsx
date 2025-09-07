import { useRef } from "react";
import { Upload } from "lucide-react";

export default function ImageUploader({ image, onImageChange, onImageRemove }) {
  const fileInputRef = useRef(null);

  return (
    <div
      className="border-2 border-dashed rounded-xl p-1 text-center text-gray-400 cursor-pointer hover:bg-gray-50"
      onClick={() => fileInputRef.current.click()}
    >
      {image ? (
        <img
          src={image}
          alt="Preview"
          className="mx-auto h-20 w-20 object-cover rounded-full"
        />
      ) : (
        <>
          <Upload className="mx-auto mb-2" size={20} />
          <p className="text-xs">
            Drop your image here or{" "}
            <span className="text-yellow-500">Browse</span>
          </p>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={onImageChange}
      />
    </div>
  );
}