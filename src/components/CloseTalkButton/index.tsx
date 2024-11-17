"use client";

import PrimaryButton from "../PrimaryButton";

interface CloseTalkButtonProps {
  name: string;
  talk: {
    isLive: boolean;
  };
}

const CloseTalkButton: React.FC<CloseTalkButtonProps> = ({ name, talk }) => {
  const handleToggleIsTalkLive = async () => {
    await fetch(`/api/talk/${name}`, {
      method: "PATCH",
    });

    window.location.reload();
  };

  return (
    <PrimaryButton
      onClick={handleToggleIsTalkLive}
      className={`absolute right-8 top-24 h-12 w-64 text-xl font-bold ${
        talk.isLive ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {talk.isLive ? "Fechar" : "Abrir"} sessão
    </PrimaryButton>
  );
};

export default CloseTalkButton;
