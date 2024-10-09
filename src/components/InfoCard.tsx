import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import { formatDate } from "@/lib/utils";
import { Student, Teacher } from "@prisma/client";

import FormContainer from "./FormContainer";

function InfoCard({ person }: { person: Student | Teacher }) {
  // Getting the role
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  return (
    <div className="bg-schoolSky py-6 px-4 rounded-xl flex-1 flex flex-col xs:flex-row gap-4">
      <Image
        src={person.img || "/noAvatar.svg"}
        className="rounded-full object-cover w-20 h-20 sm:w-36 sm:h-36"
        alt={person.name + " " + person.surname}
        width={144}
        height={144}
      />
      <div className="basis-2/3 flex flex-col justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">
            {person.name} {person.surname}
          </h1>
          {role === "admin" && (
            <FormContainer table="student" type="update" data={person} />
          )}
        </div>
        <p className="text-sm text-gray-500">{person.description}</p>
        <div className="flex items-center justify-between gap-y-2 flex-wrap text-xs sm:text-sm font-medium">
          <div className="w-full flex items-center gap-2 pr-2">
            <Image src="/phone.svg" width={18} height={18} alt="Phone number" />
            <span>{person.phone}</span>
          </div>
          <div className="w-full flex items-center gap-2 pr-2">
            <Image src="/mail.svg" width={18} height={18} alt="Email" />
            <span>{person.email}</span>
          </div>
          <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
            <Image src="/date.svg" width={18} height={18} alt="Birthday" />
            <span>{formatDate(person.birthday)}</span>
          </div>
          <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
            <Image src="/blood.svg" width={18} height={18} alt="Blood type" />
            <span>{person.bloodType}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
