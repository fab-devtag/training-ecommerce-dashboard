import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToCartButton } from "../components/AddToCartButton";
import { useCartActions } from "../contexts/CartContext";

jest.mock("../contexts/CartContext", () => ({
  useCartActions: jest.fn(),
}));

const mockProduct = {
  id: 1,
  title: "Test",
  price: 10,
  description: "Test",
  category: "test",
  image: "/test.jpg",
  rating: { rate: 4, count: 10 },
};

describe("AddToCartButton", () => {
  const mockAddItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartActions as jest.Mock).mockReturnValue({
      addItem: mockAddItem,
    });
  });

  it("should increment quantity when + button is clicked", async () => {
    render(<AddToCartButton product={mockProduct} />);
    const incrementQuantityButton = screen.getByText("+");
    fireEvent.click(incrementQuantityButton);
    expect(screen.getByText(2)).toBeInTheDocument();
  });

  it("should NOT decrement below 1", async () => {
    render(<AddToCartButton product={mockProduct} />);
    const decrementQuantityButton = screen.getByText("-");
    fireEvent.click(decrementQuantityButton);
    expect(screen.getByText(1)).toBeInTheDocument();
  });

  it("should call addItem with correct quantity", async () => {
    render(<AddToCartButton product={mockProduct} />);
    const incrementQuantityButton = screen.getByText("+");
    fireEvent.click(incrementQuantityButton);
    fireEvent.click(incrementQuantityButton);
    const addToCartButton = screen.getByText("Add to cart");
    fireEvent.click(addToCartButton);
    expect(mockAddItem).toHaveBeenCalledWith(mockProduct, 3);
  });

  it('should show "Added to Cart" message after adding', async () => {
    render(<AddToCartButton product={mockProduct} />);
    const addToCartButton = screen.getByText("Add to cart");
    fireEvent.click(addToCartButton);
    expect(screen.getByText("✓ Added to Cart")).toBeInTheDocument();
  });
});
