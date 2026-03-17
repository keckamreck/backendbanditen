export async function signIn(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const response = await fetch('api/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  return response;
}