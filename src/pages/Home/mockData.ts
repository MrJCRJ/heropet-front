export interface MonthlyStock {
  month: number;
  year: number;
  stock: number;
  purchases: number;
  sales: number;
}

export interface MockProduct {
  id: number;
  name: string;
  brand: string;
  initialStock: number;
  monthlyStocks: MonthlyStock[];
}

export const generateMockProducts = (): MockProduct[] => {
  const products = [
    { name: "Ração Premium Cães Adultos", brand: "DogDeluxe" },
    { name: "Ração Standard Gatos Castrados", brand: "CatHealth" },
    { name: "Ração Filhotes Raças Pequenas", brand: "PuppyCare" },
    { name: "Ração para Pássaros Granívoro", brand: "BirdNature" },
    { name: "Ração para Peixes Tropicais", brand: "FishAqua" },
    { name: "Petisco Dental para Cães", brand: "DogDeluxe" },
    { name: "Areia Higiênica Gatos", brand: "CatHealth" },
  ];

  const currentDate = new Date();

  return products.map((p, i) => {
    const initialStock = Math.floor(Math.random() * 500) + 100;
    const monthlyStocks: MonthlyStock[] = [];
    let currentStock = initialStock;

    // Gera histórico dos últimos 12 meses
    for (let m = 11; m >= 0; m--) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() - m);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Gera valores mais realistas para compras e vendas
      const baseDemand = Math.floor(Math.random() * 30) + 10;
      const seasonalFactor = 1 + 0.5 * Math.sin(((month - 6) * Math.PI) / 6); // Variação sazonal
      const brandFactor = p.brand === "DogDeluxe" ? 1.3 : 1; // Marca mais popular

      const purchases =
        Math.floor(baseDemand * seasonalFactor * brandFactor * 1.5) + 15;
      const sales = Math.floor(baseDemand * seasonalFactor * brandFactor) + 5;

      // Atualiza estoque (não permite negativo)
      currentStock = Math.max(0, currentStock + purchases - sales);

      monthlyStocks.push({
        month,
        year,
        stock: currentStock,
        purchases,
        sales,
      });
    }

    return {
      id: i + 1,
      name: p.name,
      brand: p.brand,
      initialStock,
      monthlyStocks,
    };
  });
};

export const mockProducts = generateMockProducts();
