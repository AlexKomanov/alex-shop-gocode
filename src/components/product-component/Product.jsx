import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Grid,
  CardHeader,
  Tooltip, Button,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContextWrapper";
import "./Product.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 500,
    padding: "0 10px 0 10px",
    objectFit: "contain",
  },
  media: {
    height: 200,
    width: 100,
    objectFit: "contain ",
    justify: "center",
  },
}));

const Product = ({ title, image, price, id }) => {
  const [list, setList] = useContext(CartContext);
  const [isAdd, setIsAdd] = useState(true);

  const classes = useStyles();

  function listHandler(product) {
    if (isAdd) {
      setIsAdd(false);
      setList([...list, product.id]);
    } else {
      setIsAdd(true);
      setList((prev) => prev.filter((item) => item !== product.id));
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component="img"
            alt={title}
            image={image}
            title={title}
          />
        </CardActionArea>
        <CardHeader
          action={
            isAdd ? (
              <Tooltip title="Add">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => listHandler({ id, title, image, price })}>
                  Add Item
                </Button>
              </Tooltip>
            ) : (
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => listHandler({ id, title, image, price })}>
                  Remove
                </Button>
            )
          }
          title={title}
        ></CardHeader>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Product;
