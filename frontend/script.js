function sendData(e){
    e.preventDefault();

    console.log("Button clicked");

    fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        })
    })
    .then(res => res.text())
    .then(data => {
        console.log("Response:", data);
        alert("Sent successfully 🚀");
    })
    .catch(err => {
        console.log("ERROR:", err);
    });
}