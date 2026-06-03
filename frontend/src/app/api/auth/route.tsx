import { User, checkUser } from '@/app/_models/user';
 
export async function POST(request: Request) {
  const json = await request.json();
  const user: User = {
    username: btoa(json.username),
    password: btoa(json.password)
  }
  const isUser: boolean = await checkUser(user);

  if(isUser) {
    return new Response('Authentication succesful!', {
      status: 200
    })
  }

  return new Response('Authentication failed!', {
    status: 401,
  })
}