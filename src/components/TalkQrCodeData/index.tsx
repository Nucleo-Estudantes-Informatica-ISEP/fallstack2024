"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode.react";

import config from "@/config";
import { BASE_URL } from "@/services/api";

interface TalkQrCodeDataProps {
  name: string;
}

const TalkQrCodeData: React.FC<TalkQrCodeDataProps> = ({ name }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  useEffect(() => {
    const fetchQrCodeData = async () => {
      const res = await fetch(BASE_URL + `/talk/${name}`);
      const { talk, qrCode } = await res.json();
      setQrCodeData(qrCode as string);
    };

    fetchQrCodeData();

    const interval = setInterval(
      fetchQrCodeData,
      config.constants.talkQrCodeRefreshRateMs
    );

    return () => clearInterval(interval);
  }, [name]);

  return <div>{qrCodeData && <QRCode size={520} value={qrCodeData} />}</div>;
};

export default TalkQrCodeData;
