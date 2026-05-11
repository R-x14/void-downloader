async function downloadMedia(mode) {

    const url = document.getElementById("url").value;

    const terminal =
        document.getElementById("terminal");

    if (!url) {

        terminal.innerHTML =
            "Please enter TikTok URL";

        return;
    }

    // LOADING STEPS

    const steps = [

        "Processing request...",

        "Scanning TikTok URL...",

        "Extracting media...",

        "Preparing download...",

        "Finalizing..."

    ];

    let current = 0;

    terminal.innerHTML = steps[0];

    const animation = setInterval(() => {

        current++;

        if (current < steps.length) {

            terminal.innerHTML =
                steps[current];
        }

    }, 800);

    try {

        const response = await fetch("/download", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                url: url,
                mode: mode

            })

        });

        const data = await response.json();

        clearInterval(animation);

        // SUCCESS

        if (data.status === "success") {

            terminal.innerHTML =
                "Download ready ✔";

            window.location.href =
                "/file?path=" +
                encodeURIComponent(data.file);

        }

        // ERROR

        else {

            terminal.innerHTML =
                data.message;
        }

    }

    catch (error) {

        clearInterval(animation);

        terminal.innerHTML =
            "Unexpected server error";
    }
}
// TOGGLE POPUP

function togglePlatforms(){

    const popup =
        document.getElementById(
            "platformPopup"
        );

    if(
        popup.style.display === "flex"
    ){

        popup.style.display = "none";

    }

    else{

        popup.style.display = "flex";
    }
}

// CLOSE WHEN CLICK OUTSIDE

window.addEventListener("click", function(e){

    const popup =
        document.getElementById(
            "platformPopup"
        );

    if(e.target === popup){

        popup.style.display = "none";
    }
});

// ANY LINK SCAN

function scanAnyLink(){

    const input =
        document.getElementById(
            "anyLinkInput"
        ).value;

    const terminal =
        document.getElementById(
            "scanTerminal"
        );

    const actions =
        document.getElementById(
            "scanActions"
        );

    if(!input){

        terminal.innerHTML =
            "Please enter media link";

        return;
    }

    actions.style.display = "none";

    const steps = [

        "Scanning link...",

        "Detecting media type...",

        "Checking downloadable content...",

        "Preparing results..."

    ];

    let index = 0;

    terminal.innerHTML = steps[0];

    const animation = setInterval(() => {

        index++;

        if(index < steps.length){

            terminal.innerHTML =
                steps[index];
        }

    }, 1000);

    setTimeout(() => {

        clearInterval(animation);

        // DETECT TYPE

        let detected = "Unknown File";

        if(
            input.includes("mp4") ||
            input.includes("video")
        ){

            detected = "Video File";

        }

        else if(
            input.includes("jpg") ||
            input.includes("png") ||
            input.includes("image")
        ){

            detected = "Image File";

        }

        else if(
            input.includes("mp3") ||
            input.includes("audio")
        ){

            detected = "Audio File";
        }

        terminal.innerHTML =

            "Detected: " + detected +
            "<br><br>" +
            "Download available ✔";

        actions.style.display = "grid";

    }, 4500);
}
