import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfileCard({ profile }: { profile: Profile }) {

  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3">
      <Button variant="ghost" className="relative h-8 w-8 rounded-full" disabled={true}>
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarFallback>{profile.display_name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Button>
      <h3 className="mt-3 text-xl font-semibold">{profile.display_name}</h3>
      <h4 className="text-lg font-light">
        <a href={"mailto: " + profile.email}>
          {profile.email}
        </a>
      </h4>
      <p>{profile.biography ? profile.biography : ""}</p>
    </div>
  );
}
