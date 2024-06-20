import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div style={{ padding: "0px 10px" }}>{children}</div>;
};

export default Container;
