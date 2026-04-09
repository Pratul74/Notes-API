const BASE_URL = "http://127.0.0.1:8000/api";

let editingId = null;

// Get ID from URL
function getId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Load note if editing
async function loadNote() {
    const id = getId();
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    if (!id) return;

    editingId = id;
    document.getElementById("pageTitle").innerText = "Edit Note";

    const response = await fetch(`${BASE_URL}/records/${id}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    document.getElementById("title").value = data.title;
    document.getElementById("content").value = data.content;
    document.getElementById("category").value = data.category;
}

// SAVE (CREATE / UPDATE)
async function saveNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const category = document.getElementById("category").value;

    const token = localStorage.getItem("token");

    let url = `${BASE_URL}/records/`;
    let method = "POST";

    if (editingId) {
        url = `${BASE_URL}/records/${editingId}/`;
        method = "PUT";
    }

    await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, category })
    });

    alert(editingId ? "Updated ✅" : "Created ✅");

    window.location.href = "index.html";
}

// BACK
function goBack() {
    window.location.href = "index.html";
}

// AUTO LOAD
loadNote();