export const imagetoBase64 = (image) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(image);

  //   const data = await new Promise((resolve, reject) => {
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  //   return data;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(image);
  });
};
