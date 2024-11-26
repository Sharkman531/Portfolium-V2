export async function call({ uri, method = "GET", body }) {

    const token = localStorage.getItem("token"); 

    const response = await fetch(`http://localhost:2025/api/${uri}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'auth-token': token })
        },
        body: body ? JSON.stringify(body) : null, 
    });

    if (!response.ok) {
        console.error("Error en la solicitud:", response.status);
        throw await response.json(); 
    }

    return response.json();  
}