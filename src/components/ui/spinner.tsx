"use client";
import { LoaderIcon } from "lucide-react";

export function Spinner() {
  return (
    <div className="py-8">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}
