"use client";

import { useState } from "react";
import { CollapsibleContentToggle } from "~/components/collapsible-content-toggle";
import { Collapsible, CollapsibleContent } from "~/components/ui/collapsible";

export function SearchInfo() {
  const [contentOpen, setContentOpen] = useState(false);
  return (
    <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
      <div className="flex flex-col items-center">
        <div className="pb-2 text-black">
          <CollapsibleContentToggle open={contentOpen} />
        </div>
      </div>
      <CollapsibleContent>
        <div className="px-4 py-4 text-lg">
          <p className="text-center">Search for board games you own here</p>
          <p className="mt-2 text-center">
            You will need to log in to save games to your collection
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
