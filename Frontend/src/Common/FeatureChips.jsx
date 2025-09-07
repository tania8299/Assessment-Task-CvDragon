import { X } from "lucide-react";

export default function FeatureChips({ features, onRemove }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {features.map((feature) => (
        <span
          key={feature}
          className="flex items-center gap-1 bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs"
        >
          {feature}
          <button
            type="button"
            onClick={() => onRemove(feature)}
          >
            <X size={10} className="text-gray-700" />
          </button>
        </span>
      ))}
    </div>
  );
}