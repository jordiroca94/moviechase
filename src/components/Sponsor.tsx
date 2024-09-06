import Image from "next/image";
import SponsorImage from "../../public/images/diverbook.png";
import Grid from "./ui/Grid";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Container from "./ui/Container";

const Sponsor = () => {
  return (
    <Container className="pt-6 lg:pt-12">
      <Grid>
        <div className="col-span-4 sm:col-span-6 sm:col-start-2 lg:col-start-3 lg:col-span-8">
          <a href="https://diverbook.vercel.app/" target="_blank">
            <Image
              className="object-cover max-h-80 border border-white"
              src={SponsorImage}
              alt="Diverbook Sponsor"
            />
          </a>
          <a
            href="https://diverbook.vercel.app/"
            target="_blank"
            className="hover:underline"
          >
            <div className="flex justify-end mt-2 items-center gap-1">
              <span className="text-sm">Sponsored</span>
              <IoMdInformationCircleOutline />
            </div>
          </a>
        </div>
      </Grid>
    </Container>
  );
};

export default Sponsor;
