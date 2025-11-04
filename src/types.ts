export interface IceCreamProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
  category: 'topping' | 'size' | 'syrup';
}

export interface CartItem {
  product: IceCreamProduct;
  extras: ProductExtra[];
  size?: 'small' | 'medium' | 'large';
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  address: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  totalPrice: number;
  createdAt: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}