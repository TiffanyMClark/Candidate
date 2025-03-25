// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  email: string;
  site_admin: boolean;
  type: string;
  name?: string;
  bio?: string;
}
