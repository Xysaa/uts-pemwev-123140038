import React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../App";
export default function DataTable({ items = [], loading = false, emptyText = "Tidak ada hasil." }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-3 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
              <div className="h-3 w-2/3 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return <p className="mt-6 text-sm text-gray-500">{emptyText}</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((o) => {
        const isFav = favorites.includes(o.objectID);
        const img = o.primaryImageSmall || o.primaryImage;
        return (
          <div
            key={o.objectID}
            className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200/70 dark:border-gray-800 hover:shadow transition"
          >
            <button
              onClick={() => navigate(`/art/${o.objectID}`)}
              className="block w-full text-left"
              title={o.title}
            >
              <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {img ? (
                  <img
                    src={img}
                    alt={o.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2">{o.title || "Untitled"}</p>
                {o.artistDisplayName && (
                  <p className="mt-1 text-xs text-gray-500">{o.artistDisplayName}</p>
                )}
              </div>
            </button>

            <div className="px-3 pb-3">
              <button
                onClick={() => toggleFavorite(o.objectID)}
                className={`w-full text-sm px-3 py-2 rounded border ${
                  isFav
                    ? "bg-yellow-400 text-black border-yellow-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                {isFav ? "Remove Favorite" : "Add to Favorite"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
