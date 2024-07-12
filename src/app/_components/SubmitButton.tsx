"use client";

import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";

export function SubmitButton({ buttonText }: { buttonText: string }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="text-black"
      disabled={pending}
    >
      {buttonText}
    </Button>
  );
}
