import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { uploadImage } from "../../utils/imageUpload";

const ProductImageUpload = ({ register, imageUrls, getProductImageUrls }) => {
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    getProductImageUrls(uploadImageCloudinary.url);
  };

  return (
    <div>
      <label htmlFor="uploadImageInput">
        <div className="p-2 bg-lighterDark border rounded h-32 w-full flex justify-center items-center cursor-pointer">
          <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
            <span className="text-4xl">
              <FaCloudUploadAlt />
            </span>
            <p className="text-sm">Upload Product Image</p>
            <input
              {...register("productImages")}
              type="file"
              id="uploadImageInput"
              className="hidden"
              onChange={handleUploadProduct}
            />
          </div>
        </div>
      </label>
      <div>
        {imageUrls.length ? (
          <div className="flex items-center gap-2">
            {imageUrls?.map((url) => (
              <div className="relative group" key={url}>
                <img
                  src={url}
                  alt={"product image"}
                  width={80}
                  height={80}
                  className="bg-lighterDark border cursor-pointer"
                />

                <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer">
                  <MdDelete />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-600 text-xs">*Please upload product image</p>
        )}
      </div>
    </div>
  );
};
export default ProductImageUpload;
