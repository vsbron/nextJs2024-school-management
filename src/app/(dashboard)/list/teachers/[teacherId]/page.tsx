import Image from "next/image";

function SingleTeacherPage() {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-schoolSky py-6 px-4 rounded-xl flex-1 flex flex-col sm:flex-row gap-4">
            <div className="basis-1/3">
              <Image
                src="https://cdn.prod.website-files.com/6365d860c7b7a7191055eb8a/65a752b0fec11d8c4c9beaf7_Olivia%20Rhye-p-500.jpg"
                className="rounded-full object-cover"
                alt="Teacher name"
                width={144}
                height={144}
              />
            </div>
            <div className="basis-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Dana Guerrero</h1>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-y-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/blood.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/date.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/mail.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/2 lg:w-full 2xl:w-1/2 flex items-center gap-2 pr-2">
                  <Image
                    src="/phone.png"
                    width={14}
                    height={14}
                    alt="Blood type"
                  />
                  <span>+1 234 5674</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1"></div>
        </div>
        {/* BOTTOM */}
        <div className="">Schedule</div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3">Right</div>
    </div>
  );
}

export default SingleTeacherPage;
