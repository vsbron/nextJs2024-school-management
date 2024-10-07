"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const BackspaceHandler = () => {
  // Getting the router
  const router = useRouter();

  useEffect(() => {
    // Handling the Backspace key
    const handleKeyDown = (e: KeyboardEvent) => {
      // Get the active element
      const activeElement = document.activeElement;

      // Check if the active element is an input, textarea, or content-editable
      const isInputElement =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement;

      if (isInputElement) {
        return; // Do nothing if focused on an input or textarea
      }

      if (e.key === "Backspace") {
        // Preventing the default behavior
        e.preventDefault();

        // Navigate back
        router.back();
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clear event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  return null;
};

export default BackspaceHandler;
