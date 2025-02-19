import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@repo/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface FooterProps {
  handleGoogleLogin: () => void;
}

const Footer: React.FC<FooterProps> = ({
  handleGoogleLogin,
}) => {
  return (
    <>
      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div className="socialLogin">
        <Button
          type="button"
          className="googleButton"
          onClick={handleGoogleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} /> <label>Google</label>
        </Button>
      </div>

      <div className="formFooter">
        <Link href="/signup">Don't have an account? Create account</Link>
      </div>
    </>
  );
};

export default Footer;