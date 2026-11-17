
import { useEffect, useState } from "react";
import api from "../lib/api";

// Loads a list from the API.
// If the request fails, fallback data is displayed.
export default function useContent(path, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    let cancelled = false;

    api
      .get(path)
      .then((res) => {
        if (cancelled || !Array.isArray(res.data)) return;

        // Debug API response
        if (import.meta.env.DEV) {
          console.log("API RESPONSE:", path, res.data);

          res.data.forEach((product) => {
            console.log("PRODUCT:", product.title);
            console.log("IMAGE:", product.image);
            console.log("THUMBNAIL:", product.thumbnail);
          });
        }

        setData(res.data);
        setFromApi(true);

        if (import.meta.env.DEV) {
          console.info(
            `[useContent] ${path}: loaded ${res.data.length} items from the API`
          );
        }
      })
      .catch((err) => {
        console.warn(
          `[useContent] ${path}: API failed, showing fallback data.`,
          err.response?.status || err.message,
          "| API url:",
          api.defaults.baseURL
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, fromApi };
}
