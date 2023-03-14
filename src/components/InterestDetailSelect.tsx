import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { InterestList } from "../libs/InterestList";
import { pageSlideIn } from "../libs/variants";
import PageHeader from "./PageHeader";
import HeaderBackButton from "./HeaderBackButton";
import { InterestWithDetails } from "../libs/types";

interface InterestDetailSelectProps {
  onComplete: (data: InterestWithDetails[]) => void;
  closeModal: () => void;
  interests: string[];
}

interface Interest {
  title: string;
  interest: string;
  image: string;
  detail: string[];
}

interface InterestDetailFormData {
  [key: string]: string[];
}

export default function InterestDetailSelect({
  onComplete,
  closeModal,
  interests,
}: InterestDetailSelectProps) {
  const [detailList, setDetailList] = useState<Interest[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<InterestDetailFormData>();

  const onSubmit = (data: InterestDetailFormData) => {
    const favorites = Object.entries(data).map((item) => {
      return {
        name: item[0],
        detail: item[1] ? item[1] : [],
      };
    });

    onComplete(favorites);
  };

  useEffect(() => {
    console.log(interests);
    const detailList = InterestList.filter((item) =>
      interests.includes(item.title)
    );
    setDetailList(detailList);
  }, [interests]);

  return (
    <motion.div
      variants={pageSlideIn}
      initial="initial"
      animate="animate"
      className="h-full overflow-scroll"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="pt-16 px-4 pb-10">
        <PageHeader>
          <div className="flex items-center space-x-2">
            <HeaderBackButton onClick={closeModal} />
            <h1 className="text-xl whitespace-nowrap truncate">
              상세 관심사 선택
            </h1>
          </div>
          <button type="submit" className="text-xl">
            저장
          </button>
        </PageHeader>
        <div className="flex flex-col space-y-4">
          {detailList.map((interest, idx) => {
            return (
              <div key={idx} className="flex flex-col space-y-4">
                <header className="flex space-x-2 items-center">
                  <img src={interest.image} className="w-6" />
                  <p className="text-14">{interest.title}</p>
                </header>
                <div className="flex flex-wrap">
                  {interest.detail.map((detail, idx) => {
                    return (
                      <label
                        key={idx}
                        htmlFor={detail}
                        className={`p-2 mr-2 mb-2 border-2 border-solid flex justify-center items-center rounded text-12
                        ${
                          watch(interest.title) &&
                          watch(interest.title).includes(detail)
                            ? "border-blue-500"
                            : "border-gray-300"
                        }
                        `}
                      >
                        <input
                          {...register(interest.title)}
                          value={detail}
                          type="checkbox"
                          id={detail}
                          className="hidden"
                        />
                        <p>{detail}</p>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </motion.div>
  );
}