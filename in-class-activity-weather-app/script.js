        // XMLHttpRequest
        document.getElementById("xhr-btn").addEventListener("click", doXHR);

        function doXHR() {
            let latitude = document.getElementById("latitude").value;
            let longitude = document.getElementById("longitude").value;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let respObj = JSON.parse(xhttp.responseText);
                    document.getElementById("weather-temperature").innerText = respObj.current.temperature_2m + " °C";
                    document.getElementById("fetch-type").innerText = "XMLHttpRequest";
                }
            };
            xhttp.open("GET", `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`);
            xhttp.send();
        }

        // Fetch with async/await
        document.getElementById("fetch-async-await-btn").addEventListener("click", doFetchWithAsyncAwait);

        async function doFetchWithAsyncAwait() {
            let latitude = document.getElementById("latitude").value;
            let longitude = document.getElementById("longitude").value;

            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }

                const data = await response.json();
                document.getElementById("weather-temperature").innerText = data.current.temperature_2m + " °C";
                document.getElementById("fetch-type").innerText = "async/await";
            } catch (error) {
                console.error("Fetch error: " + error);
            }
        }

        // Fetch with Promises
        document.getElementById("fetch-promises-btn").addEventListener("click", doFetchWithPromises);

        function doFetchWithPromises() {
            let latitude = document.getElementById("latitude").value;
            let longitude = document.getElementById("longitude").value;

            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weathercode`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    document.getElementById("weather-temperature").innerText = data.current.temperature_2m + " °C";
                    document.getElementById("fetch-type").innerText = "Promises";
                })
                .catch(error => {
                    console.error("Fetch error: " + error);
                });
        }