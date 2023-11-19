"use client";

import React from "react";
import QRCode from "qrcode.react";
import { toast } from "react-toastify";

import { UserWithProfile } from "@/types/UserWithProfile";
import { BASE_URL } from "@/services/api";

import { useDisableBodyScroll } from "../../hooks/disableBackgroundMoving";
// qr code components
import QRCodeScanner from "../QRCodeScanner";

import { BsFillClipboardFill, BsX } from "react-icons/bs";

interface QRCodeModalProps {
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserWithProfile;
}
const QRCodeModal: React.FC<QRCodeModalProps> = ({
  hidden,
  setHidden,
  user,
}) => {
  // disable body scroll
  useDisableBodyScroll({ modalIsHidden: hidden });

  const [processing, setProcessing] = React.useState(false);

  // handle scan
  const handleScan = async (data: string) => {
    if (!data.includes(window.location.origin)) return;

    try {
      setProcessing(true);

      new URL(data);

      const studentCode = data.split("/").pop();

      const res = await fetch(`${BASE_URL}/companies/history`, {
        method: "POST",
        body: JSON.stringify({
          studentCode: studentCode,
        }),
      });

      if (res.status === 201) {
        toast.success("Perfil do estudante guardado com sucesso!");
      } else if (res.status === 200) {
        toast.success("Este perfil já foi guardado!");
      } else {
        toast.error("Ocorreu um erro ao guardar o perfil do estudante...");
      }

      setProcessing(false);

      /* it's dumb doing this for sure, but if i dont set a delay, on mobile, it wont let open the
       camera again and the user will need to close and open the modal again so, this is a workaround
       the user won't even feel the delay delay */
      setTimeout(() => {
        window.open(data, "_blank");
      }, 1000);
    } catch (error) {
      setProcessing(false);
      toast.error("Ocorreu um erro a dar scan no QR Code do estudante...");
    }
  };

  // student url
  const baseUrl = window.location.origin;

  const profileUrl =
    user.role === "STUDENT" && user.student
      ? `${baseUrl}/student/${user.student.code}`
      : "";

  const handleCopyClick = () => {
    if (user.student?.code) {
      navigator.clipboard.writeText(user.student?.code).catch(() => {});
    }
  };

  return !hidden ? (
    <div
      className="scrollbar-hide fixed inset-6 end-4 start-4 z-10 animate-fade-imm overflow-y-hidden rounded-lg transition-opacity sm:inset-4 sm:end-6 sm:start-6 md:inset-14 md:end-12 md:start-8  lg:inset-16 lg:end-14 lg:start-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen  items-center justify-center">
        <div className="max-w-7/8 relative w-full ">
          <div className="relative h-screen w-full transform bg-white text-left shadow-xl transition-all">
            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-10 cursor-pointer text-gray-500"
              style={{ pointerEvents: "auto" }}
              onClick={() => setHidden(true)}
            >
              <BsX size={34} />
            </button>
            <div className="flex min-h-screen items-start justify-center">
              <div className="max-w-7/8 w-full">
                <div className="relative h-screen p-10 text-center shadow-xl sm:p-0 md:p-0 lg:p-6">
                  <h1 className="mb-6 mt-3 text-3xl font-bold text-black sm:mb-0 sm:mt-6 sm:text-3xl md:text-4xl lg:text-6xl">
                    {user.role === "STUDENT" ? (
                      <>
                        Partilha o teu{" "}
                        <span className="text-primary">Perfil</span>
                      </>
                    ) : (
                      <>
                        Dá <span className="text-primary">scan</span> num
                        estudante
                      </>
                    )}
                  </h1>
                  {/* Grid */}
                  {user.role === "STUDENT" ? (
                    <div className="mt-10 grid grid-cols-1 sm:mt-0 sm:grid-cols-1 md:mt-6 md:grid-cols-2 lg:mt-20 xl:mt-44">
                      {/* left column */}
                      <div className="flex items-center justify-center ">
                        <QRCode size={250} value={profileUrl} />
                      </div>
                      {/* right column */}
                      <div className="flex items-center justify-center pb-0 pt-14 sm:pb-0 sm:pt-0">
                        <div className="flex flex-col items-center">
                          <div
                            className="rounded-lg bg-gray-200 p-2 sm:p-2 md:p-2"
                            onClick={handleCopyClick}
                          >
                            <div className="flex items-center">
                              <div className="w-56 cursor-pointer border-none bg-gray-200 p-2 text-center text-xl font-bold text-black focus:outline-none sm:w-56 sm:text-3xl md:w-72">
                                {user.student?.code}
                              </div>
                              <BsFillClipboardFill
                                style={{ fontSize: "1.5rem", color: "#718096" }}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                          <p className="lg-mr-0 mt-6 text-sm text-black sm:mr-6 md:mr-4 md:text-sm lg:text-base">
                            Partilha o teu <b>código</b> com as empresas de
                            forma a poderem <b>guardar</b> o teu perfil!
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-10 grid grid-cols-1 sm:mt-0 sm:grid-cols-1 md:mt-6 lg:mt-20 xl:mt-44">
                      <div className="flex items-center justify-center ">
                        {processing ? (
                          <div
                            className="mt-24 inline-block h-24 w-24 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                          >
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                              A processar...
                            </span>
                          </div>
                        ) : (
                          <QRCodeScanner handleScan={handleScan} />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default QRCodeModal;
