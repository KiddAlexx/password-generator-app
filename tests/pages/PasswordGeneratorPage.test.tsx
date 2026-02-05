import { fireEvent, render, screen } from "@testing-library/react";
import PasswordGeneratorPage from "../../src/features/password-generator/pages/PasswordGeneratorPage";
import userEvent from "@testing-library/user-event";
import { PASSWORD_CHAR_SETS } from "../../src/constants/passwordCharacters";
import { containsCharFromSet } from "../utils";

const { NUMBERS, UPPER, SYMBOLS, LOWER } = PASSWORD_CHAR_SETS;

describe("PasswordGeneratorPage", () => {
  it("should render page with heading + initial state", () => {
    const { display } = renderComponent();

    expect(
      screen.getByRole("heading", { name: /password/i }),
    ).toBeInTheDocument();
    expect(display).toHaveTextContent(/no password generated/i);
  });

  it("should display error when generating and character length is 0", async () => {
    const { clickButton } = renderComponent();

    await clickButton(/generate/i);
    expect(await screen.findByText(/error/i)).toBeInTheDocument();
    expect(await screen.findByText(/password length/i)).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: /close/i }),
    ).toBeInTheDocument();
    await clickButton(/close/i);
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
  });

  it("should display error when generating with no character options selected", async () => {
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

  it("should generate and display password when valid options selected + announce to screen readers", async () => {
    const {
      setSlider,
      clickButton,
      user,
      display,
      checkboxLower,
      checkboxNumber,
      checkboxSymbol,
      checkboxUpper,
    } = renderComponent();

    setSlider(20);

    // Check all checkboxes
    for (const check of [
      checkboxLower,
      checkboxNumber,
      checkboxSymbol,
      checkboxUpper,
    ]) {
      await user.click(check);
    }

    await clickButton(/generate/i);

    const password = display.textContent;
    expect(password).toHaveLength(20);
    expect(containsCharFromSet(password, UPPER)).toBe(true);
    expect(containsCharFromSet(password, LOWER)).toBe(true);
    expect(containsCharFromSet(password, NUMBERS)).toBe(true);
    expect(containsCharFromSet(password, SYMBOLS)).toBe(true);
    expect(screen.getByText(/password generated/i)).toBeInTheDocument();
  });

  it("should update strength indicator on the page", async () => {
    const {
      setSlider,
      strengthOutput,
      user,
      checkboxLower,
      checkboxNumber,
      checkboxSymbol,
      checkboxUpper,
      clickButton,
    } = renderComponent();

    setSlider(12);
    for (const check of [
      checkboxLower,
      checkboxNumber,
      checkboxSymbol,
      checkboxUpper,
    ]) {
      await user.click(check);
    }
    await clickButton(/generate/i);

    expect(strengthOutput).toHaveTextContent(/strong/i);
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
  const display = screen.getByLabelText(/password display/i);
  const strengthOutput = screen.getByLabelText(/password strength/i);

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
    display,
    strengthOutput,
    toggleCheckbox,
    clickButton,
    setSlider,
    user,
  };
};
