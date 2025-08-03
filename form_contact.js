document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#form");
    const afisare = document.querySelector("#value");
    const numar = document.querySelector("#credit");
    const button = document.getElementById("alien");

    var loginButton = document.getElementById("popup_login");
    var popup = null; // Track the popup element
    var duckImage = null; // Track the duck image element
    
    afisare.textContent = numar.value;
    
    numar.addEventListener("input", (event) => {
        afisare.textContent = event.target.value;
    });
    
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            const formData = new FormData(form);
            const data = {};
            
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Log the data to the console
            console.log(data);
            
            // Display an alert to confirm submission
            alert("Form submitted successfully!");
        });
    }

    async function get_credentials() {
        const response = await fetch("login.json");
        const data = await response.json();
        return { username: data.username, password: data.password };
    }

    let user, pass;
    get_credentials().then(credentials => {
        user = credentials.username;
        pass = credentials.password;
    });

    function login_popup() {
        if (popup) {
            document.body.removeChild(popup);
            popup = null;
            return;
        }

        if (sessionStorage.getItem("loggedIn") === "true") {
            // Create the toggle popup elements
            popup = document.createElement("div");
            var toggleButton = document.createElement("button");
            var logoutButton = document.createElement("button");
            
            // Set attributes and text content
            popup.style.position = "fixed";
            popup.style.top = "50%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, -50%)";
            popup.style.padding = "20px";
            popup.style.backgroundColor = "white";
            popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
            popup.style.zIndex = "1000";
            
            toggleButton.textContent = "Toggle Duck Image";
            logoutButton.textContent = "Logout";
            
            // Append buttons to the popup
            popup.appendChild(toggleButton);
            popup.appendChild(logoutButton);
            
            // Append popup to the body
            document.body.appendChild(popup);
            
            // Handle toggle button click
            toggleButton.onclick = function() {
                if (duckImage) {
                    document.body.removeChild(duckImage);
                    duckImage = null;
                    sessionStorage.removeItem("duckImageVisible");
                } else {
                    duckImage = document.createElement("img");
                    duckImage.src = "duck_dancing.gif";
                    duckImage.style.position = "fixed";
                    duckImage.style.top = "50%";
                    duckImage.style.left = "50%";
                    duckImage.style.transform = "translate(-50%, -50%)";
                    duckImage.style.width = "50%";
                    duckImage.style.height = "50%";
                    duckImage.style.opacity = "0.1";
                    duckImage.style.zIndex = "5";
                    document.body.appendChild(duckImage);
                    sessionStorage.setItem("duckImageVisible", "true");
                }
            };

            // Handle logout button click
            logoutButton.onclick = function() {
                sessionStorage.removeItem("loggedIn");
                sessionStorage.removeItem("duckImageVisible");
                if (duckImage) {
                    document.body.removeChild(duckImage);
                    duckImage = null;
                }
                loginButton.textContent = "Are you the dev?";
                document.body.removeChild(popup);
                popup = null;
            };
        } else {
            // Create the login popup elements
            popup = document.createElement("div");
            var form = document.createElement("form");
            var usernameLabel = document.createElement("label");
            var usernameInput = document.createElement("input");
            var passwordLabel = document.createElement("label");
            var passwordInput = document.createElement("input");
            var submitButton = document.createElement("button");
            
            // Set attributes and text content
            popup.style.position = "fixed";
            popup.style.top = "50%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, -50%)";
            popup.style.padding = "20px";
            popup.style.backgroundColor = "white";
            popup.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
            popup.style.zIndex = "1000";
            
            usernameLabel.textContent = "Username:";
            usernameInput.type = "text";
            usernameInput.name = "username";
            
            passwordLabel.textContent = "Password:";
            passwordInput.type = "password";
            passwordInput.name = "password";
            
            submitButton.type = "submit";
            submitButton.textContent = "Login";
            
            // Append elements to the form
            form.appendChild(usernameLabel);
            form.appendChild(usernameInput);
            form.appendChild(document.createElement("br"));
            form.appendChild(passwordLabel);
            form.appendChild(passwordInput);
            form.appendChild(document.createElement("br"));
            form.appendChild(submitButton);
            
            // Append form to the popup
            popup.appendChild(form);
            
            // Append popup to the body
            document.body.appendChild(popup);
            
            // Handle form submission
            form.onsubmit = function(event) {
                event.preventDefault();
                var username = usernameInput.value;
                var password = passwordInput.value;
                
                // Simple check (replace with actual authentication logic)
                if (username === user && password === pass) {
                    alert("Hey Anto!");
                    sessionStorage.setItem("loggedIn", "true");
                    loginButton.textContent = "anto";
                    document.body.removeChild(popup);
                    popup = null;

                    // Set the background image with 10% opacity
                    duckImage = document.createElement("img");
                    duckImage.src = "duck_dancing.gif";
                    duckImage.style.position = "fixed";
                    duckImage.style.top = "50%";
                    duckImage.style.left = "50%";
                    duckImage.style.transform = "translate(-50%, -50%)";
                    duckImage.style.width = "50%";
                    duckImage.style.height = "50%";
                    duckImage.style.opacity = "0.1";
                    duckImage.style.zIndex = "5";
                    document.body.appendChild(duckImage);
                    sessionStorage.setItem("duckImageVisible", "true");
                } else {
                    alert("Haha you're not gettin in!");
                }
            };
        }
    }

    function applyAlienMode() {
        document.body.style.background = "linear-gradient(to bottom, grey, chartreuse)";
        
        var h1 = document.querySelector("h1");
        if (h1) {
            h1.style.backgroundColor = "green";
        }

        var otherHeadings = document.querySelectorAll("h2, h3, h4, h5, h6");
        otherHeadings.forEach(function(heading) {
            heading.style.backgroundColor = "darkgreen";
        });

        var splatter = document.getElementById("splatter");
        if (splatter) {
            splatter.style.filter = "invert(1)";
        }

        var logo = document.getElementById("logo");
        if (logo) {
            logo.style.filter = "invert(1)";
        }

        // Change the color of even rows
        var evenRows = document.querySelectorAll("tr:nth-child(odd)");
        evenRows.forEach(function(row) {
            row.style.backgroundColor = "green";
        });

        // Change the color of the range socket
        var rangeSocket = document.querySelector("#credit");
        if (rangeSocket) {
            rangeSocket.style.accentColor = "green";
        }
    }

    function revertAlienMode() {
        document.body.style.background = "";
        
        var h1 = document.querySelector("h1");
        if (h1) {
            h1.style.backgroundColor = "";
        }

        var otherHeadings = document.querySelectorAll("h2, h3, h4, h5, h6");
        otherHeadings.forEach(function(heading) {
            heading.style.backgroundColor = "";
        });

        var splatter = document.getElementById("splatter");
        if (splatter) {
            splatter.style.filter = "";
        }
        
        var logo = document.getElementById("logo");
        if (logo) {
            logo.style.filter = "";
        }

        // Revert the color of odd rows
        var evenRows = document.querySelectorAll("tr:nth-child(odd)");
        evenRows.forEach(function(row) {
            row.style.backgroundColor = "";
        });

        // Revert the color of the range socket
        var rangeSocket = document.querySelector("#credit");
        if (rangeSocket) {
            rangeSocket.style.accentColor = "";
        }
    }

    function toggleAlienMode() {
        if (localStorage.getItem("alienMode") === "true") {
            revertAlienMode();
            localStorage.setItem("alienMode", "false");
        } else {
            applyAlienMode();
            localStorage.setItem("alienMode", "true");
        }
    }

    if (button) {
        button.addEventListener("click", toggleAlienMode);
    }

    if (loginButton) {
        loginButton.addEventListener("click", login_popup);
    }

    // Apply the mode based on the saved state
    if (localStorage.getItem("alienMode") === "true") {
        applyAlienMode();
    }

    // Check session storage for login status
    if (sessionStorage.getItem("loggedIn") === "true") {
        loginButton.textContent = "anto";
    }

    // Check session storage for duck image visibility
    if (sessionStorage.getItem("duckImageVisible") === "true") {
        duckImage = document.createElement("img");
        duckImage.src = "duck_dancing.gif";
        duckImage.style.position = "fixed";
        duckImage.style.top = "50%";
        duckImage.style.left = "50%";
        duckImage.style.transform = "translate(-50%, -50%)";
        duckImage.style.width = "50%";
        duckImage.style.height = "50%";
        duckImage.style.opacity = "0.1";
        duckImage.style.zIndex = "5";
        document.body.appendChild(duckImage);
    }
});