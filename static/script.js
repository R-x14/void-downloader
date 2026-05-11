async function sendDownload(type) {

    const url = document.getElementById("url").value;
    const status = document.getElementById("status");

    if (!url) {
        status.innerHTML = "ENTER URL";
        return;
    }

    status.innerHTML = "PROCESSING...";

    const response = await fetch("/download", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: url,
            type: type
        })
    });

    const data = await response.json();

    if (data.status === "success") {

        status.innerHTML = "DOWNLOAD READY";

        window.location.href =
            `/file?path=${data.file}`;

    } else {

        status.innerHTML =
            "ERROR: " + data.message;
    }
}

function downloadVideo() {
    sendDownload("video");
}

function downloadAudio() {
    sendDownload("audio");
}
