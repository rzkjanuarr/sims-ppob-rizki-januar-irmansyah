export type ProfileData = {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
};

export type ProfileUpdatePayload = {
  first_name: string;
  last_name: string;
};
