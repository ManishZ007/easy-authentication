declare interface CreateUserProps {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

declare interface UpdateApiResponse {
  _id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
}

declare interface UpdateUserProps {
  id?: string;
  username?: string;
  email?: string;
}
