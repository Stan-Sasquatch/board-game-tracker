import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { CollapsibleTrigger } from "./ui/collapsible";

export function CollapsibleContentToggle({ open }: { open: boolean }) {
  return (
    <CollapsibleTrigger asChild className="px-2">
      <Button type="button" size="sm" variant="outline">
        {open ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </CollapsibleTrigger>
  );
}
