const BASE_URL = "http://localhost:8000";

// REGISTER
export async function register(email: string, password: string): Promise<{ access_token: string }> {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ⬅️ VAŽNO: omogućava cookie sa backend-a
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Registration failed");
  }

  return await response.json();
}

// LOGIN
export async function login(email: string, password: string): Promise<{ message: string }> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ⬅️ ključ za rad s cookie
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Login failed");
  }

  return await response.json(); // { message: "Login successful" }
}


// LOGOUT
export async function logout(): Promise<void> {
  await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include", // ⬅️ treba zbog brisanja cookie-ja
  });
}
