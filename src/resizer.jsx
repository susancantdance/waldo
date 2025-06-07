import { useEffect, useState, useRef } from "react";

export default function resizer(ref) {
  const [width, setWidth] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new ResizeObserver(([entry]) => {
      setWidth(entry.borderBoxSize);
    });
  });
}
