import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Searchbar } from "../components/Searchbar";
import { useDebounce } from "../hooks/useDebounce";

jest.mock("../hooks/useDebounce");

describe("Searchbar (mocked debounce)", () => {
  it("should call onSearch with mocked debounced value", async () => {
    const mockOnSearch = jest.fn();
    (useDebounce as jest.Mock).mockReturnValue("laptop");

    render(<Searchbar onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search products/i);
    await userEvent.type(input, "laptop");

    expect(mockOnSearch).toHaveBeenCalledWith("laptop");
  });
});
