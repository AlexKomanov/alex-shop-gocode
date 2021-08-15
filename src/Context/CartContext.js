import { createContext, useState } from "react";

export const CartCtx = createContext();

export function CartContext({ children }) {
  const [list, setList] = useState([]);

  return (
    <CartCtx.Provider value={[list, setList]}>{children}</CartCtx.Provider>
  );
}
