import { fireEvent, render, screen } from "@testing-library/react";
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

  it("should display error when generating and character length is 0", async () => {
    const { clickButton } = renderComponent();

    await clickButton(/generate/i);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(await screen.findByText(/password length/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /close/i }),
    ).toBeInTheDocument();
  });

  it("should display error when generating with no options selected", async () => {
    const { outputCharLength, sliderCharLength, setSlider, clickButton } =
      renderComponent();

    setSlider(3);
    expect(sliderCharLength).toHaveValue("3");
    expect(await outputCharLength).toHaveTextContent("3");
    await clickButton(/generate/i);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/(?=.*select)(?=.*one)(?=.*character)/i),
    ).toBeInTheDocument();
  });

  it("should display error when generating with length value less than number of options selected", async () => {
    const {
      setSlider,
      clickButton,
      user,
      checkboxLower,
      checkboxNumber,
      checkboxSymbol,
      checkboxUpper,
    } = renderComponent();

    setSlider(3);

    // Check all checkboxes
    for (const check of [
      checkboxLower,
      checkboxNumber,
      checkboxSymbol,
      checkboxUpper,
    ]) {
      await user.click(check);
    }

    for (const check of [
      checkboxLower,
      checkboxNumber,
      checkboxSymbol,
      checkboxUpper,
    ]) {
      expect(check).toBeChecked();
    }

    await clickButton(/generate/i);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/(?=.*short)(?=.*selected)(?=.*options)/i),
    ).toBeInTheDocument();
  });

  it("should display error when user tries to copy before generating password", async () => {
    const { clickButton } = renderComponent();
    await clickButton(/copy/i);
    screen.debug(undefined, Infinity);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(await screen.findByText(/no password to copy/i)).toBeInTheDocument();
  });
});

const renderComponent = () => {
  render(<PasswordGeneratorPage />);
  const btnCopy = screen.getByRole("button", { name: /copy/i });
  const btnGenerate = screen.getByRole("button", { name: /generate/i });
  const sliderCharLength = screen.getByRole("slider", { name: /length/i });
  const outputCharLength = screen.findByLabelText(/length output/i);
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

  const setSlider = (value: number) => {
    fireEvent.change(sliderCharLength, { target: { value } });
  };
  return {
    btnCopy,
    btnGenerate,
    checkboxUpper,
    checkboxLower,
    checkboxNumber,
    checkboxSymbol,
    sliderCharLength,
    outputCharLength,
    toggleCheckbox,
    clickButton,
    setSlider,
    user,
  };
};
