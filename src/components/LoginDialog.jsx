import { registrationDialogId } from "../vars.js";
import LoginForm from "./LoginForm.jsx";
export default function LoginDialog() {
  return (
    <dialog id={registrationDialogId} closedby="any">
      <div>
        <button type="button" commandfor={registrationDialogId} command="close">
          ×
        </button>
      </div>

      <LoginForm />
    </dialog>
  );
}
