"use server";

import Link from "next/link";
import Image from "next/image";
import { getTopInteractedTags } from "@/lib/actions/tag.action";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({ userId: user._id });

  return (
    <div className="shadow-light100_darknone w-full max-xs:min-w-full">
      <Link href={`/profile/${user.clerkId}`} className="no-underline">
        <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
          <Image
            src={user.picture}
            alt="user profile picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-2">
              @{user.username}
            </p>
          </div>
        </article>
      </Link>
      <div className="mt-5 flex items-center gap-2 justify-center">
        {interactedTags.length > 0 ? (
          interactedTags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </div>
  );
};

export default UserCard;
