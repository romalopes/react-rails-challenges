import PropTypes from "prop-types";

function Button({ children, ...props }) {
  return (
    <button
      onClick={props.onClick}
      type="submit"
      className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      {...props}
    >
      {children}
    </button>
  );
}

PropTypes.Button = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
