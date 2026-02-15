import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkModeContext } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
