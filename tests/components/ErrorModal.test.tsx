import { fireEvent, render, screen } from "@testing-library/react";
import type { ErrorModalProps } from "../../src/features/password-generator/components/ErrorModal";
import ErrorModal from "../../src/features/password-generator/components/ErrorModal";
import userEvent from "@testing-library/user-event";

describe("ErrorModal", () => {
  it("should render with heading + message + close button when errorMessage provided", () => {
    const { dialog } = renderComponent({ errorMessage: "test error message" });

    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /error/i })).toBeInTheDocument();
    expect(screen.getByText(/test error message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("should call handleClearError when user clicks close button", async () => {
    const handleClearError = vi.fn();
    const { clickButton } = renderComponent({
      errorMessage: "test error message",
      handleClearError,
    });

    await clickButton(/close/i);
    expect(handleClearError).toHaveBeenCalledTimes(1);
  });

  it("should call handleClearError when dialog is closed", async () => {
    const handleClearError = vi.fn();
    const { dialog } = renderComponent({
      errorMessage: "test error message",
      handleClearError,
    });

    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(handleClearError).toHaveBeenCalledTimes(1);
  });
});

const renderComponent = ({
  errorMessage,
  handleClearError,
}: ErrorModalProps) => {
  render(
    <ErrorModal
      errorMessage={errorMessage}
      handleClearError={handleClearError}
    />,
  );

  const dialog = screen.getByRole("dialog");
  const user = userEvent.setup();

  const clickButton = async (name: RegExp) => {
    const button = screen.getByRole("button", { name });
    await user.click(button);
  };

  return { dialog, clickButton, user };
};
