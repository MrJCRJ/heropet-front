// Para CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Para CSS global
declare module "*.css";
