export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser extends LoginUser {
	fullname: string;
	// add interface for registering users
}
