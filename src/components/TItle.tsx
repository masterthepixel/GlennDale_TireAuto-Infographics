const Title: React.FC<{ title: string; style?: React.CSSProperties }> = ({
  title,
  style,
}) => {
  return (
    <h3
      style={{
        zIndex: "999",
        color: "white",
        background: "red",
        padding: "1rem 2rem",
        borderRadius: "10px",
        margin: "0",
        ...style,
      }}
    >
      {title}
    </h3>
  );
};

export default Title;
