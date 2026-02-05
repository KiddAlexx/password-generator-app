import { render, screen } from "@testing-library/react";
import PasswordStrength, {
  type PasswordStrengthProps,
} from "../../src/features/password-generator/components/PasswordStrength";
import styles from "../../src/features/password-generator/styles/PasswordStrength.module.css";

describe("PasswordStrength", () => {
  it.each([
    { level: "empty", text: / /i, bars: 0 },
    { level: "too-weak", text: /too weak!/i, bars: 1 },
    { level: "weak", text: /weak/i, bars: 2 },
    { level: "medium", text: /medium/i, bars: 3 },
    { level: "strong", text: /strong/i, bars: 4 },
  ] as const)(
    "should render $level strength with $bars filled bars",
    ({ level, text, bars }) => {
      const { strengthOutput, filledBars } = renderComponent({ level });

      expect(strengthOutput).toHaveTextContent(text);
      expect(filledBars()).toHaveLength(bars);
    },
  );
});

const renderComponent = ({ level }: PasswordStrengthProps) => {
  const { container } = render(<PasswordStrength level={level} />);

  const strengthOutput = screen.getByLabelText(/password strength/i);

  const filledBars = () => container.querySelectorAll(`li.${styles.filled}`);

  return { strengthOutput, filledBars };
};
