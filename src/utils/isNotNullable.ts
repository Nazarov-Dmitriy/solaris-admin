const isNotNullable = <T>(element: T | null | undefined): element is T =>
  typeof element !== "undefined" && element !== null;
export default isNotNullable