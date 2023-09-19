"use client";

import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import EditSpeciesDialog from "./edit-species-dialog";
import DeleteSpeciesDialog from "./delete-species-dialog";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function LearnMoreDialog({ species, userID }: { species: Species, userID: string }) {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full">Learn More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <div className="relative h-100 w-full rounded border-2 p-3 shadow">
          {species.image && (
            <div className="relative h-80 w-full">
              <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
            </div>
          )}
        </div>
        <h3 className="mt-3 text-2xl font-semibold">Common Name: {species.common_name}</h3>
        <h4 className="text-lg font-light">Scientific Name: <i>{species.scientific_name}</i></h4>
        <p>Total Population: {species.total_population}</p>
        <p>Kingdom: <i>{species.kingdom}</i></p>
        <p>Description: {species.description ? species.description : ""}</p>
        <div className="relative w-full" style={{ display: "flex" }}>
          {species.author === userID && (<DeleteSpeciesDialog key={new Date().getTime()} species={species} />)}
          {species.author === userID && (<EditSpeciesDialog key={new Date().getTime()} userId={userID} species={species} />)}
          <Button
            type="button"
            className="ml-1 mr-1 flex-auto w-full"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog >
  );
}
