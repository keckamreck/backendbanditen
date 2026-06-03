export interface User {
  username: string,
  password: string
}

export async function checkUser(user: User) {
  const dummyUser: string = "Z2FnaWd1Z2Vnbw==";
  const dummyPassword: string = "JHJ4LTc4JA==";

  if(user.username == dummyUser && user.password == dummyPassword)
    return true;
    
  return false;
}