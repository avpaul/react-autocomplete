import classnames from "utils/classnames";
import "./index.css";

interface PlaceholderBlockProps {
  size?: number;
  shape?: "square" | "circle" | "rect";
}

const PlaceholderBlock = ({
  shape = "square",
  size = 16,
}: PlaceholderBlockProps) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={classnames("placeholder-block", shape)}
    />
  );
};

export default PlaceholderBlock;
