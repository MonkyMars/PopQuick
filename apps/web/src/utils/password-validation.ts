interface PasswordRequirement {
  id: string;
  text: string;
  validator: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  {
    id: "length",
    text: "At least 8 characters",
    validator: (password) => password.length >= 8,
  },
  {
    id: "uppercase",
    text: "One uppercase letter",
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: "lowercase",
    text: "One lowercase letter",
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: "number",
    text: "One number",
    validator: (password) => /\d/.test(password),
  },
  {
    id: "special",
    text: "One special character",
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];
