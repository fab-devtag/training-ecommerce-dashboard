import { render, screen } from "@testing-library/react";
import { Navbar } from "../components/Navbar";
import { useCartState } from "../contexts/CartContext";

jest.mock("../contexts/CartContext", () => ({
  useCartState: jest.fn(),
}));

describe("Navbar", () => {
  it("should display cart badge when itemCount > 0", () => {
    (useCartState as jest.Mock).mockReturnValue({ itemCount: 3 });
    render(<Navbar />);
    expect(screen.getByText(3)).toBeInTheDocument();
  });

  it("should NOT display badge when itemCount = 0", () => {
    (useCartState as jest.Mock).mockReturnValue({ itemCount: 0 });
    render(<Navbar />);
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("should have links to Dashboard, Products, and Cart", () => {
    (useCartState as jest.Mock).mockReturnValue({ itemCount: 0 });
    render(<Navbar />);
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByRole("link", { name: "🛒 Cart" })).toHaveAttribute(
      "href",
      "/cart"
    );
  });
});
