import { Post } from "src/posts/entities/post.entity";
import { User } from "../entities/user.entity";

export class UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
    emailVerified?: boolean;
    profilePicture?: string;
    phone?: string;
    birthDate?: string;
    oldPassword?: string;
    city?: string;
    achievements?: string;
    friends?: User[];
    notifications?: Notification[];
    recentSearches?: string[];
    wishList?: string[];
    redes?: string[];
    posts?: Post[];
    histories?: History[];
    comments?: Comment[];
    favorites?: Post[];
    likedPosts?: Post[];
    isAdmin?: boolean;
    googleId?: string;
    facebookId?: string;
    momId?: string;
    dadId?: string;
    brotherIds?: string[];
    unclesIds?: string[];
    grandparentsIds?: string[];
    cousinsIds?: string[];
    familyIds?: string[];
    friendsIds?: string[];
  }
  