export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
  }
  
  export interface Month {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
  }
  
  export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
  }
  
  export interface GetKpisResponse {
    id: string;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
  }
  export interface GetProductsResponse {
    id: string;
    price: number;
    expenses: number;
    transactions: Array<string>;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
    _id: string;
    __v: number;
  }
  export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
  }