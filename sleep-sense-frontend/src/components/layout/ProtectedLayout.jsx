import Navbar from "./Navbar";

export default function ProtectedLayout({ children, toggleTheme, mode }) {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} mode={mode} />
      {children}
    </>
  );
}
