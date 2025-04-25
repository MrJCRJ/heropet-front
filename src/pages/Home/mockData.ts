import { ItemPedido, Pedido } from "../../api/pedidos";

// Interface para os produtos mockados
interface MockProduct {
  id: number;
  name: string;
  brand: string;
  currentStock: number;
}

const generateMockProducts = (): MockProduct[] => {
  const products = [
    { name: "Ração Premium Cães Adultos", brand: "DogDeluxe" },
    { name: "Ração Standard Gatos Castrados", brand: "CatHealth" },
    { name: "Ração Filhotes Raças Pequenas", brand: "PuppyCare" },
    { name: "Ração para Pássaros Granívoro", brand: "BirdNature" },
    { name: "Ração para Peixes Tropicais", brand: "FishAqua" },
    { name: "Petisco Dental para Cães", brand: "DogDeluxe" },
    { name: "Areia Higiênica Gatos", brand: "CatHealth" },
  ];

  return products.map((p, i) => ({
    id: i + 1,
    ...p,
    currentStock: Math.floor(Math.random() * 500) + 100,
  }));
};

const generateMockOrders = (products: MockProduct[]): Pedido[] => {
  const orders: Pedido[] = [];
  const currentDate = new Date();

  // Gerar pedidos para os últimos 12 meses
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);

    // 2-5 pedidos por mês
    const ordersCount = Math.floor(Math.random() * 4) + 2;

    for (let j = 0; j < ordersCount; j++) {
      const orderDate = new Date(date);
      orderDate.setDate(Math.floor(Math.random() * 28) + 1);

      const isPurchase = Math.random() > 0.5;
      const itemsCount = Math.floor(Math.random() * 4) + 1;
      const items: ItemPedido[] = [];

      let total = 0;
      for (let k = 0; k < itemsCount; k++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const quantity = Math.floor(Math.random() * 50) + 5;
        const unitPrice = Math.floor(Math.random() * 100) + 10;

        items.push({
          produto: product.name,
          quantidade: quantity,
          precoUnitario: unitPrice,
          total: quantity * unitPrice,
        });

        total += quantity * unitPrice;
      }

      orders.push({
        _id: `order_${i}_${j}`,
        tipo: isPurchase ? "COMPRA" : "VENDA",
        status: "CONCLUIDO",
        documentoClienteFornecedor: isPurchase
          ? `CNPJ_FORNECEDOR_${Math.floor(Math.random() * 10)}`
          : `CNPJ_CLIENTE_${Math.floor(Math.random() * 50)}`,
        nomeClienteFornecedor: isPurchase
          ? "Fornecedor Exemplo"
          : "Petshop Cliente",
        dataPedido: orderDate.toISOString(),
        itens: items,
        totalPedido: total,
        temNotaFiscal: Math.random() > 0.3,
      });
    }
  }

  return orders;
};

export const mockProducts = generateMockProducts();
export const mockOrders = generateMockOrders(mockProducts);
