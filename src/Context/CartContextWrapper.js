import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextWrapper({ children }) {
  const [list, setList] = useState([]);

  return (
    <CartContext.Provider value={[list, setList]}>{children}</CartContext.Provider>
  );
}
