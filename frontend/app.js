const BASE_URL = "http://127.0.0.1:8000/api";

// LOGIN
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${BASE_URL}/users/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.access) {
        localStorage.setItem("token", data.access);
        window.location.href = "index.html";
    } else {
        alert("Login failed");
    }
}

// LOAD RECORDS
async function loadRecords() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/records/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        let data = await response.json();

        const selectedCategory = document.getElementById("categoryFilter")?.value;

        if (selectedCategory && selectedCategory !== "all") {
            data = data.filter(record => record.category === selectedCategory);
        }

        const list = document.getElementById("recordsList");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = "<p class='text-center col-span-3'>No notes found 🚀</p>";
            return;
        }

        data.forEach(record => {
            const div = document.createElement("div");

            div.innerHTML = `
                <div class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                    <div class="text-lg font-semibold">${record.title}</div>
                    <div class="text-sm text-gray-600 mt-2">${record.content || ""}</div>

                    <div class="mt-2 text-xs bg-gray-200 inline-block px-2 py-1 rounded">
                        ${record.category}
                    </div>

                    <div class="flex gap-2 mt-4">
                        <button onclick="editRecord(${record.id})"
                            class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                            Edit
                        </button>

                        <button onclick="deleteRecord(${record.id})"
                            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                            Delete
                        </button>
                    </div>
                </div>
            `;

            list.appendChild(div);
        });

    } catch (err) {
        console.error(err);
        alert("Error loading notes");
    }
}

// DELETE
async function deleteRecord(id) {
    const token = localStorage.getItem("token");

    if (!confirm("Delete this note?")) return;

    await fetch(`${BASE_URL}/records/${id}/`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    loadRecords();
}

// NAVIGATION
function goToCreate() {
    window.location.href = "editor.html";
}

function editRecord(id) {
    window.location.href = `editor.html?id=${id}`;
}

// AUTO LOAD
if (window.location.pathname.includes("index.html")) {
    loadRecords();
}