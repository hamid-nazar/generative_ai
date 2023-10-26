import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserProps } from "../types/globalTypes";

export default function UserAvatar () {

    const user: UserProps = {
        firstName: "John",
        lastName: "Doe",
        profileImageUrl: ""
    }
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.profileImageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}