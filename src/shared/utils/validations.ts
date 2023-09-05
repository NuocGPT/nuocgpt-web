export const validateRegex = {
  password:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%()*#?&^<>])[A-Za-z\d@$!%()*#?&^<> ]{8,}$/,
  simplePassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  username: /^[\w.%+_//:a-zA-Z0-9-]{0,}$/,
};
