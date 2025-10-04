"use client";

import { Prisma, Product } from "@prisma/client";
import { createContext, ReactNode, useCallback, useState } from "react";

export const removeCpfPunctuation = (cpf: string) => {
  return cpf.replace(/\D/g, "");
};

export interface CartProduct
  extends Pick<Product, "id" | "name" | "price" | "imageUrl" | "restaurantId"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  total: number;
  totalQuantity: number;
  restaurant?: Prisma.RestaurantGetPayload<{}>;
  consumptionMethod: string;
  toggleCart: () => void;
  addProduct: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  total: 0,
  totalQuantity: 0,
  products: [],
  restaurant: undefined,
  consumptionMethod: "TAKEAWAY",
  toggleCart: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProduct: () => {},
  clearCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
  restaurant: Prisma.RestaurantGetPayload<{}>;
  consumptionMethod: string;
}

export const CartProvider = ({
  children,
  restaurant,
  consumptionMethod,
}: CartProviderProps) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
  const totalQuantity = products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  const toggleCart = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const addProduct = useCallback(
    (product: CartProduct) => {
      // Verifica se o produto é de um restaurante diferente. Se for, limpa a sacola.
      const isDifferentRestaurant =
        products.length > 0 &&
        products[0].restaurantId !== product.restaurantId;

      const newProducts = isDifferentRestaurant ? [] : [...products];

      const productInCart = newProducts.find((p) => p.id === product.id);

      if (productInCart) {
        // Se o produto já está na sacola, atualiza a quantidade
        const updatedProducts = newProducts.map((p) =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + product.quantity }
            : p,
        );
        setProducts(updatedProducts);
      } else {
        // Se o produto não está na sacola, adiciona
        setProducts([...newProducts, product]);
      }
    },
    [products],
  );
  const decreaseProductQuantity = useCallback((productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        if (prevProduct.quantity === 1) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  }, []);
  const increaseProductQuantity = useCallback((productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) {
          return prevProduct;
        }
        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  }, []);
  const removeProduct = useCallback((productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  }, []);
  const clearCart = useCallback(() => {
    setProducts([]);
  }, []);
  return (
    <CartContext.Provider
      value={{
        isOpen,
        products,
        toggleCart,
        addProduct,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProduct,
        clearCart,
        total,
        totalQuantity,
        restaurant,
        consumptionMethod,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};