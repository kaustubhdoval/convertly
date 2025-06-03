
// Resize function
const handleResize = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  for (let file of selectedFiles) {
    formData.append("files", file);
  }
  formData.append("width", resizeWidth);
  formData.append("height", resizeHeight);

  const response = await fetch("http://<server-ip>:8000/resize", {
    method: "POST",
    body: formData,
  });

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "resized_images.zip";
  a.click();
};
