import styled from "@emotion/styled";
import { ArrowLeft, ArrowRight } from "../assets/icons";
import { getFriendlyKey } from "../utils";

type ListItemProps = {
  text: string;
  number: number;
  to: string;
  arrowLocation: "left" | "right";
};

function ListItem({ text, to, arrowLocation, number }: ListItemProps) {
  return (
    <LinkElement data-cy={getFriendlyKey(text)} href={to}>
      {arrowLocation === "left" && <ArrowLeft />}
      <LinkText data-cy={`${getFriendlyKey(text)}-title`}>
        {text}
      </LinkText> - {number}
      {arrowLocation === "right" && <ArrowRight />}
    </LinkElement>
  );
}

export default ListItem;

const LinkText = styled("span")({
  textDecoration: "underline",
});

const LinkElement = styled("a")({
  display: "flex",
  alignItems: "center",
  gap: ".5rem",
  fontWeight: 800,
  fontSize: ".875rem",
  lineHeight: "1.05rem",
  "&, &:hover": {
    color: "#000000",
  },
});
