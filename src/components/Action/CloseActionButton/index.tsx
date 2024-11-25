"use client";

import PrimaryButton from "../../PrimaryButton";

interface CloseActionButtonProps {
  id: string;
  action: {
    isLive: boolean;
  };
}

const CloseActionButton: React.FC<CloseActionButtonProps> = ({
  id,
  action,
}) => {
  const handleToggleIsActionLive = async () => {
    await fetch(`/api/actions/${id}`, {
      method: "PATCH",
    });

    window.location.reload();
  };

  return (
    <PrimaryButton
      onClick={handleToggleIsActionLive}
      className={`absolute right-4  top-24 h-12 w-32 text-lg font-bold md:right-8 md:w-64 md:text-xl ${
        action.isLive ? "bg-red-500" : "bg-green-500"
      }`}
    >
      {action.isLive ? "Fechar" : "Abrir"} ação
    </PrimaryButton>
  );
};

export default CloseActionButton;
