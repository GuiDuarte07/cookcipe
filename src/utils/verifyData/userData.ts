
export const isValidEmail = (email: string | null | undefined): boolean => {
  if (typeof email !== 'string' || !email) 
    return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export const isValidPassword = (password: string | null | undefined): boolean => {
  if (typeof password !== 'string' || !password)
    return false;

  return password?.length >= 4 && password?.length <= 20;
}