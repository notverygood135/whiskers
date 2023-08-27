import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ShopProducts from "./ShopProducts";
import ShopFilter from "./ShopFilter";
import styles from "./Shop.module.css";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cid = searchParams.get('cid') || 0;
  const s = searchParams.get('s');
  const min = searchParams.get('min') || 0;
  const max = searchParams.get('max') || 0;
  const search = searchParams.get('search')?.replace(' ', '%20') || 0;
  const { data, loading, error } = useFetch(`http://localhost:3000/products/${cid}/${s}/${min}/${max}/${search}`);

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  return (
    <>
    <div className={styles.shop}>
      <ShopFilter />
      <ShopProducts data={data} />
    </div>
    </>
  )
}