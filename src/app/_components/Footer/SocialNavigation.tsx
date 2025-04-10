import NavLink from '../UI/NavLink';
import { FaFacebook, FaYoutube, FaInstagram, FaDiscord } from 'react-icons/fa6';

function SocialNavigation() {
  return (
    <ul className="flex items-center gap-4 text-2xl text-white">
      <li>
        <NavLink type="footerNav" href="https://www.facebook.com/weepui.bh">
          <FaFacebook />
        </NavLink>
      </li>
      <li>
        <NavLink type="footerNav" href="https://www.youtube.com/@huybui1131">
          <FaYoutube />
        </NavLink>
      </li>
      <li>
        <NavLink
          type="footerNav"
          href="https://www.instagram.com/weepui.nouseins"
        >
          <FaInstagram />
        </NavLink>
      </li>
      <li>
        <NavLink type="footerNav" href="https://discord.gg/ZfkkPbvy">
          <FaDiscord />
        </NavLink>
      </li>
    </ul>
  );
}

export default SocialNavigation;
