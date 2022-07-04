import { navBarItems } from "../../constants";
import "../../styles/components/header.scss";

interface IHeaderProps {
  activeTab: navBarItems;
  setActiveTab: React.Dispatch<React.SetStateAction<navBarItems>>;
}

const Header = ({ activeTab, setActiveTab }: IHeaderProps) => {
  return (
    <div
      className="nav-tabs"
      onClick={(e) => {
        if ((e.target as HTMLParagraphElement).title === "my") {
          setActiveTab(navBarItems.MY_SHIFTS);
        } else if ((e.target as HTMLParagraphElement).title === "available") {
          setActiveTab(navBarItems.AVAILABLE_SHIFTS);
        }
      }}>
      <p className={`cursor-pointer ${activeTab === navBarItems.MY_SHIFTS ? "active" : ""}`} title="my">
        My shifts
      </p>
      <p className={`cursor-pointer ${activeTab === navBarItems.AVAILABLE_SHIFTS ? "active" : ""}`} title="available">
        Available shifts
      </p>
    </div>
  );
};

export default Header;
