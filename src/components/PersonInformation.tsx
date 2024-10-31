import { getPerson } from "@/queries/queries";
import { PersonDetailType } from "@/types/common";
import { getAge, getDeathDate } from "@/utils/getAge";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import H1Title from "./ui/H1Title";

const PersonInformation = ({ id }: { id: number }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_URL_IMAGE;

  const [person, setPerson] = useState<PersonDetailType>();
  const [readMore, setReadMore] = useState(false);

  const fetchPerson = async () => {
    const res = await getPerson(id);
    setPerson(res);
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  const countWords = (str: string) => {
    return str
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  if (person) {
    return (
      <div className="grid grid-cols-8 lg:grid-cols-12 mt-header">
        <div className="col-span-full flex justify-between">
          <div className="flex flex-col w-full">
            <H1Title>{person.name}</H1Title>
            <div className="flex justify-between text-lightGray text-sm py-3">
              <div className="flex items-center gap-2">
                <p>{person.known_for_department}</p>{" "}
                {person.deathday && (
                  <div className="flex gap-1">
                    (<p>{dayjs(person.birthday).format("YYYY")}</p> -
                    <p>{dayjs(person.deathday).format("YYYY")}</p>)
                  </div>
                )}
              </div>
              <div className="sm:hidden flex items-center gap-2">
                <div className="border border-secondary rounded-full p-1">
                  <FaArrowTrendUp className="text-secondary size-4" />
                </div>
                <div className="text-white">{person.popularity}</div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex gap-8">
            <div className="flex flex-col justify-center items-center gap-2">
              <div className="uppercase text-lightGray">Popularity</div>
              <div className="flex items-center gap-2">
                <div className="border border-secondary rounded-full p-1">
                  <FaArrowTrendUp className="text-secondary size-4" />
                </div>
                <div>{person.popularity}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 sm:col-span-2 lg:col-span-3 py-3 sm:py-6">
          <img src={`${URL_IMAGE + person.profile_path}`} alt={person.name} />
        </div>
        <div className="col-span-8 sm:col-span-6 lg:col-span-9 sm:pl-10 py-3 sm:py-6 flex flex-col justify-between">
          <div
            className={`${
              !readMore && "line-clamp-[15]"
            } text-justify sm:line-clamp-none`}
          >
            {person.biography}
          </div>

          {person.biography.length > 0 &&
            countWords(person.biography) > 100 && (
              <div className={`${readMore && "hidden"} sm:hidden`}>
                <button
                  onClick={() => setReadMore(true)}
                  className="hover:underline hover:text-secondary font-bold"
                >
                  Read more
                </button>
              </div>
            )}
          <div>
            <div className="flex gap-2 mt-4">
              {person.birthday ||
                (person.place_of_birth && <p className="font-bold">Born:</p>)}
              <span>
                {person.birthday &&
                  dayjs(person.birthday).format("MMMM D, YYYY")}{" "}
                {person.place_of_birth && (
                  <span className="text-lightGray">
                    ({person.place_of_birth})
                  </span>
                )}
              </span>
            </div>
            {person.deathday && (
              <div className="flex gap-2">
                <p className="font-bold">Died:</p>
                <span>
                  {dayjs(person.deathday).format("MMMM D, YYYY")}{" "}
                  <span className="text-lightGray">
                    ({getDeathDate(person.birthday, person.deathday)})
                  </span>{" "}
                </span>
              </div>
            )}
            {!person.deathday && (
              <div className="flex gap-2">
                <p className="font-bold">Age:</p>
                <p>{getAge(person.birthday)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default PersonInformation;
