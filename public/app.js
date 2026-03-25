async function register() {
    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: regUser.value,
            password: regPass.value
        })
    });

    alert("Registered!");
}

async function login() {
    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: logUser.value,
            password: logPass.value
        })
    });

    const data = await res.json();
    alert(data.success ? "Logged in!" : "Error");
}

async function book() {
    await fetch("/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name.value,
            service: service.value,
            date: date.value
        })
    });

    alert("Booked!");
}

async function loadBookings() {
    const res = await fetch("/bookings");
    const data = await res.json();

    list.innerHTML = data.map(b =>
        `<li>${b.name} - ${b.service} - ${b.date}</li>`
    ).join("");
}
async function login() {
    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: logUser.value,
            password: logPass.value
        })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Logged in!");
    } else {
        alert("Error");
    }
}
