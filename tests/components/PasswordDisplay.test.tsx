import { render, screen } from "@testing-library/react";
import PasswordDisplay, {
  type PasswordDisplayProps,
} from "../../src/features/password-generator/components/PasswordDisplay";

import userEvent from "@testing-library/user-event";

describe("PasswordDisplay", () => {
  it("should render with accessible text when password is null", () => {
    const { display } = renderComponent({ password: null });
    expect(display).toHaveTextContent(/no password generated/i);
  });

  it("should call onError when user tries to copy with no password", async () => {
    const onError = vi.fn();
    const { user, btnCopy } = renderComponent({
      password: null,
      onError,
    });
    await user.click(btnCopy);

    expect(onError).toHaveBeenCalledWith(expect.stringMatching(/no password/i));
  });

  it("should show copied message when user copies valid password", async () => {
    const { btnCopy, user, copyStatus } = renderComponent({
      password: "1r%tb/19w8I",
    });

    await user.click(btnCopy);
    expect(copyStatus).toHaveTextContent(/copied/i);
  });

  it("should show password in display when passed valid password", () => {
    const password = "1r%tb/19w8I";
    const { display } = renderComponent({
      password,
    });

    expect(display).toHaveTextContent(password);
  });
});

const renderComponent = ({ password, onError }: PasswordDisplayProps) => {
  render(<PasswordDisplay password={password} onError={onError} />);
  const display = screen.getByLabelText(/password display/i);
  const btnCopy = screen.getByRole("button", { name: /copy/i });
  const copyStatus = screen.getByRole("status");
  const user = userEvent.setup();

  return { display, btnCopy, user, copyStatus };
};
