export type Chr = {
  id: string;
  name: string;
  address: string;
  description: string;
  average_budget: number;
  images: {
    link: string;
  }[];
  type: string;
  additional_info: string | number;
};

export type PhotoModalType = {
  imageSrc: string;
  onClose: () => void;
};
