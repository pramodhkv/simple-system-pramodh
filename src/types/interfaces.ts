export interface IRepository {
  id: string;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
}

export interface IUser {
  id: string;
  login: string;
  avatar_url: string;
}
