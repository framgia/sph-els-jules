export const isValidFile = (file) => {
  return (
    file.type === "image/jpg" ||
    file.type === "image/jpeg" ||
    file.type === "image/png"
  );
};

export const checkFileUpload = (file, message) => {
  const isJpgOrPng = isValidFile(file);

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};
