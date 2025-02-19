import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button } from "@repo/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface FooterProps {
  handleGoogleSignup: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleGoogleSignup }) => {
  return (
    <>
      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div className="socialSignup">
        <Button
          type="button"
          className="googleButton"
          onClick={handleGoogleSignup}
        >
          <FontAwesomeIcon icon={faGoogle} /> <label>Google</label>
        </Button>
      </div>

      <div className="formFooter">
        <Link href="/login">Already have an account? Log in!</Link>
      </div>
    </>
  );
};

export default Footer;
