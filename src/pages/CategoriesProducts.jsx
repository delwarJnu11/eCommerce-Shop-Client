import { useParams } from "react-router-dom";

const CategoriesProducts = () => {
  const params = useParams();
  return <div>{params.categoryName}</div>;
};
export default CategoriesProducts;
