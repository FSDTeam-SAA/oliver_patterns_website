export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: UserProfile;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  dob: string | null;
  gender: string | null;
  role: "USER" | "ADMIN" | string;
  stripeAccountId: string | null;
  bio: string | null;
  isActive: boolean;
  profileImage: string;
  multiProfileImage: string[];
  pdfFile: string;
  otp: string | null;
  otpExpires: string | null;
  otpVerified: boolean;
  resetExpires: string | null;
  isVerified: boolean;
  refreshToken: string;
  hasActiveSubscription: boolean;
  subscriptionExpireDate: string | null;
  blockedUsers: string[];
  language: string;
  address: Address;
  username: string;
}

export interface Address {
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
}
