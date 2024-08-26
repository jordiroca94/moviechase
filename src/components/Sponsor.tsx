import Image from "next/image";
import SponsorImage from "../../public/images/diverbook.png";
import Grid from "./ui/Grid";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Sponsor = () => {
  return (
    <div className="py-6 lg:py-12">
      <Grid>
        <div className="col-start-3 col-span-8">
          <Image
            className="object-cover max-h-80"
            src={SponsorImage}
            alt="Diverbook Sponsor"
          />
          <div className="flex justify-end mt-2 items-center gap-1">
            <span>Sponsored</span>
            <IoMdInformationCircleOutline />
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Sponsor;
