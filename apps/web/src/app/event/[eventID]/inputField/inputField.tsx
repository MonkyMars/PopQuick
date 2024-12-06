import React from "react";
import { Plus, Send } from "lucide-react";

interface InputFieldProps {
  messageInput: string;
  setMessageInput: (message: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  messageInput,
  setMessageInput,
}) => {
  return (
    <div className="inputContainer">
      <button>
        <Plus className="icon add" />
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        className="input"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button type="submit" disabled={!messageInput}>
        <Send
          className={`icon send ${messageInput ? "valid" : "invalid"}`}
        ></Send>
      </button>
    </div>
  );
};

export default InputField;
