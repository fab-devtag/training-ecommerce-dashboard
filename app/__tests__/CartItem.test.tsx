import { fireEvent, render, screen } from "@testing-library/react";
import { useCartActions } from "../contexts/CartContext";
import { CartItem } from "../components/CartItem";

jest.mock("../contexts/CartContext", () => ({
  useCartActions: jest.fn(),
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 10,
  description: "Test description",
  category: "electronics",
  image: "/test.jpg",
  rating: { rate: 4.5, count: 100 },
};

const mockCartItem = {
  product: mockProduct,
  quantity: 2,
};

describe("CartItem", () => {
  const mockUpdateQuantity = jest.fn();
  const mockRemoveItem = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCartActions as jest.Mock).mockReturnValue({
      updateQuantity: mockUpdateQuantity,
      removeItem: mockRemoveItem,
    });
  });

  it("should display product title", () => {
    render(<CartItem item={mockCartItem} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
  it("should display quantity", () => {
    render(<CartItem item={mockCartItem} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should display subtotal (price × quantity)", () => {
    render(<CartItem item={mockCartItem} />);
    expect(
      screen.getByText((content) => content.includes("$20"))
    ).toBeInTheDocument();
  });

  it("should call updateQuantity with +1 when increment button is clicked", async () => {
    render(<CartItem item={mockCartItem} />);
    const incrementQuantityButton = screen.getByText("+");
    fireEvent.click(incrementQuantityButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("should call removeItem when Remove button is clicked", async () => {
    render(<CartItem item={mockCartItem} />);
    const removeItemButton = screen.getByText("Remove");
    fireEvent.click(removeItemButton);
    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });
});
