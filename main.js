async function sendImage() {
    const input = document.getElementById("cameraInput");
    if (!input.files.length) return alert("画像を選択してください");

    const file = input.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://172.20.10.7:5000/predict", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    document.getElementById("result").innerText =
        `総合スコア: ${data.total}\n評価: ${data.evaluation}\nアドバイス: ${data.advice}`;
}
