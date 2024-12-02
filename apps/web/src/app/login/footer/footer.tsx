import { faGoogle, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@repo/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface FooterProps {
  handleGoogleLogin: () => void;
  handleDiscordLogin: () => void;
}

const Footer: React.FC<FooterProps> = ({
  handleDiscordLogin,
  handleGoogleLogin,
}) => {
  return (
    <>
      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div className="socialLogin">
        <button
          type="button"
          className="googleButton"
          onClick={handleGoogleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} /> <label>Google</label>
        </button>
        <Button
          type="button"
          className="discordButton"
          onClick={handleDiscordLogin}
        >
          <FontAwesomeIcon icon={faDiscord} /> <label>Discord</label>
        </Button>
      </div>

      <div className="formFooter">
        <Link href="/signup">Don't have an account? Create account</Link>
      </div>
    </>
  );
};

export default Footer;