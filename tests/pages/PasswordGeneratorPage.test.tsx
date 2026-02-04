import { render, screen } from "@testing-library/react";
import PasswordGeneratorPage from "../../src/features/password-generator/pages/PasswordGeneratorPage";
import userEvent from "@testing-library/user-event";

describe("PasswordGeneratorPage", () => {
  it("should render page with heading + initial state", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /password/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/no password generated/i)).toBeInTheDocument();
  });

  it("should display error when user clicks generate and character length is 0", async () => {
    const { clickButton } = renderComponent();
    await clickButton(/generate/i);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(await screen.findByText(/password length/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /close/i }),
    ).toBeInTheDocument();
  });
});

const renderComponent = () => {
  render(<PasswordGeneratorPage />);
  const btnCopy = screen.getByRole("button", { name: /copy/i });
  const btnGenerate = screen.getByRole("button", { name: /generate/i });
  const sliderCharLength = screen.getByRole("slider", { name: /length/i });
  const checkboxUpper = screen.getByRole("checkbox", { name: /upper/i });
  const checkboxLower = screen.getByRole("checkbox", { name: /lower/i });
  const checkboxNumber = screen.getByRole("checkbox", { name: /number/i });
  const checkboxSymbol = screen.getByRole("checkbox", { name: /symbols/i });

  const user = userEvent.setup();

  const toggleCheckbox = async (name: RegExp) => {
    const checkbox = screen.getByRole("checkbox", { name: name });
    await user.click(checkbox);
  };

  const clickButton = async (name: RegExp) => {
    const button = screen.getByRole("button", { name: name });
    await user.click(button);
  };

  const setSlider = async (value: number) => {
    await user.clear(sliderCharLength);
    await user.type(sliderCharLength, String(value));
  };
  return {
    btnCopy,
    btnGenerate,
    checkboxUpper,
    checkboxLower,
    checkboxNumber,
    checkboxSymbol,
    sliderCharLength,
    toggleCheckbox,
    clickButton,
    setSlider,
  };
};
