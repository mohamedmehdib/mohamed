let userName: string | null = null;

export function setUserName(name: string) {
  userName = name;
}

export function getUserName() {
  return userName;
}
