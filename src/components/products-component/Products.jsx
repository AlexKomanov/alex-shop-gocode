import { Grid } from "@material-ui/core";
import Product from "../product-component/Product";
import "./Products.css";

const Products = ({ products }) => {
  return (
    <section>
      <Grid container>
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </Grid>
    </section>
  );
};

export default Products;
