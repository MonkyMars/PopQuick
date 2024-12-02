import { faGoogle, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@repo/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface FooterProps {
  handleGoogleSignup: () => void;
  handleDiscordSignup: () => void;
}

const Footer: React.FC<FooterProps> = ({
  handleDiscordSignup,
  handleGoogleSignup,
}) => {
  return (
    <>
      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div className="socialSignup">
        <button
          type="button"
          className="googleButton"
          onClick={handleGoogleSignup}
        >
          <FontAwesomeIcon icon={faGoogle} /> <label>Google</label>
        </button>
        <Button
          type="button"
          className="discordButton"
          onClick={handleDiscordSignup}
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
