"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function DeleteSpeciesDialog({ species }: { species: Species }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const onClick = async () => {
    // The `input` prop contains data that has already been processed by zod. We can now use it in a supabase query
    const supabase = createClientComponentClient<Database>();
    const { error } = await supabase.from("species").delete().match({ 'id': species.id });
    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);

    // Refresh all server components in the current route. This helps display the newly created species because species are fetched in a server component, species/page.tsx.
    // Refreshing that server component will display the new species from Supabase
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="ml-1 mr-1 flex-auto w-full"
          variant="secondary"
          onClick={() => setOpen(true)}
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          <Icons.trash className="mr-3 h-5 w-5" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this species?</DialogTitle>
          <div className="mt-1 ml-auto mr-0">
            <Button
              type="button"
              className="ml-1 mr-1 flex-auto"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
            <Button
              type="button"
              className="ml-1 mr-1 flex-auto"
              variant="secondary"
              style={{ backgroundColor: 'red', color: 'white' }}
              onClick={() => void onClick()}
            >
              Yes
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
