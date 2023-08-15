export default function config(token) {
    return { headers: { "Authorization": `Bearer ${token}` } };
}