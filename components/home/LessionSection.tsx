import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
export default function LessionSection() {
  return (
    <div>
      {/*lessom*/}
      <div className="bg-gray-100 px-6 md:px-20 py-8 md:py-16 flex items-center md:justify-between md:gap-0 gap-4 md:flex-row flex-col">
        <div className="flex flex-col gap-2 md:gap-4 md:w-[45%]">
          <h1 className="text-[#002D69] font-bold text-3xl md:text-5xl md:w-[60%] ">
            Lessons from ₦2,500
          </h1>
          <p className="text-sm text-gray-900 font-semibold">
            You can pick from a variety of subjects to keep your child/ward
            learning from home. They can learn new topics, revise previously
            learnt ones and be managed by great tutors.
          </p>
          <Link href="" className="flex items-center gap-2">
            {" "}
            Learn More <ArrowRight size={16} />{" "}
          </Link>
        </div>
        <div>
          <Image
            src="/img/bg11.png"
            alt=""
            width={200}
            height={200}
            className="w-[550px]  "
          />
        </div>
      </div>

      {/*tutors*/}
      <div className="bg-[#03CCBC] px-6 md:px-20 py-8 md:py-16 flex items-center md:justify-between md:gap-0 gap-4 md:flex-row flex-col">
        <div>
          <Image
            src="/img/bg6.jpg"
            alt=""
            width={200}
            height={200}
            className="w-[550px] md:w-[450px]  "
          />
        </div>
        <div className="flex flex-col gap-2 md:gap-4 md:w-[55%]">
          <h1 className="text-[#002D69] font-bold text-3xl md:text-5xl ">
            Great tutors, you can easily pick
          </h1>
          <p className="text-sm text-gray-900 font-semibold">
            We interview the best tutors among equals, and you can choose a
            suitable match for your child as they are all subject experts from
            top academic institutions.
          </p>
        </div>
      </div>

      {/*lessom*/}
      <div className="bg-gray-100 px-6 md:px-20 py-8 md:py-16 flex items-center md:justify-between md:gap-0 gap-4 md:flex-row flex-col">
        <div className="flex flex-col gap-2 md:gap-4 md:w-[50%]">
          <h1 className="text-[#002D69] font-bold text-3xl md:text-5xl ">
            We are reliable
          </h1>
          <p className="text-sm text-gray-900 font-semibold">
            Our platform is trusted. Our lessons and strategies help students
            obtain great results and many lads use our platform and teachings to
            augment school activities. We presently work with a variety of
            tutors and students to overcome the learning loopholes and help
            students achieve their desires.
          </p>
        </div>
        <div>
          <Image
            src="/img/trst.png"
            alt=""
            width={200}
            height={200}
            className="w-[550px] md:w-[400px]  "
          />
        </div>
      </div>
    </div>
  );
}
