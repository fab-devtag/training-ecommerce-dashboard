import { ProductCard } from "../components/ProductCard";
import { fireEvent, render, screen } from "@testing-library/react";
import { useCartActions } from "../contexts/CartContext";

jest.mock("../contexts/CartContext", () => ({
  useCartActions: jest.fn(),
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 19.99,
  description: "Test description",
  category: "electronics",
  image: "/test.jpg",
  rating: { rate: 4.5, count: 100 },
};

describe("ProductCard", () => {
  const mockAddItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartActions as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
    });
  });
  it("should render product title", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
  it("should render product price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });
  it("should call addItem when Add to Cart is clicked", () => {
    render(<ProductCard product={mockProduct} />);
    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });
});
