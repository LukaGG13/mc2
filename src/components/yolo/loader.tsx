import "../../styles/yolo/loader.css";

const Loader = (props: any) => {
  return (
    <div className="wrapper" {...props}>
      <div className="spinner"></div>
      <p>{props.children}</p>
    </div>
  );
};

export default Loader;
