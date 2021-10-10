export const constructMessageFromServer = (serverMsg: any, userName: string) => {
  let msg: any = {
    type: 'text',
    text: serverMsg.text,
    name: serverMsg.userName,
    reply: false,
    avatar: 'https://i.gifer.com/6oa.gif'
  }
  msg = serverMsg.userName === userName ? { ...msg, reply: true } : msg
  return msg;
};
