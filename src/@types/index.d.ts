/* eslint-disable @typescript-eslint/no-explicit-any */
interface Document {
  map(arg0: (d: any) => { value: any; label: any });
  docNumber: string;
  fullName: string;
  address: string;
  city: string;
  uf: string;
  cep: string;
  colabora: number;
  // eslint-disable-next-line camelcase
  moto_base: number;
  reason: number;
  dataEntr: Date;
  dataBaixa: Date;
  horaBaixa: Date;
  horaRec: Date;
  historico: string;
}

interface ModalProps {
  visible: boolean;
  children: React.FC;
}

declare module '*.png';
